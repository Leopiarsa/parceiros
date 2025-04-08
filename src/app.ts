import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';

import { Components } from './admin/component-loader.js';
import { adminjs } from './bootstrap/adminjs.js';
import initializeDb from './db/index.js';
import { seed } from './db/seed.js';
import { Roles } from './enums/roles.enum.js';
import uploadRoute from './routes/file.routes.js';
import oportunidadesRoute from './routes/oportunidade.route.js';
import parceiroRoute from './routes/parceiros.routes.js';
import customRoute from './routes/user.routes.js';
import path from 'path';

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  await initializeDb();

  const { admin, authRouter } = await adminjs();

  const modifyPagesForRole = (role) => {
    if (role === Roles.Administrador || role === Roles.Gerente) {
      admin.options.pages = {
        Dashboard: {
          component: Components.AdminDashboard,
          icon: 'Star',
        },
      };
    } else {
      const sideBarWithoutAnyPages = {};
      admin.options.pages = sideBarWithoutAnyPages;
    }
  };

  app.use(express.json({ limit: '50mb' }));
  app.use('/images', express.static('public/images'));
  app.use('/admin-custom.css', express.static('public/admin-custom.css'));
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  //usar um middleware aqui e modificar a req
  app.use((req: any, res, next) => {
    if (req.session.adminUser) {
      const role = req.session.adminUser.role;
      modifyPagesForRole(role);
    }
    next();
  });

  app.use(admin.options.rootPath, authRouter);

  // faz a pasta public ficar acessivel estaticamente para ser usada como cdn pelo adminjs
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use('/user', customRoute);
  app.use('/parceiros', parceiroRoute);
  app.use('/files', uploadRoute);
  app.use('/oportunidades', oportunidadesRoute);
  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    seed();
  });
};

start();
