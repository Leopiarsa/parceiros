import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    textAlign="center"
    padding={4}
    bgcolor="white"
  >
    <Box component="img" src="/images/logo.png" alt="Sistema de Parceiros" width={150} mb={3} />
    <Typography variant="h4" component="h1" gutterBottom>
      Sistema de Parceiros
    </Typography>
    <Typography variant="h6" color="textSecondary">
      Bem-vindo ao seu painel administrativo
    </Typography>
  </Box>
);

export default HomePage;
