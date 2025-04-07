'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface aboutProductProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const AboutProduct: React.FC<aboutProductProps> = ({open, toggleDrawer}) => {
  return (
    <div>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <h3>Test</h3>
          
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
          />

          <Button 
            variant="contained" 
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => toggleDrawer(false)}
          >
            Enviar
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}

export default AboutProduct;