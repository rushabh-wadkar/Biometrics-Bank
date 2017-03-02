(function(){

      var app = angular.module("SecureBankAPP", ['ngRoute', 'ngMaterial', 'firebase']);
      // Initialize Firebase
        var config = {
          apiKey: "AIzaSyAW_hxN6ZoksVZnirquaVWOksEHxmnSNJ0",
          authDomain: "biometrics-bank.firebaseapp.com",
          databaseURL: "https://biometrics-bank.firebaseio.com",
          storageBucket: "biometrics-bank.appspot.com",
          messagingSenderId: "178256206226"
        };
        firebase.initializeApp(config);

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
