import React from 'react';

async function handleSubmit(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'))
    const projectName = event.target.projectName.value;
    const industry = event.target.industry.value;
    const needs = event.target.needs.value;

    const response = await fetch('http://localhost:3000/profile/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, projectName, industry, needs }),
    })
    const data = await response.json()
    console.log(data)
    window.location.href = '/home'
}

function BusinessProfile() {
    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>Business Partner Profile</h2>
                <p>Tell students about your ideas and Projects</p>

                <form className="auth-form" onSubmit={handleSubmit}>
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
