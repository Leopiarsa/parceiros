import React from 'react';
import { BasePropertyProps, PropertyOptions } from 'adminjs';
import { TextField } from '@mui/material';

const CustomInput: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(property.name, newValue);
  };

  return (
    <TextField
      id="custom-input"
      label={property.custom.label || property.label}
      value={value}
      onChange={handleChange}
      fullWidth
      disabled={property?.custom?.disabled}
      variant="outlined"
      style={{
        marginTop: '12px',
        marginBottom: '12px',
      }}
    />
  );
};

export default CustomInput;
