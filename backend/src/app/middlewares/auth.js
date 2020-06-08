export default (req, res, next) => {
    const auth = req.headers.authorization;
    return next();
}