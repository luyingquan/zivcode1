import React, { useState, useEffect } from 'react';
import './style.css';

const Profile = () => {
  const [mood, setMood] = useState('normal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载效果
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleAvatarClick = () => {
    const moods = ['smile', 'angry', 'wink', 'normal', 'surprised', 'love'];
    const currentIndex = moods.indexOf(mood);
    const nextMood = moods[(currentIndex + 1) % moods.length];
    
    setIsAnimating(true);
    setMood(nextMood);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-circle"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="background-animation"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <header className="profile-header">
        <nav className="nav-menu">
          <a href="#about">关于</a>
          <a href="#skills">技能</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <div className="profile-content">
        <div className="avatar-section">
          <div 
            className={`avatar-circle ${mood} ${isAnimating ? 'animate' : ''}`}
            onClick={handleAvatarClick}
          >
            <div className="avatar-face">
              <div className="eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
              <div className="mouth"></div>
            </div>
            <div className="name-circle">
              <span className="chinese-name">刘正阳</span>
            </div>
          </div>
          <div className="mood-indicator">
            点击头像切换表情 ({mood})
          </div>
        </div>

        <div className="info-section">
          <h1 className="name-title">刘正阳
            <span className="title-decoration"></span>
          </h1>
          
          <div className="info-cards">
            <div className="info-card" id="about">
              <div className="card-icon">👨‍💻</div>
              <h3>个人简介</h3>
              <p>热爱生活，追求卓越</p>
              <p>专注于技术创新与研发</p>
              <div className="card-decoration"></div>
            </div>
            
            <div className="info-card" id="skills">
              <div className="card-icon">🚀</div>
              <h3>专业技能</h3>
              <div className="skills-list">
                {['前端开发', 'UI/UX设计', '项目管理'].map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">{skill}</div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{width: `${(index + 1) * 25}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="info-card" id="contact">
              <div className="card-icon">📱</div>
              <h3>联系方式</h3>
              <div className="contact-items">
                <a href="mailto:example@email.com" className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>example@email.com</span>
                </a>
                <a href="tel:123-4567-8900" className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>123-4567-8900</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="profile-footer">
        <div className="social-links">
          <a href="#" className="social-link">GitHub</a>
          <a href="#" className="social-link">LinkedIn</a>
          <a href="#" className="social-link">Twitter</a>
        </div>
        <div className="copyright">
          © 2024 刘正阳. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Profile; 