var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    text: String
});

module.exports = mongoose.model('Article', ArticleSchema);