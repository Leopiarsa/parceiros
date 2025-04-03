import { Autocomplete, Box, Checkbox, Chip, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Parceiros } from '../entities/parceiro.entity.js';

interface ListPartners {
  property: { name: string };
  record?: { params: { parceiros: Parceiros[] }; id: number };
  onChange?: (name: string, value: number[]) => void;
  callBack?: (id: number) => void;
  multiple?: boolean;
  loading?: boolean;
}

const ListPartners: React.FC<ListPartners> = ({
  property,
  record,
  onChange,

  callBack,
  multiple = true,
  loading = false,
}) => {
  const selectedUsersFromRecord = record?.params?.parceiros ?? [];

  const [selectedUsers, setSelectedUsers] = useState<Parceiros[]>(selectedUsersFromRecord);

  return (
    <>
      {selectedUsers.length > 0 ? (
        <Box>
          <p style={{ color: '#898A9A', fontSize: '12px', font: 'Roboto' }}>Parceiros</p>
          {selectedUsers.map((parceiro) => (
            <Chip label={parceiro.nome} color="primary" variant="outlined" size="small" style={{ margin: '5px' }} />
          ))}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListPartners;
