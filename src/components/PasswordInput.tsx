import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { BasePropertyProps } from 'adminjs';
import React, { useState } from 'react';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        id="custom-input"
        label={'Senha'}
        value={value}
        onChange={handleChange}
        fullWidth
        style={{
          marginTop: '10px',
          marginBottom: '25px',
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
};

export default CustomInput;
