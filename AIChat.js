import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
`;

const ChatOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const OptionButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primaryHover : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  overflow-y: auto;
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Message = styled.div`
  max-width: 70%;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.isUser ? props.theme.primary : props.theme.backgroundSecondary};
  color: ${props => props.isUser ? 'white' : props.theme.text};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: ${props => props.theme.shadowLight};
  animation: ${props => props.isUser ? 'slideInRight' : 'slideInLeft'} 0.3s ease;
  
  @keyframes slideInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const MessageText = styled.div`
  line-height: 1.5;
`;

const MessageImage = styled.img`
  max-width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const MessageTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : props.theme.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
  text-align: right;
`;

const InputArea = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: 0 0 ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const ChatInput = styled.textarea`
  flex: 1;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0 ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const MediaButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const MediaButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const VideoContainer = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundTertiary};
  flex: 1;
`;

const VideoScreen = styled.div`
  flex: 1;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const MainVideo = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const SelfVideo = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 150px;
  height: 100px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.primary};
`;

const VideoControls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
`;

const VideoButton = styled.button`
  background-color: ${props => props.danger ? '#e74c3c' : props.theme.backgroundSecondary};
  color: ${props => props.danger ? 'white' : props.theme.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : props.theme.backgroundTertiary};
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.textSecondary};
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    display: inline-block;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
  }
`;

const AIChat = () => {
  const [chatMode, setChatMode] = useState('text');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false, time: formatTime(new Date()) },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      time: formatTime(new Date())
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand what you're asking. Let me help you with that.",
        "That's an interesting question. Here's what I think about it.",
        "I can definitely assist you with that request.",
        "Based on my knowledge, here's what I can tell you about that.",
        "Let me process that information and provide you with a helpful response."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now(), 
          text: randomResponse, 
          isUser: false,
          time: formatTime(new Date())
        }
      ]);
    }, 1500);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const newMessage = {
        id: Date.now(),
        text: "I've shared an image with you:",
        image: event.target.result,
        isUser: true,
        time: formatTime(new Date())
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(true);
      
      // Simulate AI response to image
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            text: "I've received your image. In the full implementation, I would analyze this image and provide relevant insights or responses.", 
            isUser: false,
            time: formatTime(new Date())
          }
        ]);
      }, 2000);
    };
    
    reader.readAsDataURL(file);
    e.target.value = null; // Reset input
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>AI Assistant</ChatTitle>
        <ChatOptions>
          <OptionButton 
            active={chatMode === 'text'} 
            onClick={() => setChatMode('text')}
          >
            Text
          </OptionButton>
          <OptionButton 
            active={chatMode === 'image'} 
            onClick={() => setChatMode('image')}
          >
            Image
          </OptionButton>
          <OptionButton 
            active={chatMode === 'video'} 
            onClick={() => setChatMode('video')}
          >
            Video
          </OptionButton>
        </ChatOptions>
      </ChatHeader>
      
      {chatMode !== 'video' ? (
        <>
          <MessagesContainer>
            {messages.map(message => (
              <Message key={message.id} isUser={message.isUser}>
                <MessageText>{message.text}</MessageText>
                {message.image && <MessageImage src={message.image} alt="Shared image" />}
                <MessageTime isUser={message.isUser}>{message.time}</MessageTime>
              </Message>
            ))}
            
            {isTyping && (
              <TypingIndicator>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </TypingIndicator>
            )}
            
            <div ref={messagesEndRef} />
          </MessagesContainer>
          
          <InputArea>
            <MediaButtons>
              <MediaButton onClick={() => fileInputRef.current.click()}>
                📷
                <ImageUploadInput 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </MediaButton>
              <MediaButton>🎤</MediaButton>
              <MediaButton>📎</MediaButton>
            </MediaButtons>
            
            <ChatInput 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </InputArea>
        </>
      ) : (
        <VideoContainer active={chatMode === 'video'}>
          <VideoScreen>
            <MainVideo>AI Video Chat</MainVideo>
            <SelfVideo>You</SelfVideo>
          </VideoScreen>
          
          <VideoControls>
            <VideoButton>🎤</VideoButton>
            <VideoButton>📹</VideoButton>
            <VideoButton>💻</VideoButton>
            <VideoButton danger>📞</VideoButton>
          </VideoControls>
        </VideoContainer>
      )}
    </ChatContainer>
  );
};

export default AIChat;
