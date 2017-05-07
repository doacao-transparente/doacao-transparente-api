app.controller('HomeController',
	function($rootScope, $scope, $stateParams)
	{
		/* ****************************************** */
		/* Init Methods								  */
		/* ****************************************** */

		/* ****************************************** */
		/* Scope Variable							  */
		/* ****************************************** */

		/* ****************************************** */
		/* Controller Methods						  */
		/* ****************************************** */

	}
);

app.controller('NGOController',
	function($rootScope, $scope, $stateParams, chaincode)
	{
		/* ****************************************** */
		/* Init Methods								  */
		/* ****************************************** */
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams)
		{
			if (toState.name === "ngo") {
				$scope.listNGO();
			}
    });

		/* ****************************************** */
		/* Scope Variable							  */
		/* ****************************************** */
		$scope.ngo = [];

		/* ****************************************** */
		/* Controller Methods						  */
		/* ****************************************** */

    $scope.listNGO = function() {

      var params = {
        funct: "queryOverKeys",
        args: ["_projects"]
      };

      chaincode("query", params).then(
				function (response)
				{
					$scope.ngo = [];
					angular.forEach(response["data"], function(value, key) {
							var json = angular.fromJson(value);

							var notreaded = (json["\0message\0lido"] === "0" ? "msg_notreaded " : "");
							var attach = (json["\0message\0anexos"] === "" ? "" : "msg_attach ");
							var important = (json["\0message\0importante"] === "1" ? "msg_important " : "");
							var forward = (json["\0message\0respondidoem"] === null ? "" : "msg_forward ");

							this.push({
								id			: json["\0message\0id"],
								de			: json["\0message\0de"],
								para		: json["\0message\0para"],
								data		: json["\0message\0data"],
								hora		: json["\0message\0hora"],
								lido		: json["\0message\0lido"],
								lidoem		: json["\0message\0lidoem"],
								respondidoem: json["\0message\0respondidoem"],
								importante	: json["\0message\0importante"],
								mensagem	: json["\0message\0mensagem"],
								texto		: angular.element("<div>"+json["\0message\0mensagem"]+"</div>").text(),
								assunto		: json["\0message\0assunto"],
								anexos		: json["\0message\0anexos"],
								nome		: json["\0message\0nome"],
								avatar		: $rootScope.serverAddress + "Clientes/" + $rootScope.customer + "/Files/Fotos/" + json["\0message\0avatar"],
								css			: notreaded + attach + (json["\0message\0lido"] === "0" ? "" : important + forward)
							});
					}, $scope.mensagens);

					$scope.updateMail();
					$scope.$emit('badgeMensagem', parseInt(response["badge"], 10));
					var total = parseInt(response["total"], 10);
					if (total >= 0) {
						$scope.filter.hasMoreContent = ($scope.mensagens.length < total);
					}

					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$ionicLoading.hide();
				},
				function(error)
				{
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$ionicLoading.hide();
					$scope.errorMensagemMsg  = true;
				}
			);
	  };
	}
);

app.controller('CityHallController',
	function($rootScope, $scope, $stateParams)
	{
		/* ****************************************** */
		/* Init Methods								  */
		/* ****************************************** */

		/* ****************************************** */
		/* Scope Variable							  */
		/* ****************************************** */

		/* ****************************************** */
		/* Controller Methods						  */
		/* ****************************************** */

	}
);

app.controller('DonorsController',
	function($rootScope, $scope, $stateParams)
	{
		/* ****************************************** */
		/* Init Methods								  */
		/* ****************************************** */

		/* ****************************************** */
		/* Scope Variable							  */
		/* ****************************************** */

		/* ****************************************** */
		/* Controller Methods						  */
		/* ****************************************** */

	}
);

app.controller('AuditController',
	function($rootScope, $scope, $stateParams)
	{
		/* ****************************************** */
		/* Init Methods								  */
		/* ****************************************** */

		/* ****************************************** */
		/* Scope Variable							  */
		/* ****************************************** */

		/* ****************************************** */
		/* Controller Methods						  */
		/* ****************************************** */

	}
);
