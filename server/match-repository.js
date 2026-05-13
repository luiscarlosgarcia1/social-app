function getDiscoverProfiles(db, userId) {
  const user = db.prepare(`SELECT role FROM users WHERE id = ?`).get(userId)
  // Students see businesses, businesses see students
  const oppositeRole = user.role === 'student' ? 'business' : 'student'

  const rows = db.prepare(`
    SELECT u.id, u.full_name, u.role,
           sp.major, sp.classification, sp.bio,
           bp.project_name, bp.industry, bp.needs
    FROM users u
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    LEFT JOIN business_profiles bp ON u.id = bp.user_id
    WHERE u.role = ?
      AND u.id != ?
      AND u.id NOT IN (
        SELECT swiped_id FROM swipes WHERE swiper_id = ?
      )
  `).all(oppositeRole, userId, userId)

  return rows.map(row => ({
    id: row.id,
    fullName: row.full_name,
    role: row.role,
    major: row.major || null,
    classification: row.classification || null,
    bio: row.bio || null,
    projectName: row.project_name || null,
    industry: row.industry || null,
    needs: row.needs || null,
  }))
}

function recordSwipe(db, swiperId, swipedId, direction) {
  db.prepare(`
    INSERT OR IGNORE INTO swipes (swiper_id, swiped_id, direction)
    VALUES (?, ?, ?)
  `).run(swiperId, swipedId, direction)

  if (direction === 'like') {
    // Check if the other person already liked us
    const mutual = db.prepare(`
      SELECT id FROM swipes
      WHERE swiper_id = ? AND swiped_id = ? AND direction = 'like'
    `).get(swipedId, swiperId)

    if (mutual) {
      const u1 = Math.min(swiperId, swipedId)
      const u2 = Math.max(swiperId, swipedId)
      db.prepare(`
        INSERT OR IGNORE INTO matches (user1_id, user2_id)
        VALUES (?, ?)
      `).run(u1, u2)
      return { matched: true }
    }
  }
  return { matched: false }
}

function getMatches(db, userId) {
  const rows = db.prepare(`
    SELECT m.id as match_id,
           u.id, u.full_name, u.role,
           sp.major, sp.bio,
           bp.project_name, bp.needs
    FROM matches m
    JOIN users u ON (
      CASE WHEN m.user1_id = ? THEN m.user2_id ELSE m.user1_id END = u.id
    )
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    LEFT JOIN business_profiles bp ON u.id = bp.user_id
    WHERE m.user1_id = ? OR m.user2_id = ?
  `).all(userId, userId, userId)

  return rows.map(row => ({
    matchId: row.match_id,
    id: row.id,
    fullName: row.full_name,
    role: row.role,
    major: row.major || null,
    bio: row.bio || null,
    projectName: row.project_name || null,
    needs: row.needs || null,
  }))
}

function getMessages(db, matchId) {
  return db.prepare(`
    SELECT id, sender_id, content, created_at
    FROM messages
    WHERE match_id = ?
    ORDER BY created_at ASC
  `).all(matchId)
}

function sendMessage(db, matchId, senderId, content) {
  const result = db.prepare(`
    INSERT INTO messages (match_id, sender_id, content)
    VALUES (?, ?, ?)
  `).run(matchId, senderId, content)
  return { id: result.lastInsertRowid, matchId, senderId, content }
}

module.exports = {
  getDiscoverProfiles,
  recordSwipe,
  getMatches,
  getMessages,
  sendMessage,
}