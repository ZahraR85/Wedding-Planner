export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (user.role !== 'admin') return res.status(403).send('Forbidden');
      req.user = user; // Attach user info for the next middleware
      next();
  } catch (err) {
      res.status(401).send('Invalid token');
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
};
