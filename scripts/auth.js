(function(){

      var AuthModule = angular.module("SecureBankAPP");

      AuthModule.factory("auth", function($firebaseAuth){
                  return $firebaseAuth();
      });

}());
