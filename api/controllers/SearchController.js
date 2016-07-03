/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 // require library for working with google search
var google = require('google');

module.exports = {
	show: function(req, res){
		// send query to google search
		google(req.param('query'), function(err, resp){
			if(err) console.log(err);
			// get first result
			var link = resp.links[0];
			if(!link) return res.json({title: 'Ничего не найдено'})
			// and return results
			return res.json(link);
		});
	}

};

