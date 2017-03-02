(function(){

      var loginModule = angular.module("SecureBankAPP");
      loginModule.component("loginComponent", {
            templateUrl: "app/views/security/login/login.html",
            controllerAs: "model",
            controller: function($location){
                  var model = this;

                  model.$onInit = function(){
                        console.log("Application loaded successfully");
                  };

                  model.redirectTo = function(strng){
                              if(strng === "register"){
                                    $location.path("/security/register");
                              }
                  };
            }
      })

}());
