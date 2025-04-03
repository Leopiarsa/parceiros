import { Roles } from '../enums/roles.enum.js';

export const redirectMiddleware = (req, res, next) => {
  console.log('USER ROLE: ', req.session);
  const currentUser = req.session.AdministradorUser;

  if (!currentUser) {
    return next();
  }

  // Se o usuário já está na página de destino, NÃO redireciona novamente
  if (req.path === '/admin/resources/Oportunidades' || req.originalUrl.startsWith('/admin/resources/Oportunidades')) {
    return next();
  }

  if (currentUser.role === Roles.Operador || currentUser.role === Roles.Parceiro) {
    return res.redirect('/admin/resources/Oportunidades');
  }

  next();
};
