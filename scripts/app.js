(function(){

      var app = angular.module("SecureBankAPP", ['ngRoute', 'ngMaterial']);
      app.config(function($routeProvider){
                  $routeProvider
                  .when("/security/login", {
                        template: "<login-component></login-component>"
                  })
                  .when("/security/register", {
                        template: "<register-component></register-component>"
                  })
                  .otherwise({redirectTo: "/security/login"});
      });
}());
