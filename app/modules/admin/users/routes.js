var router = require('express').Router();
var db = require('../../../lib/database')();
var moment = require('moment');



router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        for(var i=0; i<results.length;i++){
            results[i].birthday = moment(results[i].birthday).format('MM-DD-YYYY');
        }
        return res.render('admin/users/views/index', { users: results });
    }); 
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`users\` (\`username\`, \`email\`, \`password\`, \`birthday\`)
    VALUES("${req.body.username}","${req.body.email}", "${req.body.password}", "${req.body.birthday}");`
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/users');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/users/views/form');
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.render('admin/users/views/form', { user: results[0], birthdate: moment(results[0].birthday).format('YYYY-MM-DD') });
    
    });
});

router.put('/:id', (req, res) => {
    const queryString = `UPDATE users SET
    username = "${req.body.username}",
    email = "${req.body.email}",
    birthday ="${req.body.birthday}"
    WHERE id=${req.params.id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

router.get('/:id/remove', (req, res) => {
    db.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

module.exports = router;