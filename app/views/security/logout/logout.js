(function(){

      var LogoutModule = angular.module("SecureBankAPP");

      LogoutModule.component("logout", {
            controller: function(auth, $timeout, $location, $firebaseArray, DbReference, ToastNotify){
                  var user = auth.$getAuth();

                  var addLogs = $firebaseArray(DbReference.logs(user.uid));
                  addLogs.$add({
                        log: "Logged out",
                        timestamp: Date.now()
                  }).then(function(res){
                        auth.$signOut();

      			$timeout(function(){
      				$location.path("/security/login");
                              ToastNotify.showToast("Logged out successfully");
      			}, 500);
                  });

		}
      });

}());
