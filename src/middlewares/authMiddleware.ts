export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.adminUser) {
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized: Please log in to AdminJS' });
};
