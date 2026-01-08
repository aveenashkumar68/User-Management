export const validateUser = (req, res, next) => {
  const {name, email, role} = req.body;

  if(!email || !name || !role) {
    return res.status(400).json({
      error: "fields are missing"
    });
  }

  next();
}