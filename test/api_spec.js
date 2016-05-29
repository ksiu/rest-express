var superagent = require('superagent');
var expect = require('expect.js');
var boot = require('../app').boot;
var shutdown = require('../app').shutdown;

describe('express rest api server', function () {
    before(function () {
        boot();
    });

    var id;

    it('post an article', function (done) {
        superagent.post('http://localhost:3000/articles')
                .send({
                    title: "RESTful Web Services",
                    slug: "rest-web-services",
                    published: false,
                    text: "RESTful Web Services"
                })
                .end(function (e, res) {
                    // console.log(res.body)
                    expect(e).to.eql(null)
                    expect(res.body._id.length).to.eql(24)
                    id = res.body._id
                    done()
                })
    });

    it('retrieves an article', function (done) {
        superagent.get('http://localhost:3000/articles')
                .end(function (e, res) {
                    //    console.log(res.body)
                    expect(e).to.eql(null)
                    expect(typeof res.body).to.eql('object')
                    expect(res.body.length).to.eql(8);
                    expect(res.body[0].title).to.eql('Express.js Experience');
                    done()
                })
    });

    it('retrieves a collection', function (done) {
        superagent.get('http://localhost:3000/articles')
                .end(function (e, res) {
                    // console.log(res.body)
                    expect(e).to.eql(null)
                    expect(res.body.length).to.be.above(0)
                    expect(res.body.map(function (item) {
                        return item._id
                    })).to.contain(id)
                    done()
                })
    });

    it('updates an object', function (done) {
        superagent.put('http://localhost:3000/articles/' + id)
                .send({
                    title: "RESTful Web Services",
                    slug: "rest-web-services",
                    published: true,
                    text: "RESTful Web Services"
                })
                .end(function (e, res) {
                    // console.log(res.body)
                    expect(e).to.eql(null)
                    expect(typeof res.body).to.eql('object')
                    expect(res.body.message).to.eql('success')
                    done()
                })
    });

    it('checks an updated object', function (done) {
        superagent.get('http://localhost:3000/articles/' + id)
                .end(function (e, res) {
                    // console.log(res.body)
                    expect(e).to.eql(null)
                    expect(typeof res.body).to.eql('object')
                    expect(res.body._id.length).to.eql(24)
                    expect(res.body._id).to.eql(id)
                    expect(res.body.published).to.eql(true)
                    done()
                })
    });

    it('removes an object', function (done) {
        superagent.del('http://localhost:3000/articles/' + id)
                .end(function (e, res) {
                    // console.log(res.body)
                    expect(e).to.eql(null)
                    expect(typeof res.body).to.eql('object')
                    expect(res.body.message).to.eql('success')
                    done()
                })
    });


    after(function () {
        shutdown();
    });
});