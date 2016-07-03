/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var google = require('google');

module.exports = {
	show: function(req, res){
		google(req.param('query'), function(err, resp){
			if(err) console.log(err);
			var link = resp.links[0];
			return res.json(link);
		})
	}

};

