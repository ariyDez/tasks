/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs-io');
module.exports = {
	match : function(req, res){
		fs.readFile('inputs.txt')
			.then((fileContents1) => {
				if(parseInt(req.param('mode')) == 0)
					return res.json([{value: "You didn't choose mode"}]);
				var inputs = fileContents1.toString().split('\n');
				fs.readFile('patterns.txt')
					.then((fileContents2) => {
						var results = [];
						var patterns = fileContents2.toString().split('\n');
						for(var i in patterns)
						{
							patterns[i] = patterns[i].trim();
							for(var j=0; j<inputs.length; j++)
							{
								inputs[j] = inputs[j].trim();
								if(parseInt(req.param('mode')) == 1)
								{
									if(patterns[i] == inputs[j])
									{
										var result = {
											value: inputs[j]
										};
										results.push(result);
									}
								}
								else if(parseInt(req.param('mode')) == 2)
								{
									pos = inputs[j].indexOf(patterns[i]);
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
										var result = {
											value: inputs[j]
										};
										results.push(result);
									}
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
										max = l1>l2 ? l1 : l2;

										// filling with spaces
										for(var k=0;k<max-l1;k++)
											pattern += " ";
										for(var k=0;k<max-l2;k++)
											input += " ";

										if(l1 != l2)
										{
											var inputL   = input[0],   // current symbol of input string
												patternL = pattern[0]; // current symbol of pattern string
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
										else if(l1 == l2)
										{
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
					}).catch((error) => {
						sails.log.error(error);
					});
			}).catch((error) => {
				sails.log.error(error);
			});
	},
	// getting inputs.txt strings
	inputs : function(req, res)
	{
		fs.readFile('inputs.txt')
			.then((fileContents) =>{
				var results = [];
				var inputs = fileContents.toString().split('\n');
				for(var i in inputs)
				{
					inputs[i] = inputs[i].trim();
					var result = {
						value: inputs[i]
					};
					results.push(result);
				}
				return res.json(results);
			}).catch((error) => {
				sails.log.error(error);
			});
	},
	// getting patterns.txt strings
	patterns : function(req, res)
	{
		fs.readFile('patterns.txt')
			.then((fileContents) =>{
				var results = [];
				var patterns = fileContents.toString().split('\n');
				for(var i in patterns)
				{
					patterns[i] = patterns[i].trim();
					var result = {
						value: patterns[i]
					};
					results.push(result);
				}
				return res.json(results);
			}).catch((error) =>{
				sails.log.error(error);
			});
	}
};

