var express=require('express'); 
var router = require('express').Router();
var routerCategory = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var routerPost = express.Router();
var moment = require('moment');
routerCategory.use(authMiddleware.hasAuth);
routerPost.use(authMiddleware.hasAuth);


routerCategory.get('/:id', (req,res) => {
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM \`post\` JOIN \`postcategory\` ON post.postcid = postcategory.postcategoryid WHERE post.postcid = ${req.params.id}`, (err, results, fields) => {
        if (err) return res.send(err);
        if(results.length===0)
        {
            console.log('x posts');
            var db2 = require('../../lib/database')();
            var queryString = `SELECT * FROM postcategory WHERE postcategoryid = ${req.params.id}`;
            db.query(queryString, (err,results,fields)=>{
                if(err) return console.log(err);
                res.render('categories/views/index', { postspug: results, noposts: 1});
            })
        }
        else
            {
                console.log('y posts');
                render(results);
            }
    })
       function render(posts) 
       {
           res.render('categories/views/index', { postspug: posts})
       }
})

routerPost.get('/:id', (req,res) =>{
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM \`post\`WHERE postid = ${req.params.id}`, (err, results, fields) => {
        if(err) throw err;
        console.log(results);
        res.render('categories/views/postcontent', { postspug: results, dates: moment(results[0].pdate).format('YYYY-MM-DD') });
    })
});

routerPost.post('/:id', (req,res) =>{
    var db = require('../../lib/database')();
    var dateNow = new Date();
    dateNow = moment(dateNow).format('YYYY-MM-DD');
    console.log(req.body) 
    var queryString = `INSERT INTO \`post\` (\`author\`, \`psubject\`, \`ptitle\`,\`pcontent\`,\`pdate\`, \`postcid\`)
    VALUES("${req.body.author}", "${req.body.psubject}", "${req.body.ptitle}", "${req.body.pcontent}", "${dateNow}", ${req.params.id})`
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect(`/categories/${req.params.id}`)
    })
});

routerPost.get('/edit/:id', (req,res) =>{
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM \`post\`WHERE postid=${req.params.id}`, (err, results, fields) => {
        if(err) throw err;
        console.log(results);
        res.render('categories/views/editcontent', { postspug: results, dates: moment(results[0].pdate).format('YYYY-MM-DD'), reqParams: req.params.id });
    })
});

routerPost.post('/edit/:id', (req, res) => {
    var db = require('../../lib/database')();
    var number = Number(req.body.id)
    console.log(req.body)
    const queryString = `UPDATE \`post\` SET
    author = "${req.body.author}",
    psubject = "${req.body.psubject}",
    ptitle ="${req.body.ptitle}",
    pcontent="${req.body.pcontent}"
    WHERE postid= ${number}`;
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect(`/posts/${req.body.id}`);
    });
});

routerPost.get('/:id/remove', (req, res) => {
    var db = require('../../lib/database')();
    db.query(`DELETE FROM \`post\` WHERE postid= ${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect(`/index`);
    });
});

exports.categories =routerCategory;
exports.posts= routerPost