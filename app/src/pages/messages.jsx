import React, { useState } from 'react';
import Sidebar from '../components/SidebarH';

const hardcodedConversations = [
    { id: 1, fullName: 'Carlos Rivera', lastMessage: 'Hey! I saw your profile and I think you would be a great fit.', time: '2m ago' },
    { id: 2, fullName: 'Sofia Mendez', lastMessage: 'Are you available for a quick call this week?', time: '1h ago' },
    { id: 3, fullName: 'James Tran', lastMessage: 'Thanks for connecting! Let me know your availability.', time: '3h ago' },
    { id: 4, fullName: 'Mia Lopez', lastMessage: 'Looking forward to working together!', time: '1d ago' },
];

export default function Messages() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [selected, setSelected] = useState(hardcodedConversations[0]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar user={user} />
            <div style={{
                marginLeft: '260px', display: 'flex', width: '100%',
                minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Georgia, serif'
            }}>
                {/* Conversation List */}
                <div style={{
                    width: '300px', borderRight: '1px solid #e0e0e0',
                    backgroundColor: '#fff', padding: '24px 0'
                }}>
                    <h2 style={{ padding: '0 20px', color: '#F05023', marginBottom: '16px', fontSize: '1.3rem' }}>
                        Messages
                    </h2>
                    {hardcodedConversations.map(convo => (
                        <div
                            key={convo.id}
                            onClick={() => setSelected(convo)}
                            style={{
                                padding: '16px 20px', cursor: 'pointer',
                                backgroundColor: selected.id === convo.id ? '#fff5f2' : 'transparent',
                                borderLeft: selected.id === convo.id ? '3px solid #F05023' : '3px solid transparent',
                                transition: 'all 0.15s ease'
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    backgroundColor: '#F05023', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', flexShrink: 0
                                }}>
                                    {convo.fullName.charAt(0)}
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#1a1a1a' }}>
                                        {convo.fullName}
                                    </p>
                                    <p style={{
                                        margin: 0, fontSize: '0.78rem', color: '#888',
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}>
                                        {convo.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px' }}>
                    <h2 style={{ margin: '0 0 24px', color: '#1a1a1a', fontSize: '1.2rem' }}>
                        {selected.fullName}
                    </h2>
                    <div style={{
                        flex: 1, backgroundColor: '#fff', borderRadius: '12px',
                        padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '12px'
                    }}>
                        <div style={{
                            alignSelf: 'flex-start', backgroundColor: '#f0f0f0',
                            padding: '12px 16px', borderRadius: '12px 12px 12px 0',
                            maxWidth: '60%', fontSize: '0.9rem', color: '#1a1a1a'
                        }}>
                            {selected.lastMessage}
                        </div>
                        <div style={{
                            alignSelf: 'flex-end', backgroundColor: '#F05023',
                            padding: '12px 16px', borderRadius: '12px 12px 0 12px',
                            maxWidth: '60%', fontSize: '0.9rem', color: '#fff'
                        }}>
                            Thanks for reaching out! Let's connect.
                        </div>
                    </div>

                    {/* Input */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            style={{
                                flex: 1, padding: '12px 16px', borderRadius: '8px',
                                border: '1px solid #e0e0e0', fontSize: '0.9rem', outline: 'none'
                            }}
                        />
                        <button style={{
                            padding: '12px 24px', backgroundColor: '#F05023',
                            color: '#fff', border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontWeight: '600'
                        }}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}