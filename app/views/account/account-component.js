(function(){

      var AccountModule = angular.module("SecureBankAPP");

      AccountModule.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('red');
      });

      AccountModule.component("accountComponent", {
            templateUrl: "./app/views/account/account-component.html",
            controllerAs: "model",
            bindings: {
                        userAuth: "=",
                        user: "=getUser",
                        accounts: "=",
                        logs: "="
            },
            controller: function($mdSidenav, auth, DbReference, $mdDialog, $firebaseArray, ToastNotify){
                  var model = this;
                  model.bankImage = './assets/svg/money.svg';
                  model.$onInit = function(){
                        console.log("Dashboard loaded successfully");
                        if(model.user.gender==="Male"){
                              model.avatar = './assets/svg/boy.svg';
                        }else if(model.user.gender==="Female"){
                              model.avatar = './assets/svg/girl.svg';
                        }
                  };

                  model.toggleSideNav = function(){
                        $mdSidenav('left').toggle();
                  };

                  model.selectAccount = function(acc){
                        var sideNav = $mdSidenav('left');
                        if(sideNav.isOpen()){
                              sideNav.close();
                        }
                  };

                  model.showConfirm = function(ev) {
                     // Appending dialog to document.body to cover sidenav in docs app
                     var confirm = $mdDialog.confirm()
                           .title('Confirm?')
                           .textContent('Add Account to your Profile?')
                           .ariaLabel('Add Account')
                           .targetEvent(ev)
                           .ok('Add')
                           .cancel('No! No! Wait.');

                     $mdDialog.show(confirm).then(function() {
                           model.addAccount();
                     }, function() {
                           document.getElementById("accountForm").reset();
                     });
                   };


                  model.addAccount = function(){
                              var uidRef = auth.$getAuth();
                              var addRef = $firebaseArray(DbReference.getAccounts(uidRef.uid));
                              addRef.$add({
                                          number: model.account.acc_no,
                                          iFSC: model.account.acc_ifsc,
                                          mICR: model.account.acc_micr,
                                          accountName: model.account.name,
                                          type: model.account.type,
                                          subtype: model.account.subtype,
                                          pin: model.account.acc_pin,
                                          balance: model.account.balance,
                                          bank: model.account.bankname
                              }).then(function(){

                                    var addLogs = $firebaseArray(DbReference.logs(model.userAuth.uid));
                                    addLogs.$add({
                                          log: "Added Bank Account : " + model.account.bankname + " with Account Number : " + model.account.acc_no,
                                          timestamp: Date.now()
                                    }).then(function(res){
                                          document.getElementById("accountForm").reset();
                                          ToastNotify.showToast("Account Added Successfully!");
                                    });
                              });
                  };

                  model.removeAccount = function(acc){
                        var bankName = acc.bank;
                        var accNumber = acc.number;
                              model.accounts.$remove(acc).then(function(res){
                                    var addLogs = $firebaseArray(DbReference.logs(model.userAuth.uid));
                                    addLogs.$add({
                                          log: "Removed Bank Account : " + bankName + " with Account Number : " + accNumber,
                                          timestamp: Date.now()
                                    }).then(function(res){
                                          ToastNotify.showToast("Account Removed Successfully!");
                                    });
                              });
                  };

                  model.clearLogs = function(ev){
                        // Appending dialog to document.body to cover sidenav in docs app
                        var confirm = $mdDialog.confirm()
                              .title('Confirm?')
                              .textContent('Do you want to clear all the logs?')
                              .ariaLabel('Clear Logs')
                              .targetEvent(ev)
                              .ok('Clear')
                              .cancel('No! No! Wait.');

                        $mdDialog.show(confirm).then(function() {
                              var uidRef = auth.$getAuth();
                              var logRef = DbReference.logs(uidRef.uid);
                              logRef.remove();

                              ToastNotify.showToast("Logs cleared!");
                        }, function() {

                        });

                  };

            }
      });

}());
