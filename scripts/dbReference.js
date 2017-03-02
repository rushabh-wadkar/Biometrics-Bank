(function(){

      var DbReferenceModule = angular.module("SecureBankAPP");
      DbReferenceModule.factory("DbReference", function(rootRef){
                  return {
                              saveData: function(){
                                    return rootRef.child("users");
                              }
                  };
      });
}());
