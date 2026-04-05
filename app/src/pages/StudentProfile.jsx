import React from 'react';

function StudentProfile() {
    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>Student Profile</h2>
                <p>Tell us a bit more about your academic background</p>
                
                <form className="auth-form">
                    <div className="input-group">
                        <input type="text" name="major" placeholder="Major (e.g. Computer Science)" required />
                    </div>

                    <div className="input-group">
                        <select name="classification" required>
                            <option value="">Classification</option>
                            <option value="freshman">Freshman</option>
                            <option value="sophomore">Sophomore</option>
                            <option value="junior">Junior</option>
                            <option value="senior">Senior</option>
                            <option value="graduate">Graduate</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <textarea name="bio" placeholder="Tell us about your skills and project interests..." rows="4" style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}}></textarea>
                    </div>

                    <button type="submit" className="login-btn">Save Profile</button>
                </form>
            </div>
        </div>
    );
}

export default StudentProfile;