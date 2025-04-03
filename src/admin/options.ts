import { AdminJSOptions } from 'adminjs';

import { componentLoader } from './component-loader.js';
import { Usuarios } from 'src/entities/user.entity.js';

const usersNavigation = {
  icon: 'User',
};

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: Usuarios,
      options: {
        navigation: usersNavigation,
        options: {
          listProperties: ['name', 'email'],
          filterProperties: ['name', 'email'],
          editProperties: ['name'],
          showProperties: ['name', 'email'],
        },
      },
    },
  ],
  databases: [],
};

export default options;
