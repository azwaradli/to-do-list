var todoApp = angular.module('todoApp', []);

todoApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

todoApp.controller('FormController', ['$scope', '$http', '$q', function($scope, $http, $q){
	getTodos();

	$scope.toggleClick = function(param){
		var button = ".todo-button-"+param;
		$(button).slideToggle();
	}

	function getTodos(){
		$http({
			method: 'GET',
			url: 'php/gettodos.php'
		})
		.success(function(response){
			$scope.todos = response;
		})
	}

	function getTodo(id, edittodo){
		var deferred = $q.defer();

		return $http({
			method: 'GET',
			url: "php/gettodo.php",
			params: {'id': id}
		})
		.then(function(response){
			deferred.resolve(response);
			return deferred.promise;
		},function(response){
			deferred.reject(response);
			return deferred.promise;
		});
	}

	$scope.showEditTodo = function(id, edittodo){
		getTodo(id, edittodo).then(function(response){
			$scope.title = response.data.title;
			$scope.description = response.data.description;
			$scope.startdate = response.data.start_date;

			var t = response.data.start_date.split(/[- :]/);
			var start_date = new Date(t[0], t[1]-1, t[2]);
			$scope.startdate = start_date;

			t = response.data.start_date.split(/[- :]/);
			var end_date = new Date(t[0], t[1]-1, t[2]);
			$scope.enddate = end_date;

			$scope.priority = response.data.priority;
			$scope.id = response.data.id;
		});
	}

	$scope.createTodo = function(newtodo){
		$http({
			method: 'POST',
			url: 'php/addtodo.php',
			data: {
				'title': newtodo.title,
				'desc': newtodo.description,
				'startdate': newtodo.startdate,
				'enddate': newtodo.enddate,
				'priority': newtodo.priority
			}
		})
			.success(function(response){
				alert(response.message);
				newtodo.title = "";
				newtodo.description = "";
				newtodo.startdate = "";
				newtodo.enddate = "";
				newtodo.priority = "";

				getTodos();
			})
			.error(function(response){
				alert("Send request failed");
			}
		);
	}

	$scope.editTodo = function(){
		$http({
			method: 'POST',
			url: 'php/updatetodo.php',
			data: {
				'id': $scope.id,
				'title': $scope.title,
				'desc': $scope.description,
				'startdate': $scope.startdate,
				'enddate': $scope.enddate,
				'priority': $scope.priority
			}
		})
		.success(function(response){
			alert(response.message);

			$scope.title = "";
			$scope.description = "";
			$scope.startdate = "";
			$scope.enddate = "";
			$scope.priority = "";

			getTodos();
		})
		.error(function(response){
			alert("Send request failed");
		});
	}

	$scope.removeTodo = function(id){
		if(confirm("Are you sure you want to delete this todo?")){
			$http({
				method: 'GET',
				url: 'php/deletetodo.php',
				params: {"id": id}
			})
			.success(function(response){
				alert(response.message);
				getTodos();
			})
			.error(function(response){
				alert("Send request failed");
			});
		}		
	}
}]);
