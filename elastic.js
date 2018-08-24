

const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
	host: 'localhost:9200',
	log:  'trace'
});

module.exports = {

	ping : (req,res) => {
			elasticClient.ping({
				requestTimeout : 30000,
			}, (error) => {
			   if(error){
			   	res.status(500)
			   		return res.json({status : false, msg: 'elasticsearch cluster is down'})
			   }
			   else(){
			   	res.status(500)
			   		return res.json({status : true, msg: 'Sucess! elasticsearch cluster is up'})
			   }
			})
	},

	initIndex :  (req,res, indexName) => {
		 elasticClient.indices.create({
		 	 index : indexName
		 }).then( (response) => {
		 	 res.status(200)
		 	 return res.json(response);
		 }).catch((err) => {
		 	res.status(500)
		 	return res.json(err);
		 })
	},

	initExists:  (req,res, indexName) => {
		 elasticClient.indices.exists({
		 	 index : indexName
		 }).then( (response) => {
		 	 res.status(200)
		 	 return res.json(response);
		 }).catch((err) => {
		 	res.status(500)
		 	return res.json(err);
		 })
	},



}