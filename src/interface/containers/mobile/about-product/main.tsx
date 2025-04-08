'use client'

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Drawer } from '@mui/material';

import * as S from "./styles";

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
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
          },
        }}
      >
        <S.ContentAboutProduct>
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
        </S.ContentAboutProduct>
      </Drawer>
    </div>
  );
}

export default AboutProduct;