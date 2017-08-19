var router = require('express').Router();
var db = require('../../lib/database')();
var moment = require('moment');

router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        results[0].birthday = moment(results[0].birthday).format('YYYY-MM-DD');
        return res.render('signup/views/signup', { users: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`users\` (\`username\`, \`email\`, \`password\`, \`birthday\`)
    VALUES("${req.body.username}", "${req.body.email}", "${req.body.password}", "${req.body.birthday}");`;
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/login');
    });
});



exports.signup = router;