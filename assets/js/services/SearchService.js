tasks.service('SearchService', function($http, $q){
	return {
		'getResult' : function(query){
			var defer = $q.defer();
			$http.post('/search/getResult', {'query' : query}).success(function(res){
				defer.resolve(res);
			}).error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		}
	}
})