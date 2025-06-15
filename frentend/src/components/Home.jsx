import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ height: '100vh', py: 4 }} className="fade-in">
      <Paper 
        elevation={3} 
        className="custom-card"
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
          gap: 4,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SmartToyIcon sx={{ 
            fontSize: 48, 
            color: '#4158D0',
            filter: 'drop-shadow(0 0 8px rgba(65, 88, 208, 0.3))'
          }} />
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4158D0, #C850C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            AI Chat Assistant
          </Typography>
        </Box>

        <Typography 
          variant="h5" 
          sx={{ 
            maxWidth: '600px', 
            lineHeight: 1.6,
            color: '#2c3e50',
            textShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          Experience the power of AI with our advanced chat assistant. Get instant responses to your questions and engage in meaningful conversations.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/chat')}
          sx={{ 
            px: 4, 
            py: 1.5,
            fontSize: '1.2rem',
            borderRadius: 2,
            background: 'linear-gradient(45deg, #4158D0, #C850C0)',
            boxShadow: '0 4px 15px rgba(65, 88, 208, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #C850C0, #4158D0)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(65, 88, 208, 0.5)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Start Chatting
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
