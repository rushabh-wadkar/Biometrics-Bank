(function(){

      var RootReferenceModule = angular.module("SecureBankAPP");
      RootReferenceModule.factory("rootRef", function(){
                  return firebase.database().ref();
      });
}());
