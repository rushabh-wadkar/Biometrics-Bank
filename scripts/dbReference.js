(function(){

      var DbReferenceModule = angular.module("SecureBankAPP");
      DbReferenceModule.factory("DbReference", function(rootRef){
                  return {
                              saveUsers: function(){
                                    return rootRef.child("users");
                              },
                              saveFP: function(){
                                    return rootRef.child("fingerprints");
                              },
                              getUser: function(key){
                                    return rootRef.child("users").child(key);
                              }
                  };
      });
}());
