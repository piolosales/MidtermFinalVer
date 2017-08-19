var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query('SELECT * FROM postcategory', (err, results, fields) => {
        return res.render('admin/categories/views/index', { postcategory: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`postcategory\` (\`categoryname\`)
    VALUES("${req.body.categoryname}");`;
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/categories/views/form');
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM postcategory WHERE postcategoryid=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.render('admin/categories/views/form', { postcategory: results[0] });
    });
});

router.put('/:id', (req, res) => {
    const queryString = `UPDATE postcategory SET
    categoryname ="${req.body.categoryname}"
    WHERE postcategoryid=${req.params.id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/categories');
    });
});


module.exports = router;