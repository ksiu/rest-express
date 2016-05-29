var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://@localhost:27017/blog');

var Article = require('../models/article');

router.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

router.route('/')
        .post(function (req, res, next) {
            var article = new Article();
            //TODO: Bind dynamically
            article.title = req.body.title;
            article.slug = req.body.slug;
            article.published = req.body.published;
            article.text = req.body.text;

            // save the bear and check for errors
            article.save(function (err) {
                if (err)
                    res.send(err);
                res.json(article);
            });
        })
        .get(function (req, res, next) {
            Article.find(function (err, results) {
                if (err)
                    res.send(err);

                res.json(results);
            });
        });
router.route('/:id')
        .get(function (req, res, next) {
            Article.findById(req.params.id, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        })
        .put(function (req, res, next) {
            Article.findById(req.params.id, function (err, result) {

                if (err)
                    res.send(err);

                result.title = req.body.title;
                result.slug = req.body.slug;
                result.published = req.body.published;
                result.text = req.body.text;

                result.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'success'});
                });
            })
        })
        .delete(function (req, res, next) {
            Article.remove({
                _id: req.params.id
            }, function (err, result) {
                if (err)
                    res.send(err);

                res.json({message: 'success'});
            });
        });

module.exports = router;
