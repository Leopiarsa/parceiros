import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface availableValues {
  value: number;
  label: string;
}
interface SelectProps {
  property: {
    availableValues: availableValues[];
    label: string;
    path?: string;
    name?: string;
    custom?: { [key: string | number | symbol]: any };
  };

  onChange?: (name: string, value: string) => void;
  record: { params: any };
}

const CustomSelect: React.FC<SelectProps> = ({ property, onChange, record }) => {
  const value = record.params[property.path] || '';
  const options = property.availableValues || [];

  const handleChange = (event) => {
    onChange(property.name, event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }}>
      <InputLabel>{property.custom.label || property.label}</InputLabel>
      <Select value={value} onChange={handleChange} label={property.label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
