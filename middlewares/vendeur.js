module.exports = function(req, res, next) {
  if (req.user.role !== "Vendeur") return res.status(401).send(" Accès réfusé");
  next();
};
