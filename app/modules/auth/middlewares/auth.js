exports.hasAuth = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/');
    return next();
}

exports.isAdmin = (req, res, next) => {
    if(req.session && req.session.user.usertype === 'Admin') return next();
    return res.redirect('/index?notadmin');
}