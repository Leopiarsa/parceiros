import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { BasePropertyProps } from 'adminjs';
import React, { useState } from 'react';
import OpenedEyeIcon from '../../public/icons/OpenedEye.js';
import ClosedEyeIcon from '../../public/icons/ClosedEyeIcon.js';

const CustomInput: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';
  const [showPassword, togglePassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(property.name, newValue);
  };

  const handleClickShowPassword = () => {
    togglePassword(!showPassword);
  };

  return (
    <div>
      <TextField
        type={showPassword ? 'text' : 'password'}
        id="custom-input"
        label="Senha"
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px white inset',
            transition: 'background-color 5000s ease-in-out 0s',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0px 1000px white inset',
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" style={{ backgroundColor: 'transparent' }}>
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default CustomInput;
