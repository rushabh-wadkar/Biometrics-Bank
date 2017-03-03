(function(){

      var loginModule = angular.module("SecureBankAPP");
      loginModule.component("loginComponent", {
            templateUrl: "app/views/security/login/login.html",
            controllerAs: "model",
            controller: function($location, DbReference, $firebaseArray, $firebaseObject, $http, ToastNotify){
                  var model = this;

                  model.$onInit = function(){
                        console.log("Application loaded successfully");
                  };

                  model.redirectTo = function(strng){
                              if(strng === "register"){
                                    $location.path("/security/register");
                              } else if(strng === "login"){
                                    model.loginModal = $('[data-remodal-id=loginModal]').remodal({
                                          hashTracking:false,
                                          closeOnConfirm:true,
                                          closeOnCancel:false,
                                          closeOnEscape:false,
                                          closeOnOutsideClick: false
                                    });
                                    model.loginModal.open();
                              }
                  };
                  model.sendOTP = function(username, number){
                        $http.get("lib/OTP/sendsms.php?uid=7588819387&pwd=sagar16&phone="+number+"&msg=Hello "+username+",%20your%20OTP%20for%20the%20secure-bank%20gateway%20is%20"+model.otp+".%20This%20OTP%20is%20valid%20only%20for%205%20mins.").then(function(response){
                                    console.log(response);
                        });
                  };

                  model.scan = function(){
                        $("#confirmCircular").css({display: 'block'});
                        var fpData = Capture();
                        if(fpData){
                              fp = fpData.IsoTemplate;

                              model.otp = Math.floor(Math.random() * 10000000);
                              if(model.otp.length < 6)
                              {
                                    for(var i=0;i<6-model.otp.length;i++)
                                          model.otp += Math.floor(Math.random() * 8) + 1;
                              }else if(model.otp.length>6){
                                    model.otp.substring(0,6);
                              }

                              var getFingerPrints = $firebaseArray(DbReference.saveFP());
                              getFingerPrints.$loaded().then(function(res){
                                    var flag = false;
                                    for(var i=0;i<res.length;i++){
                                          if(Verify(res[i].fingerprint, fp)){
                                                userKey = res[i].user;
                                                flag = true;
                                                break;
                                          }
                                    }
                                    if(!flag){
                                          alert("Sorry user not found! Consider registering if not registered");
                                          $("#confirmCircular").css({display: 'none'});
                                    }else if(flag){
                                          // now if user is found
                                          var getUser = $firebaseObject(DbReference.getUser(userKey));
                                          getUser.$loaded().then(function(user){
                                                $("#confirmCircular").css({display: 'none'});
                                                $(".fingerprintDiv").css({visibility:'hidden', display: 'none'});
                                                $(".verifyPhoneDiv").css({display: 'block'});

                                                model.sendOTP(user.firstName, user.contact);
                                                console.log(model.otp);
                                          });
                                    }
                              });
                        }
                        else{
                              alert('Error scanning fingerprint');
                        }
                  };

                  model.verifyOTP = function(input){
                        if(input==model.otp){
                              $(".verifyPhoneDiv").css({display: 'none'});
                              model.loginModal.close();
                              $location.path("/account/dashboard");
                              ToastNotify.showToast("Welcome back user! :)");
                        }else{
                              model.showHints = true;
                        }
                  };
            }
      })

}());
