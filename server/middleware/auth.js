import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, authorization denied." });

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken)
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied." });

    req.user = verifiedToken.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default auth;
