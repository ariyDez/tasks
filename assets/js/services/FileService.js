tasks.service('FileService', function($http, $q){
	return {
		'start' : function(query){
			var defer = $q.defer();
			$http.post('/file/match', {'mode' : query}).success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		},
		'getInputs' : function(){
			var defer = $q.defer();
			$http.get('/file/inputs').success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		},
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