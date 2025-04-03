import React from 'react';
import { Chip } from '@mui/material';
import { ShowPropertyProps } from 'adminjs';
import { Roles } from '../enums/roles.enum.js';

const RoleBadge: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props;
  const refId = record.params[property.path];
  const role = record.populated[property.path];
  const value = (role && role.title) || refId;

  const roleColors = (role: Roles) => {
    switch (role) {
      case Roles.Administrador:
        return 'primary';
      case Roles.Gerente:
        return 'primary';
      case Roles.Operador:
        return 'success';
      case Roles.Parceiro:
        return 'warning';
      default:
        return 'default';
    }
  };

  const roleVariants = (role: Roles) => {
    switch (role) {
      case Roles.Administrador:
        return 'filled';
      case Roles.Gerente:
        return 'outlined';
      case Roles.Operador:
        return 'outlined';
      case Roles.Parceiro:
        return 'outlined';
    }
  };

  return <Chip label={value} color={roleColors(value as Roles)} variant={roleVariants(value as Roles)} size="medium" />;
};

export default RoleBadge;
