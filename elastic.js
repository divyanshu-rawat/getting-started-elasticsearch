

const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
	host: 'localhost:9200',
	log:  'trace'
});

module.exports = {

	ping : (req,res) +> {
			elasticClient.ping({
				requestTimeout : 30000,
			},function (error) {
			   if(error){
			   	res.status(500)
			   		return res.json({status : false, msg: 'elasticsearch cluster is down'})
			   }
			   else(){
			   	res.status(500)
			   		return res.json({status : true, msg: 'Sucess! elasticsearch cluster is up'})
			   }
			})
	}


}