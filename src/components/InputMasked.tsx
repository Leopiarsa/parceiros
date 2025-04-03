import React, { useEffect, useState } from 'react';
import { BasePropertyProps, PropertyOptions } from 'adminjs';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const CustomInput: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';
  const [mask, setMask] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const rawValue = removeMask(newValue);

    onChange(property.name, newValue);
  };

  const removeMask = (maskedValue: string) => maskedValue.replace(/\D/g, ''); // Remove tudo que não é número

  const getMask = () => {
    if (property.label === 'CPF' || property.label === 'cpf') return '999.999.999-99';
    if (property.label === 'Telefone' || property.label === 'telefone') return '(99) 99999-9999';
    return null;
  };

  useEffect(() => {
    const defineMask = getMask();

    setMask(defineMask);
  }, [property.label]);

  return (
    <InputMask mask={mask} value={value} onChange={handleChange}>
      {(inputProps) => (
        <TextField
          {...inputProps}
          label={property.custom.label}
          fullWidth
          variant="outlined"
          style={{
            marginTop: '12px',
            marginBottom: '12px',
          }}
        />
      )}
    </InputMask>
  );
};

export default CustomInput;
