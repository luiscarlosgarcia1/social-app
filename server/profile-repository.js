function upsertStudentProfile(db, { userId, major, classification, bio }) {
  db.prepare(`
    INSERT INTO student_profiles (user_id, major, classification, bio)
    VALUES (@userId, @major, @classification, @bio)
    ON CONFLICT(user_id) DO UPDATE SET
      major = excluded.major,
      classification = excluded.classification,
      bio = excluded.bio
  `).run({ userId, major, classification, bio: bio || null })

  return { ok: true }
}

function upsertBusinessProfile(db, { userId, projectName, industry, needs }) {
  db.prepare(`
    INSERT INTO business_profiles (user_id, project_name, industry, needs)
    VALUES (@userId, @projectName, @industry, @needs)
    ON CONFLICT(user_id) DO UPDATE SET
      project_name = excluded.project_name,
      industry = excluded.industry,
      needs = excluded.needs
  `).run({
    userId,
    projectName: projectName?.trim() || '',
    industry: industry?.trim() || '',
    needs: needs?.trim() || null,
  })

  return { ok: true }
}

function getStudentProfile(db,user_id){
  const row = db
  .prepare( `
    SELECT major, classification, bio
    FROM student_profiles
    WHERE user_id = ?   
    `)
    .get(user_id)
    return(row)
}

function getBusinessProfile(db, user_id){
  const row = db
  .prepare(`
   SELECT  project_name, industry, needs
    FROM business_profiles
    WHERE user_id = ?
    `)
    .get(user_id)
    return(row)
}

module.exports = {
  upsertStudentProfile,
  upsertBusinessProfile,
  getStudentProfile,
  getBusinessProfile,
}
