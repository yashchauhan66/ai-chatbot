import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize the Google Generative AI
  const genAI = new GoogleGenerativeAI('AIzaSyDkf2n0DuoO98mX3T_ApkjtNh3wfupe4aw');
  const MODEL_NAME = "Gemini 1.5 Flash";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const botMessage = {
        text: text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: `Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            p: 2, 
            background: 'linear-gradient(45deg, #4158D0, #C850C0)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            boxShadow: '0 4px 15px rgba(65, 88, 208, 0.4)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon sx={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }} />
            <Box>
              <Typography variant="h6" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                AI Chat Assistant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label={"Yash 1.5 Flash"}
                  size="small"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: '#FFCC70'
                    }
                  }}
                />
                <Tooltip title="Powered by Google's Gemini AI model">
                  <InfoIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <IconButton 
            onClick={clearChat} 
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            title="Clear chat"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Chat Messages */}
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            background: 'rgba(255, 255, 255, 0.5)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(45deg, #4158D0, #C850C0)',
              borderRadius: '4px',
            }
          }}
        >
          {messages.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 2,
                opacity: 0.7
              }}
            >
              <SmartToyIcon sx={{ fontSize: 48, color: '#4158D0' }} />
              <Typography variant="h6" color="text.secondary" align="center">
                Start a conversation with {"Yash 1.5 Flash"}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Ask me anything! I'm here to help.
              </Typography>
            </Box>
          )}
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 1,
                mb: 2
              }}
            >
              {message.sender === 'bot' && (
                <Avatar sx={{ 
                  bgcolor: '#4158D0',
                  boxShadow: '0 0 10px rgba(65, 88, 208, 0.3)'
                }}>
                  <SmartToyIcon />
                </Avatar>
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(45deg, #4158D0, #C850C0)'
                    : 'rgba(255, 255, 255, 0.9)',
                  color: message.sender === 'user' ? 'white' : '#2c3e50',
                  borderRadius: 2,
                  position: 'relative',
                  boxShadow: message.sender === 'user'
                    ? '0 4px 15px rgba(65, 88, 208, 0.4)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.7, 
                    display: 'block', 
                    mt: 1,
                    color: message.sender === 'user' ? 'white' : '#666'
                  }}
                >
                  {message.timestamp}
                </Typography>
              </Paper>
              {message.sender === 'user' && (
                <Avatar sx={{ 
                  bgcolor: '#C850C0',
                  boxShadow: '0 0 10px rgba(200, 80, 192, 0.3)'
                }}>
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          ))}
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
                mb: 2
              }}
            >
              <Avatar sx={{ 
                bgcolor: '#4158D0',
                boxShadow: '0 0 10px rgba(65, 88, 208, 0.3)'
              }}>
                <SmartToyIcon />
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <CircularProgress size={20} sx={{ color: '#4158D0' }} />
                <Typography variant="body1" sx={{ color: '#2c3e50' }}>
                  Thinking...
                </Typography>
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box 
          sx={{ 
            p: 2, 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Ask Yash 1.5 Flash anything...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isLoading}
              multiline
              maxRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  '& fieldset': {
                    borderColor: 'rgba(65, 88, 208, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4158D0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C850C0',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              sx={{ 
                minWidth: '48px',
                borderRadius: 2,
                background: 'linear-gradient(45deg, #4158D0, #C850C0)',
                boxShadow: '0 4px 15px rgba(65, 88, 208, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #C850C0, #4158D0)',
                  boxShadow: '0 6px 20px rgba(65, 88, 208, 0.5)',
                },
                '&:disabled': {
                  background: 'linear-gradient(45deg, #ccc, #999)',
                  boxShadow: 'none',
                }
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
