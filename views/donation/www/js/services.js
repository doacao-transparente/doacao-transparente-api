app.factory("chaincode", function($q, $stateParams, $http, $ionicLoading, $rootScope) {
	return function(method, params){
		var deferred = $q.defer();

		var server = "https://c490fe6e78284b38a26a839e860dcffd-vp0.us.blockchain.ibm.com:5003";
		var url = server + "/chaincode";

    var body = JSON.stringify({
      "id": 1,
      "jsonrpc": "2.0",
      "method": method,
      "params": {
        "type": 1,
        "chaincodeID":{
            "name":"fffea559fc554c221952be096ed69645c83cb2d5d3f5d4d31c78f44afd303b7ee986b92ffd5ba837f4d8daa349bb3744df6d6987c00fca7dfbe39eeea3b8cc6e"
        },
        "ctorMsg": {
          "function": params.funct,
          "args": params.args
        },
          "secureContext":"user_type1_2"
      },
		});

		$http.post(url, params)
		.success(function (data, status) {
			$ionicLoading.hide();
			deferred.resolve(data);
		})
		.error(function (data, status) {
			$ionicLoading.hide();
			deferred.reject(status);
		});

		return deferred.promise;
	};
});
