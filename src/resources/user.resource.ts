import { Not } from 'typeorm';
import { Components } from '../admin/component-loader.js';
import dataSource from '../db/data-source.js';
// import { Usuarios } from '../entities/user.entity.js';
import { Usuarios } from 'src/entities/user.entity.js';
import { Roles } from '../enums/roles.enum.js';

const UserResource = {
  resource: Usuarios,
  options: {
    navigation: {
      icon: 'Users',
    },
    properties: {
      name: {
        isVisible: true,
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
        custom: {
          label: 'Nome',
        },
      },
      email: {
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
        custom: {
          label: 'Email',
        },
      },
      telefone: {
        type: 'string',
        components: {
          edit: Components.InputMasked,
          new: Components.InputMasked,
        },
        custom: {
          label: 'Telefone',
        },
        isVisible: { list: true, show: true, edit: true, filter: false, create: true },
      },
      id: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      role: {
        type: 'string',
        components: {
          list: Components.RoleBadge,
          edit: Components.CustomSelect,
          new: Components.CustomSelect,
          show: Components.RoleBadge,
        },
        custom: {
          label: 'Perfil',
        },
      },
      createdAt: {
        isVisible: { list: false, show: false, edit: false, filter: false },
        title: 'Data de criação',
      },
      password: {
        isVisible: { list: false, show: false, edit: true, filter: false, create: true },
        type: 'password',
        components: {
          new: Components.PasswordInput,
          edit: Components.PasswordInput,
        },
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
        isAccessible: ({ currentAdmin, record }) =>
          currentAdmin.role === Roles.Administrador ||
          (currentAdmin.role === Roles.Parceiro && currentAdmin._id === record?.param('id')),

        before: async (request) => {
          const userRepo = dataSource.getRepository(Usuarios);

          const alreadyExists = await userRepo.findOne({
            where: {
              email: request.payload.email,
              id: Not(request.payload.id),
            },
          });

          if (alreadyExists) {
            throw new Error('Este E-mail já foi registrado');
          }

          // if (request.payload.password) {
          // if (!request.payload.password.startsWith('$2b$')) {
          // const salt = await bcrypt.genSalt(10);
          // request.payload.password = await bcrypt.hash(request.payload.password, salt);
          // }
          // }

          return request;
        },
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
      },
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
        before: async (request) => {
          const userRepo = dataSource.getRepository(Usuarios);

          const alreadyExists = await userRepo.findOne({
            where: { email: request.payload.email },
          });

          if (alreadyExists) {
            throw new Error('Este e-mail já foi registrado');
          }

          // const salt = await bcrypt.genSalt(10);

          // request.payload.password = await bcrypt.hash(request.payload.password, salt);

          return request;
        },
      },
    },
  },
};

export default UserResource;
