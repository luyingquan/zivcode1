import React, { useState, useEffect } from 'react';
import './style.css';

const EmailValidator = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 邮箱验证规则
  const emailRules = [
    {
      id: 1,
      rule: '必须包含 @ 符号',
      regex: /@/,
      isValid: false
    },
    {
      id: 2,
      rule: '@ 前必须有字符',
      regex: /^[^\s@]+@/,
      isValid: false
    },
    {
      id: 3,
      rule: '@ 后必须有域名',
      regex: /@[^\s@]+\./,
      isValid: false
    },
    {
      id: 4,
      rule: '必须有顶级域名（如.com）',
      regex: /\.[a-zA-Z]{2,}$/,
      isValid: false
    },
    {
      id: 5,
      rule: '不能包含特殊字符',
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      isValid: false
    }
  ];

  const [rules, setRules] = useState(emailRules);

  // 完整的邮箱验证正则表达式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (email) {
      const updatedRules = rules.map(rule => ({
        ...rule,
        isValid: rule.regex.test(email)
      }));
      setRules(updatedRules);

      const isEmailValid = emailRegex.test(email);
      setIsValid(isEmailValid);

      if (!isEmailValid) {
        const failedRule = updatedRules.find(rule => !rule.isValid);
        setErrorMessage(failedRule ? failedRule.rule : '邮箱格式不正确');
      }
    } else {
      setIsValid(null);
      setErrorMessage('');
    }
  }, [email]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsTyping(true);
    const timeoutId = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timeoutId);
  };

  const getInputClassName = () => {
    if (!email) return '';
    if (isTyping) return 'typing';
    return isValid ? 'valid' : 'invalid';
  };

  const commonEmailDomains = [
    '@gmail.com',
    '@outlook.com',
    '@yahoo.com',
    '@hotmail.com',
    '@163.com',
    '@qq.com'
  ];

  const handleQuickFill = (domain) => {
    const localPart = email.split('@')[0];
    setEmail(localPart ? localPart + domain : domain.slice(1));
  };

  return (
    <div className="email-validator-container">
      <div className="validator-box">
        <div className="validator-header">
          <h1>邮箱格式验证</h1>
          <p className="subtitle">输入邮箱地址进行实时验证</p>
        </div>

        <div className="input-section">
          <div className={`input-wrapper ${getInputClassName()}`}>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="请输入邮箱地址"
              className={getInputClassName()}
            />
            {email && (
              <span className="validation-icon">
                {isValid ? '✓' : '✕'}
              </span>
            )}
          </div>

          {errorMessage && !isTyping && !isValid && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {errorMessage}
            </div>
          )}

          <div className="quick-fill">
            <span className="quick-fill-label">常用邮箱：</span>
            <div className="domain-tags">
              {commonEmailDomains.map(domain => (
                <button
                  key={domain}
                  onClick={() => handleQuickFill(domain)}
                  className="domain-tag"
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="validation-rules">
          <h3>验证规则：</h3>
          <div className="rules-grid">
            {rules.map(rule => (
              <div
                key={rule.id}
                className={`rule-item ${email ? (rule.isValid ? 'valid' : 'invalid') : ''}`}
              >
                <span className="rule-icon">
                  {email ? (rule.isValid ? '✓' : '✕') : '•'}
                </span>
                <span className="rule-text">{rule.rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="format-examples">
          <h3>有效的邮箱格式示例：</h3>
          <ul>
            <li>user@domain.com</li>
            <li>first.last@domain.com</li>
            <li>user.name+tag@domain.com</li>
            <li>user-name@domain.co.uk</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailValidator; 