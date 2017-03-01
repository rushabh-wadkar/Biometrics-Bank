(function(){

      var loginModule = angular.module("SecureBankAPP");
      loginModule.component("loginComponent", {
            templateUrl: "app/views/security/login/login.html",
            controllerAs: "model",
            controller: function(){
                  var model = this;

                  model.$onInit = function(){
                        console.log("Login Component loaded");
                  };

                  model.redirectTo = function(strng){
                              console.log(strng);
                  };
            }
      })

}());
