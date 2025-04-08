import { TextField } from '@mui/material';
import { BasePropertyProps } from 'adminjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

const CustomInput: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';
  const [mask, setMask] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const rawValue = removeMask(newValue);

    onChange(property.name, newValue);
  };

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = event.target.value;
    const rawCep = maskedValue.replace(/\D/g, '');

    onChange(property.path, maskedValue);

    if (rawCep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${rawCep}/json/`);
        if (!data.erro) {
          onChange('cidade', data.localidade);
          onChange('logradouro', data.logradouro);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const removeMask = (maskedValue: string) => maskedValue.replace(/\D/g, ''); // Remove tudo que não é número

  const getMask = () => {
    if (!property?.label) return null;
    
    if (property.label.toLowerCase() === 'cpf') return '999.999.999-99';
    if (property.label.toLowerCase() === 'telefone') return '(99) 99999-9999';
    if (property.label.toLowerCase() === 'cep') return '99999-999';

    return null;
  };

  useEffect(() => {
    const defineMask = getMask();

    setMask(defineMask);
  }, [property.label]);

  return (
    <InputMask mask={mask} value={value} onChange={property.label.toLowerCase() === 'cep' ? handleCepChange : handleInputChange}>
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
