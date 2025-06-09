import React from 'react';
import { colors } from '@/styles/themes';
import Image from 'next/image';

import { FormControl, Select, MenuItem, SelectChangeEvent, InputBase, Box } from '@mui/material';

interface dropdownSecondProps {
  icon: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

const DropdownSecond: React.FC<dropdownSecondProps> = ({ icon, options, value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl
      sx={{
        display: 'flex',
        border: `1px solid ${colors.lightGray}`,
        borderRadius: '200px',
        px: '20px',
        gap: '15px',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Select
        value={value}
        displayEmpty
        variant="standard"
        renderValue={(selected) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                fontSize: '18px',
                color: 'black',
                paddingBlock: '15px',
              }}
            >
              <Image src={icon} alt="Ícone" width={20} height={20} />
              {selected || 'Categoria'}
            </Box>
          );
        }}
        input={<InputBase />}
        onChange={handleChange}
        sx={{
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '18px',
          color: colors.blackGray,
          width: '100%',
          '& .MuiSelect-select': {
            padding: 0,
          },
          borderRadius: '800px',
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              position: 'absolute',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
              borderRadius: '15px',
              overflow: 'hidden',
            },
          },
          MenuListProps: {
            disablePadding: true,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{
              fontSize: '16px',
              padding: '10px 16px',
              cursor: 'pointer',
              transition: 'background 0.3s',
              

              '&:hover': {
                backgroundColor: colors.mediumGray,
                color: 'white',
              },

              '&.Mui-selected': {
                backgroundColor: colors.mediumGray,
                color: 'white',
              },

              '&.Mui-selected:hover': {
                backgroundColor: colors.mediumGray,
                color: 'white',
              },
            }}
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSecond;
