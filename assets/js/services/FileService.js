// Angular service for work with task 2
tasks.service('FileService', function($http, $q){
	return {
		// check matchs
		'start' : function(query){
			var defer = $q.defer();
			$http.post('/file/match', {'mode' : query}).success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		},
		// get strings of inputs.txt
		'getInputs' : function(){
			var defer = $q.defer();
			$http.get('/file/inputs').success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		},
		// get strings of patterns.txt
		'getPatterns' : function(){
			var defer = $q.defer();
			$http.get('/file/patterns').success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		}
	}
})