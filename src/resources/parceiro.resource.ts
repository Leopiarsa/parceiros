import { Parceiros } from '../entities/parceiro.entity.js';
import { Roles } from '../enums/roles.enum.js';
import { Components } from '../admin/component-loader.js';

export const ParceiroResource = {
  resource: Parceiros,
  options: {
    navigation: {
      title: 'Parceiros',
      icon: 'Award',
    },
    properties: {
      id: { isVisible: { list: false, edit: false, show: false, filter: false } },
      nome: {
        isVisible: { list: true, show: true, edit: false, filter: true },
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      email: {
        isVisible: { list: true, show: true, edit: false, filter: true },
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      ativo: {
        isVisible: true,
        components: {
          edit: Components.CustomSwitch,
          new: Components.CustomSwitch,
        },
      },
      oportunidades: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      userID: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
    },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
      },
      show: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
      },
      edit: {
        isAccessible: ({ currentAdmin, record }) => currentAdmin.role !== Roles.Parceiro,
      },
      delete: {
        isAccessible: false,
      },
      new: {
        isAccessible: false,
      },
    },
  },
};
