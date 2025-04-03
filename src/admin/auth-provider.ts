import { DefaultAuthProvider } from 'adminjs';

import { componentLoader } from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';
import { Usuarios } from '../entities/user.entity.js';
import bcrypt from 'bcryptjs';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    const user = await Usuarios.findOne({ where: { email } });

    if (user && ((await bcrypt.compare(password, user.password)) || password === user.password)) {
      return {
        email: user.email,
        role: user.role,
        _id: user.id,
      };
    }

    return null;
  },
});

export default provider;
