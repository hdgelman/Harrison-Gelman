const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.send({
            name: 'Missing User Error',
            message: 'You must be logged in to perform this action',
            error: '401'
        });
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(401);
        return next({
            name: 'Admin Required',
            message: 'You must be an Admin to perform this action',
            error: '401'
        })
    }
    next();
}

module.exports = { requireUser, requireAdmin };