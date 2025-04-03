import { FormControlLabel, Switch, Typography } from '@mui/material';
import { BasePropertyProps } from 'adminjs';
import React from 'react';

const CustomSwitch: React.FC<BasePropertyProps> = ({ property, record, onChange }) => {
  const value = Boolean(record?.params?.[property.path] ?? false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(property.path, event.target.checked);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: '8px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <Switch checked={value} onChange={handleChange} />
      <Typography>{property.label}</Typography>
    </div>
  );
};

export default CustomSwitch;
