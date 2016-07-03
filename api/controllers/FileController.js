/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {
	match : function(req, res){
		fs.readFile('inputs.txt', 'utf8', function(err, data){
			if(err) console.log(err);
			if(parseInt(req.param('mode')) == 0)
				return res.json([{value: "You didn't choose mode"}]);
			var inputs = data.toString().split('\n');
			for(i in inputs)
				console.log(inputs[i]);
			fs.readFile('patterns.txt', 'utf8', function(err, data){
				var results = [];
				if(err) console.log(err);
				var patterns = data.toString().split('\n');
				for(var i in patterns)
				{
					// removing whitespaces
					patterns[i] = patterns[i].trim();
					for(var j=0; j<inputs.length; j++)
					{
						// removing whitespaces
						inputs[j] = inputs[j].trim();
						sails.log.warn("Pattern["+i+"]");
						console.log("|"+patterns[i]+"|");
						sails.log.debug("Input["+j+"]");
						console.log("|"+inputs[j]+"|");
						if(parseInt(req.param('mode')) == 1)
						{
							if(patterns[i] == inputs[j])
							{
								sails.log.error("Yeeeaap");
								console.log(patterns[i]);
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
						}
						else if(parseInt(req.param('mode')) == 2)
						{
							pos = inputs[j].indexOf(patterns[i]);
							console.log("pos: "+ pos);
							if(-1 !== pos)
							{
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
						}
						else if(parseInt(req.param('mode')) == 3)
						{
							if(patterns[i] == inputs[j])
							{
								sails.log.error("Yeeeaap");
								console.log(patterns[i]);
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
							else
							{
								var count = 0,
									pattern = patterns[i],
									input = inputs[j],
									l1 = pattern.length,
									l2 = input.length;

								if(Math.abs(l1-l2) > 1)
									continue;
								sails.log.error('we are stay here');
								max = l1>l2 ? l1 : l2;
								sails.log.error('max: '+max);
								for(var k=0;k<max-l1;k++)
									pattern += " ";
								for(var k=0;k<max-l2;k++)
									input += " ";
								console.log("|"+pattern+"|");
								console.log("|"+input+"|");
								if(l1 != l2)
								{
									sails.log.error("we are here");
									var inputL   = input[0],
										patternL = pattern[0];
									for(var k=0;k<max-1;k++)
									{
										if(inputL != patternL)
										{
											sails.log.error("mismatch in "+k+" index");
											count++;
											if(l1>l2) patternL = pattern[k+1]
											else if(l2>l1) inputL = input[k+1];
										}
									}
									
								}
								else if(l1 == l2)
								{
									for(var k=0; k<max; k++)
									{
										var inputL   = input[0],
											patternL = pattern[0];
										if(inputL != patternL)
											count++;
									}
								}
								if(count <= 1)
								{
									var result = {
										value: inputs[j]
									};
									results.push(result);
								}
							}
						}
					}	
				}
				console.log(results);
				return res.json(results);
			});
			sails.log.info('bla-bla-bal');
			var result = {
				value: 'This is '+ req.param('mode')
			};
			// return res.json(result);
		});
	},
	inputs : function(req, res)
	{
		fs.readFile('inputs.txt', 'utf8', function(err, data){
			if(err) sails.log.error(err);
			var inputs = data.toString().split('\n');
			var results = [];
			for(var i in inputs)
			{
				inputs[i] = inputs[i].trim();
				var result = {
					value: inputs[i]
				};
				results.push(result);
			}
			return res.json(results);
		});
	},
	patterns : function(req, res)
	{
		fs.readFile('patterns.txt', 'utf8', function(err, data){
			if(err) sails.log.error(err);
			var patterns = data.toString().split('\n');
			var results = [];
			for(var i in patterns)
			{
				patterns[i] = patterns[i].trim();
				var result = {
					value: patterns[i]
				};
				results.push(result);
			}
			return res.json(results);
		});
	}
};

