const jwt = require("jsonwebtoken");
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }
  try {
    const tokenLimpo = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    req.funcionario = decoded;
  } catch (error) {
    return res.status(403).json({ message: "Token inválido!" });
  }
  next();
}
module.exports = verificarToken;