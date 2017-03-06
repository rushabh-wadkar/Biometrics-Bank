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
                              },
                              logs: function(uid){
                                    return rootRef.child("logs").child(uid);
                              },
                              getAccounts: function(uid){
                                    return rootRef.child("accounts").child(uid);
                              },
                              getAccount: function(uid, key){
                                    return rootRef.child("accounts").child(uid).child(key);
                              }
                  };
      });
}());
