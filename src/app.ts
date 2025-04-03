import { buildAuthenticatedRouter } from '@adminjs/express';
import AdminJS, { locales as AdminJSLocales } from 'adminjs';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';

import { componentLoader, Components } from './admin/component-loader.js';
import provider from './admin/auth-provider.js';
import initializeDb from './db/index.js';
import { Roles } from './enums/roles.enum.js';
import OportunidadeResource from './resources/oportunidade.resource.js';
import { ParceiroResource } from './resources/parceiro.resource.js';
import UserResource from './resources/user.resource.js';
import uploadRoute from './routes/file.routes.js';
import oportunidadesRoute from './routes/oportunidade.route.js';
import parceiroRoute from './routes/parceiros.routes.js';
import customRoute from './routes/user.routes.js';
import { seed } from './db/seed.js';

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  await initializeDb();

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
      // cookie: {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   secure: process.env.NODE_ENV === 'production', // True em produção (HTTPS necessário)
      //   httpOnly: true, // Protege contra ataques XSS
      // },
    })
  );

  const admin = new AdminJS({
    locale: {
      language: 'pt-BR',
      availableLanguages: Object.keys(AdminJSLocales),
      translations: {
        'pt-BR': {
          labels: {
            ativo: {
              true: 'Sim',
              false: 'Não',
            },
          },
        },
      },
    },
    rootPath: '/admin',
    pages: {
      DashBoard: {
        component: Components.AdminDashboard,
        icon: 'Star',
      },
    },
    resources: [UserResource, ParceiroResource, OportunidadeResource],
    dashboard: {
      component: Components.Banner,
    },
    componentLoader,

    branding: {
      companyName: 'Sistema de Parceiros',
      logo: '/images/logo.png',
      favicon: '/images/logo-favicon.png',
      withMadeWithLove: false,
      theme: {
        colors: {
          primary100: '#1976d2',
          primary80: '#1e88e5',
          primary60: '#42a5f5',
          primary40: '#90caf9',
          primary20: '#e3f2fd',
          accent: '#1565c0',
          hoverBg: '#e3f2fd',
          // border: '#bbdefb',
          bg: '#f5f5f5',
          //text: '#0d47a1',
          textHover: '#1565c0',
        },
      },
    },
    assets: {
      styles: ['/admin-custom.css'],
    },
    databases: [],
    loginPath: '/admin/login',
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  //usar um middleware aqui e modificar a req
  app.use((req: any, res, next) => {
    if (req.session.adminUser) {
      const role = req.session.adminUser.role;
      modifyPagesForRole(role);
    }
    next();
  });

  const router = buildAuthenticatedRouter(admin, {
    cookiePassword: process.env.COOKIE_SECRET,
    cookieName: 'adminjs',
    provider,
  });

  app.use(admin.options.rootPath, router);

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
