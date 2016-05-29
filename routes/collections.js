var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/blog', {safe:true})
var id = mongoskin.helper.toObjectID;

router.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName);
  return next();
});

router.get('/:collectionName', function(req, res, next) {
  req.collection.find({}, {limit: 10, sort: [['_id', -1]]})
    .toArray(function(e, results){
      if (e) return next(e)
      res.send(results)
    }
  )
});

router.post('/:collectionName', function(req, res, next) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

router.get('/:collectionName/:id', function(req, res, next) {
  req.collection.findOne({_id: id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send(result)
  })
});

router.put('/:collectionName/:id', function(req, res, next) {
  req.collection.update({_id: id(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false}, function(e, result){
    if (e) return next(e)
    res.send((result === 1) ? {msg:'success'} : {msg:'error'})
  })
});

router.delete('/:collectionName/:id', function(req, res, next) {
  req.collection.remove({_id: id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send((result === 1) ? {msg:'success'} : {msg:'error'})
  })
});

module.exports = router;
