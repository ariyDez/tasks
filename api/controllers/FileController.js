/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {
	match : function(req, res){
		// reading inputs.txt file
		fs.readFile('inputs.txt', 'utf8', function(err, data){
			if(err) sails.log.error(err);

			// if not chosen no one mode, return error msg
			if(parseInt(req.param('mode')) == 0)
				return res.json([{value: "You didn't choose mode"}]);
			// split to array
			var inputs = data.toString().split('\n');

			//reading patterns.txt file
			fs.readFile('patterns.txt', 'utf8', function(err, data){
				var results = [];
				if(err) sails.log.error(err);
				var patterns = data.toString().split('\n');
				for(var i in patterns)
				{
					// removing whitespaces
					patterns[i] = patterns[i].trim();
					for(var j=0; j<inputs.length; j++)
					{
						// removing whitespaces
						inputs[j] = inputs[j].trim();

						// if chosen mode 1
						if(parseInt(req.param('mode')) == 1)
						{
							//if strings are equal
							if(patterns[i] == inputs[j])
							{
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
						}
						// if chosen mode 2
						else if(parseInt(req.param('mode')) == 2)
						{
							// check if string in inputs.txt contain string in patterns.txt
							pos = inputs[j].indexOf(patterns[i]);
							// if contain then
							// return results
							if(-1 !== pos)
							{
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
						}
						// if chosen mode 3
						else if(parseInt(req.param('mode')) == 3)
						{
							//if strings are equal
							if(patterns[i] == inputs[j])
							{
								var result = {
									value: inputs[j]
								};
								results.push(result);
							}
							// if not equal do some process below
							else
							{
								var count = 0, // deal of dismatches
									pattern = patterns[i], //current string
									input = inputs[j], // current string
									l1 = pattern.length, // length of pattern string
									l2 = input.length;   // length of input string
								// if difference between length of pattern string and length of input string higher than 1, continue
								if(Math.abs(l1-l2) > 1)
									continue;
								// determ max length
								max = l1>l2 ? l1 : l2;

								// filling with spaces
								for(var k=0;k<max-l1;k++)
									pattern += " ";
								for(var k=0;k<max-l2;k++)
									input += " ";

								// if length of pattern string differ from length of input string
								if(l1 != l2)
								{
									var inputL   = input[0],   // current symbol of input string
										patternL = pattern[0]; // current symbol of pattern string
									// looks throw string, which length is max
									for(var k=0;k<max-1;k++)
									{
										// if symbols are different
										if(inputL != patternL)
										{
											count++; // increase counter of dismatches
											if(l1>l2) patternL = pattern[k+1]  // shift position
											else if(l2>l1) inputL = input[k+1];// shift position
										}
									}
									
								}
								// if length of input and pattern string are equal
								else if(l1 == l2)
								{
									// looks throw string
									for(var k=0; k<max; k++)
									{
										var inputL   = input[0],
											patternL = pattern[0];
										// if symbols are different  increase counter
										if(inputL != patternL)
											count++;
									}
								}
								// if edit distance lower or equal 1, return results
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
				return res.json(results);
			});
		});
	},
	// getting inputs.txt strings
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
	// getting patterns.txt strings
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

