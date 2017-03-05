(function(){

      var app = angular.module("SecureBankAPP", ['ngRoute', 'ngMaterial', 'firebase','ngMdIcons','md.data.table']);
      // Initialize Firebase
        var config = {
          apiKey: "AIzaSyAW_hxN6ZoksVZnirquaVWOksEHxmnSNJ0",
          authDomain: "biometrics-bank.firebaseapp.com",
          databaseURL: "https://biometrics-bank.firebaseio.com",
          storageBucket: "biometrics-bank.appspot.com",
          messagingSenderId: "178256206226"
        };
        firebase.initializeApp(config);
        // for ngRoute
       app.run(["$rootScope", "$location", function($rootScope, $location) {
         $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
           // We can catch the error thrown when the $requireSignIn promise is rejected
           // and redirect the user back to the home page
           if (error === "AUTH_REQUIRED") {
             $location.path("/security/login");
           }
         });
       }]);

      app.config(function($routeProvider){
                  $routeProvider
                  .when("/security/login", {
                        template: "<login-component user-auth='$resolve.currentAuth'></login-component>",
                        resolve: {
                              currentAuth: function(auth){
                                    return auth.$waitForSignIn();
                              }
                        }
                  })
                  .when("/security/register", {
                        template: "<register-component></register-component>"
                  })
                  .when("/account/dashboard", {
                        template: "<account-component user-auth='$resolve.currentAuth' get-user='$resolve.getUser' accounts='$resolve.getAccounts' logs='$resolve.getLogs'></account-component>",
                        resolve: {
                              currentAuth: function(auth){
                                    return auth.$requireSignIn();
                              },
					getUser: function(auth, $firebaseObject, DbReference){
						return auth.$requireSignIn().then(function(){
								var uidKey = auth.$getAuth();
								return $firebaseObject(DbReference.getUser(uidKey.uid)).$loaded();
						});
					},
                              getAccounts: function(auth, $firebaseArray, DbReference){
                                    return auth.$requireSignIn().then(function(){
                                          var uidKey = auth.$getAuth();
                                          return $firebaseArray(DbReference.getAccounts(uidKey.uid)).$loaded();
                                    });
                              },
                              getLogs: function(auth, $firebaseArray, DbReference){
                                    return auth.$requireSignIn().then(function(){
                                          var uidKey = auth.$getAuth();
                                          return $firebaseArray(DbReference.logs(uidKey.uid)).$loaded();
                                    });
                              }
                        }
                  })
                  .when("/security/logout", {
                        template: "<logout></logout>"
                  })
                  .otherwise({redirectTo: "/security/login"});
      });
}());
