

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

	initMapping : (req,res, indexName, docType, payload) => {
		elasticClient.indices.putMapping({})
		.then( (response) => {
			res.status(200)
			return res.json(response)	
		}, (err) =>{
			res.status(500)
			return res.json(err)
		});		
	},

	addDocument :  (req,res, indexName, _id, docType, payload) => {
		elasticClient.index({
			index : indexName,
			type  : docType,
			id    : _id,
			body  : payload

		})
		.then( (response) => {
			res.status(200)
			return res.json(response)	
		}, (err) =>{
			res.status(500)
			return res.json(err)
		});	

	},

	updateDocument :  (req,res, indexName, _id, docType, payload) =>{
		elasticClient.update({
			index : indexName,
			type  : docType,
			id    : _id,
			body  : payload

		})
		.then( (response) => {
			if(err)
				return res.json(err);

			return res.json(response);	
		})	
		
	},

	search :  (req,res, indexName, _id, docType, payload) =>{
		
		elasticClient.search({
			index : indexName,
			type  : docType,
			id    : _id,
			body  : payload

		}).then( (response) => {

			console.log(response);
			res.status(200);
			return res.json(response)	;
		}, (err) =>{

			console.log(err.message);
			res.status(500);
			return res.json(err);
		});	
	},


	deleteDocument :  (req,res, index, _id, docType) => {
		
		elasticClient.delete({
			index : indexName,
			type  : docType,
			id    : _id
		}).then( (response) => {

			console.log(response);
			res.status(200);
			return res.json(response)	;
		}, (err) =>{

			console.log(err.message);
			res.status(500);
			return res.json(err);
		});	
	},


	deleteAll :  (req,res) => {
		elasticClient.delete({
			index : '_all'
		}, (err,resp) => {
			
			if(err){
				console.log(err.message);
			}
			else{
					console.log('Indexes have been deleted',resp);
					return res.json(resp);
			}
		})		
	}
}