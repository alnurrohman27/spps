function login($scope,$http,$window,$rootScope){
	$scope.id;
	$scope.password;
	$scope.message = null;

	$scope.login_validation = function(){
		var data = $.param({
			id:$scope.id,
			password:$scope.password,
			table:"login"
		});

		var config = {
	        headers : {
	            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	        }
	    }

	    $http.post("views/php/search.php", data, config).
	        success(function(data, status, headers, config) {
	            if(data !=0){
		        	sessionStorage.setItem('id', $scope.id);
		        	sessionStorage.setItem('name', data[0].NAMA);

		        	$window.location.reload();
		        	$window.location.href = '/spps/#/dashboards';
		        }
		        else{
		        	$scope.message = "Login gagal";
		        }
	        });
	}
}

angular
	.module('spps')
	.controller('login', login);