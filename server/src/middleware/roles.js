export default function roles(...allowed) {

  return (req, res, next) => {

    if (!allowed.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: "Access denied."
      });

    }

    next();

  };

}
