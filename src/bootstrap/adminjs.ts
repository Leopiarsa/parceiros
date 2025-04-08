
import AdminJS, { locales as AdminJSLocales } from 'adminjs';
import { Components, componentLoader } from "../admin/component-loader.js";
import OportunidadeResource from "../resources/oportunidade.resource.js";
import { ParceiroResource } from "../resources/parceiro.resource.js";
import UserResource from "../resources/user.resource.js";
import provider from '../admin/auth-provider.js';
import { buildAuthenticatedRouter } from '@adminjs/express';


export async function adminjs() {

  const admin = new AdminJS({
    assetsCDN: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
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

  const authRouter = buildAuthenticatedRouter(admin, {
    cookiePassword: process.env.COOKIE_SECRET,
    cookieName: 'adminjs',
    provider,
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  return {
    admin,
    authRouter,
  }
}
