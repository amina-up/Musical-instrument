module.exports = function(req, res, next) {
  if (req.user.role !== "Client") return res.status(401).send("Access réfusé");
  next();
};
