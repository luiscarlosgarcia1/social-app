import React from 'react';

function BusinessProfile() {
    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>Business Partner Profile</h2>
                <p>Tell students about your ideas and Projects</p>
                
                <form className="auth-form">
                    <div className="input-group">
                        <input type="text" name="projectName" placeholder="Project Name" required />
                    </div>

                    <div className="input-group">
                        <input type="text" name="industry" placeholder="Industry (e.g. Tech, Finance)" required />
                    </div>

                    <div className="input-group">
                        <textarea name="needs" placeholder="What kind of projects or ideas are you looking to create?" rows="4" style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}}></textarea>
                    </div>

                    <button type="submit" className="login-btn">Create Business Profile</button>
                </form>
            </div>
        </div>
    );
}

export default BusinessProfile;