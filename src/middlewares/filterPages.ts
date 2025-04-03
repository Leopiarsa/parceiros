import AdminJS from 'adminjs';

export const returnMenuOptions = (req, res, next, admin: AdminJS) => {
  if (req.session && req.session.adminUser) {
    console.log('ADMINJS: ', admin.options.pages);
    console.log('USER: ', req.session.adminUser);
  }

  return next();
};
