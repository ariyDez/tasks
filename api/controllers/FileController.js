/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var fs1 = require('fs');
var fs = require('fs-io');
module.exports = {
	match : function(req, res){
		var results = [],
			mode = parseInt(req.param('mode'));
		var inputsContent   = fs1.readFileSync('inputs.txt', 'utf8'),
			patternsContent = fs1.readFileSync('patterns.txt', 'utf8');
		var inputsArray   = inputsContent.toString().split('\n'),
			patternsArray = patternsContent.toString().split('\n');
		for(i in patternsArray)
		{
			pattern = patternsArray[i].trim(); // current string in patterns.txt
			for(j in inputsArray)
			{
				input = inputsArray[j].trim(); //current string in inputs.txt
				if(mode == 1)
				{
					if(pattern == input)
					{
						var result = {
							value: input
						};
						results.push(result);
					}
				}
				else if(mode == 2)
				{
					var position = input.indexOf(pattern);
					if(position !== -1)
					{
						var result = {
							value: input
						};
						results.push(result);
					}
				}
				else if(mode == 3)
				{
					if(pattern == input)
					{
						var result = {
							value: input
						};
						results.push(result);
					}
					else
					{
						var count         = 0,				// deal of dismathes
							inputLength   = input.length,   // length of line in inputs.txt
							patternLength = pattern.length; // length of line in patterns.txt
							inputSymbol   = input[0],       // current symbol of input string
							patternSymbol = pattern[0];	    // current symbol of pattern string
						if(Math.abs(inputLength - patternLength) > 1)
							continue;
						maxLength = inputLength > patternLength ? inputLength : patternLength;

						//filling with spaces
						for(var k=0; k<maxLength-inputLength; k++)
							input += " ";
						for(var k=0; k<maxLength-patternLength; k++)
							pattern += " ";
						if(inputLength != patternLength)
						{
							for(var k=0; k<maxLength-1; k++)
							{
								if(inputSymbol != patternSymbol)
								{
									count++;
									if(inputLength > patternLength) inputSymbol = input[k+1];
									else if(patternLength > inputLength) patterSymbol = pattern[k+1];
								}
							}
						}
						else if(inputLength == patternLength)
						{
							for(var k=0; k<maxLength; k++)
								if(inputSymbol != patternSymbol)
									count++;
						}
						if(count <= 1)
						{
							var result = {
								value: input
							};
							results.push(result);
						}
					}
				}
			}
		}
		return res.json(results);
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

