const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

elasticClient.ping({
  requestTimeout: 30000,
}, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  }
  else {
    console.log('Everything is ok');
  }
});

elasticClient.indices.create({
  index: 'blog'
}, (err, resp, status) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("create", resp);
  }
});

elasticClient.index({
  index: 'blog',
  id: '1',
  type: 'posts',
  body: {
    "PostName": "Integrating Elasticsearch Into Your Node.js Application",
    "PostType": "Tutorial",
    "PostBody": "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
  }
}, function(err, resp, status) {
  console.log(resp);
});

elasticClient.search({

  index: 'blog',
  type: 'posts',
  q: 'PostName:Node.js'

}).then(function(resp) {

  console.log(resp);
}, function(err) {

  console.trace(err.message);
});




elasticClient.search({
    index: 'blog',
    type: 'posts',
    body: {
        query: {
            match: {
                "PostName": 'Node.js'
            }
        }
    }
}).then(function(resp) {
    console.log(resp);
}, function(err) {
    console.trace(err.message);
});