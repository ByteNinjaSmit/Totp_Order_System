const adminMiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ message: "Access denied. user is no an admin." })
        }
        // if user is an admin, proceed to the next middleware.
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;