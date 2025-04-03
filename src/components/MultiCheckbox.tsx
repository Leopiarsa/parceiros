import { Autocomplete, Checkbox, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Parceiros } from '../entities/parceiro.entity.js';
import { PropertyOptions } from 'adminjs';

interface MultiCheckboxProps {
  // property: PropertyOptions & { label: string } & { name: string };
  property: any;
  record?: { params: { parceiros: Parceiros[] }; id?: number };
  onChange?: (name: string, value: number[]) => void;
  callBack?: (id: number) => void;
  multiple?: boolean;
  loading?: boolean;
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  property,
  record,
  onChange,
  callBack,
  multiple = true,
  loading = false,
}) => {
  const selectedUsersFromRecord = record?.params?.parceiros ?? [];

  const [selectedUsers, setSelectedUsers] = useState<Parceiros[]>(selectedUsersFromRecord);
  const [selectedPartner, setSelectedParner] = useState<Parceiros>(selectedUsersFromRecord[0]);

  const [data, setData] = React.useState<Parceiros[]>(selectedUsersFromRecord);

  const handleChange = (event, newValue) => {
    if (multiple) {
      setSelectedUsers(newValue);
    } else {
      setSelectedParner(newValue);
    }
    if (callBack) {
      callBack(newValue.userID);
    }
    if (onChange) {
      onChange(
        (property as any).name,
        newValue.map((parceiro) => parceiro.id)
      );
    }
  };

  const fetchParceiros = async () => {
    try {
      const response = await fetch(`/parceiros`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data: Parceiros[] = await response.json();

      console.log(data);
      setData(data);
    } catch (error) {
      console.error('Erro ao buscar parceiros:', error);
    }
  };

  React.useEffect(() => {
    fetchParceiros();
  }, []);

  return (
    <Autocomplete
      multiple={multiple}
      id="parceiros"
      options={data}
      value={multiple ? selectedUsers : selectedPartner}
      aria-placeholder="Selecione um Parceiro"
      onChange={handleChange}
      loading={loading}
      disableCloseOnSelect
      getOptionLabel={(option) => option.email}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.nome}
          </li>
        );
      }}
      style={{ marginBottom: '12px' }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={property.custom?.label || property.label}
          placeholder="Selecione um parceiro"
        />
      )}
    />
  );
};

export default MultiCheckbox;
