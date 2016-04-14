
'use strict';
//angular.module('fullstackApp.controllers', []);
//angular.module('fullstackApp.services', ['ngResource']);

var services = angular.module('fullstackApp.services', ['ngResource']);


var baseUrl = 'http://127.0.0.1\\:1236';


services.factory('ToolsFactory', function ($resource) {
    return $resource(baseUrl + '/tools/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('ToolFactory', function ($resource) {
    return $resource(baseUrl + '/tool/:id', {}, {
        show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'}},
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});


services.factory('ImagesFactory', function ($resource) {
    return $resource(baseUrl + '/images/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('ImageFactory', function ($resource) {
    return $resource(baseUrl + '/image/:id', {}, {
        show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'}},
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});



services.factory('IaaSsFactory', function ($resource) {
    return $resource(baseUrl + '/iaass/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('IaaSFactory', function ($resource) {
    return $resource(baseUrl + '/iaas/:id', {}, {
        show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'}},
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});



services.factory('DeploysFactory', function ($resource) {
    return $resource(baseUrl + '/deploys/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('DeployFactory', function ($resource) {
    return $resource(baseUrl + '/deploy/:id', {}, {
        show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'}},
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});





var app = angular.module('fullstackApp.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function () {
    $templateCache.removeAll();
  });
});




app.controller('ToolListCtrl', ['$scope', 'ToolsFactory', 'ToolFactory', '$location', 
  function ($scope, ToolsFactory, ToolFactory, $location) {
		// callback for ng-click 'deleteTool': 
    $scope.deleteTool = function (toolId) {
      ToolFactory.delete({ id: toolId });
	  
	  $scope.tools = ToolsFactory.query(); 
      
    };

		$scope.tools = ToolsFactory.query();
		console.log($scope.tools )
		var count = 0
		for(key in $scope.tools) {
			count++
		}
		console.log("in tool-list ", count)

  }]);


app.controller('ToolDetailCtrl', ['$scope', '$routeParams', 'ToolsFactory', 'ToolFactory', '$location',
  function ($scope, $routeParams, ToolsFactory, ToolFactory, $location) {
 
    $scope.updateTool = function () {
	  console.log($scope.tool)
      ToolFactory.update($scope.tool);
	  //$location.path('/tool-list');
	  setTimeout(function(){ $location.path('/tool-list'); }, 10);
    };

    // callback for ng-click 'cancel': 
    $scope.cancel = function () {
      $location.path('/tool-list');
    };
	
	console.log($routeParams.id)
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
	
    $scope.tool = ToolFactory.show({id: $routeParams.id});
	console.log($scope.tool)
  }]);

app.controller('ToolCreateCtrl', ['$scope', 'ToolsFactory', '$location',
  function ($scope, ToolsFactory, $location) {

    // callback for ng-click 'createNewTool': 
    $scope.createNewTool = function () {
	  
	  console.log($scope.tool)
      ToolsFactory.create($scope.tool);
	  $location.path('/tool-list');
	  
    }
	
	
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
	//$scope.tool =  {tool_type: $scope.items[0].name}
    //console.log($scope.tool)
	//console.log($scope.items_type)
  
  }]); 



app.controller('ImageListCtrl', ['$scope', 'ImagesFactory', 'ImageFactory', '$location', 
  function ($scope, ImagesFactory, ImageFactory, $location) {

    // callback for ng-click 'deleteImage': 
    $scope.deleteImage = function (imageId) {
      ImageFactory.delete({ id: imageId });
	  
	  setTimeout(function(){ $scope.images = ImagesFactory.query(); }, 10);
      
    };

    $scope.images = ImagesFactory.query();
  }]);


app.controller('ImageDetailCtrl', ['$scope', '$routeParams', 'ImageFactory', '$location',
  function ($scope, $routeParams, ImageFactory, $location) {
 
    $scope.updateImage = function () {
	  
      ImageFactory.update($scope.image);
	  
	  setTimeout(function(){ $location.path('/image-list'); }, 10);
    };

    // callback for ng-click 'cancel': 
    $scope.cancel = function () {
      $location.path('/image-list');
    };
	
	console.log($routeParams.id)
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
    $scope.image = ImageFactory.show({id: $routeParams.id});
  }]);

app.controller('ImageCreateCtrl', ['$scope', 'ImagesFactory', '$location',
  function ($scope, ImagesFactory, $location) {

    // callback for ng-click 'createNewImage': 
    $scope.createNewImage = function () {
	  
	  console.log($scope.image)
      ImagesFactory.create($scope.image);
	  
      setTimeout(function(){ $location.path('/image-list'); }, 10);
    }
	
	
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
	//$scope.tool =  {tool_type: $scope.items[0].name}
    //console.log($scope.tool)
	//console.log($scope.items_type)
  
  }]); 

  




app.controller('IaaSListCtrl', ['$scope', 'IaaSsFactory', 'IaaSFactory', '$location', 
  function ($scope, IaaSsFactory, IaaSFactory, $location) {

    // callback for ng-click 'deleteIaaS': 
    $scope.deleteIaaS = function (iaasId) {
      IaaSFactory.delete({ id: iaasId });
	  
	  setTimeout(function(){ $scope.iaass = IaaSsFactory.query(); }, 10);
      
    };

    $scope.iaass = IaaSsFactory.query();
  }]);


app.controller('IaaSDetailCtrl', ['$scope', '$routeParams', 'IaaSFactory', '$location',
  function ($scope, $routeParams, IaaSFactory, $location) {
 
    $scope.updateIaaS = function () {

	  console.log($scope.iaas)

      IaaSFactory.update($scope.iaas);
	  
	  setTimeout(function(){ $location.path('/iaas-list'); }, 10);
    };

    // callback for ng-click 'cancel': 
    $scope.cancel = function () {
      $location.path('/iaas-list');
    };
	
	console.log($routeParams.id)
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
    $scope.iaas = IaaSFactory.show({id: $routeParams.id});
  }]);

app.controller('IaaSCreateCtrl', ['$scope', 'IaaSsFactory', '$location',
  function ($scope, IaaSsFactory, $location) {

    // callback for ng-click 'createNewIaaS': 
    $scope.createNewIaaS = function () {
	  
	  console.log($scope.iaas)
      IaaSsFactory.create($scope.iaas);
	  
      setTimeout(function(){ $location.path('/iaas-list'); }, 10);
    }
	
	
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
	//$scope.tool =  {tool_type: $scope.items[0].name}
    //console.log($scope.tool)
	//console.log($scope.items_type)
  
  }]); 

  





app.controller('DeployListCtrl', ['$scope', 'DeploysFactory', 'DeployFactory', '$location', 
  function ($scope, DeploysFactory, DeployFactory, IaaSsFactory, $location) {

    // callback for ng-click 'deleteDeploy': 
    $scope.deleteDeploy = function (deployId) {
      DeployFactory.delete({ id: deployId });
	  
	  setTimeout(function(){ $scope.tools = DeploysFactory.query(); }, 10);
      
    };

    $scope.tools = DeploysFactory.query();
  }]);


app.controller('DeployDetailCtrl', ['$scope', '$routeParams', 'DeployFactory', '$location',
  function ($scope, $routeParams, DeployFactory, $location) {
 
    $scope.updateDeploy = function () {
	  
      DeployFactory.update($scope.deploy);
	  
	  setTimeout(function(){ $location.path('/deploy-list'); }, 10);
    };

    // callback for ng-click 'cancel': 
    $scope.cancel = function () {
      $location.path('/deploy-list');
    };
	
	console.log($routeParams.id)
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
    $scope.deploy = DeployFactory.show({id: $routeParams.id});
  }]);

app.controller('DeployCreateCtrl', ['$scope', 'DeploysFactory', 'ToolsFactory', 'ImagesFactory', 'IaaSsFactory', '$location',
  function ($scope, DeploysFactory, ToolsFactory, ImagesFactory, IaaSsFactory, $location) {

    // callback for ng-click 'createNewDeploy': 
    $scope.createNewDeploy = function () {
	  
	  console.log($scope.deploy)
	  $scope.deploy.tool = []
	  angular.forEach($scope.items_tool , function(value){
        if(value.check == true) {
           $scope.deploy.tool.push({idTool: value.id, name: value.name});
		}

      });

	  console.log($scope.deploy)

      //DeploysFactory.create($scope.deploy);
	  
      setTimeout(function(){ $location.path('/deploy-list'); }, 10);
    }

    console.log("in create ")
	//$scope.tool = {};
	var tools = ToolsFactory.query();
    
	setTimeout(function(){ 
		console.log("in tools ", Object.keys(tools).length)
		console.log("t", tools) 
			}, 10);

	$scope.items_tool = []

    //setTimeout( function(){ 
		angular.forEach(tools , function(value){

		concole.log("incide tools")

        $scope.items_tool.push({idTool: value.id, name: value.name , check: false});

      }); 
	  //}, 10);

	console.log($scope.items_tool)
	  
	var images = ImagesFactory.query();
	$scope.items_image  = [];
	setTimeout( function(){ angular.forEach(images , function(value){

        $scope.items_image.push({idImage: value.id, name: value.display , check: false});

      }); }, 10); 


	  $scope.items_iaas = IaaSsFactory.query();
	
	//$scope.items_type = [{name: "ansible" , description: "Ansible"}, {name: "cm" , description: "puppet"}, {name: "discovery" , description: "template"},]
	//$scope.tool =  {tool_type: $scope.items[0].name}
    console.log($scope.items_tool)
	//console.log($scope.items_type)
  
  }]); 




angular.module('fullstackApp', [
//	'ngResource',
  'fullstackApp.services',
  'fullstackApp.controllers'
  ])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/deploy', {templateUrl: 'partials/deploy/deploy.html'});
  $routeProvider.when('/monitor', {templateUrl: 'partials/deploy/monitor.html'});
  $routeProvider.when('/settings', {templateUrl: 'partials/settings.html'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
  
  $routeProvider.when('/tool-list', {templateUrl: 'partials/settings/tool/list.html', controller: 'ToolListCtrl'});
  $routeProvider.when('/tool-create', {templateUrl: 'partials/settings/tool/create.html', controller: 'ToolCreateCtrl'});
  $routeProvider.when('/tool-edit/:id', {templateUrl: 'partials/settings/tool/edit.html', controller: 'ToolDetailCtrl'});

  $routeProvider.when('/image-list', {templateUrl: 'partials/settings/image/list.html', controller: 'ImageListCtrl'});
  $routeProvider.when('/image-create', {templateUrl: 'partials/settings/image/create.html', controller: 'ImageCreateCtrl'});
  $routeProvider.when('/image-edit/:id', {templateUrl: 'partials/settings/image/edit.html', controller: 'ImageDetailCtrl'});

  $routeProvider.when('/iaas-list', {templateUrl: 'partials/settings/iaas/list.html', controller: 'IaaSListCtrl'});
  $routeProvider.when('/iaas-create', {templateUrl: 'partials/settings/iaas/create.html', controller: 'IaaSCreateCtrl'});
  $routeProvider.when('/iaas-edit/:id', {templateUrl: 'partials/settings/iaas/edit.html', controller: 'IaaSDetailCtrl'});

  $routeProvider.when('/deploy-list', {templateUrl: 'partials/deploy/list.html', controller: 'DeployListCtrl'});
  $routeProvider.when('/deploy-create', {templateUrl: 'partials/deploy/create.html', controller: 'DeployCreateCtrl'});
  $routeProvider.when('/deploy-edit/:id', {templateUrl: 'partials/deploy/edit.html', controller: 'DeployDetailCtrl'});


    //$routeProvider.when('/', {templateUrl: 'views/user-list.html', controller: 'UserListCtrl'});
  
  $routeProvider.otherwise({redirectTo: '/home'});

  /* CORS... */
  /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});