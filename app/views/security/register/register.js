(function(){

      var registerModule = angular.module("SecureBankAPP");
      registerModule.component("registerComponent", {
            templateUrl: "./app/views/security/register/register.html",
            controllerAs: "model",
            controller: function($http, ToastNotify, $location){
                  var model = this;
                  model.$onInit = function(){
                              model.doneStatus = false;
                  };

                  model.confirmReg = function(){

                        var options = {
                              hashTracking:false,
                              closeOnConfirm:true,
                              closeOnCancel:false,
                              closeOnEscape:false,
                              closeOnOutsideClick: false
                        };
                        model.regModal = $('[data-remodal-id=RegisterConfirmModal]').remodal(options);
                        model.regModal.open();
                  };
                  model.scan = function(){
                        var fpData = Capture();
                        if(fpData){
                              var fp = fpData.IsoTemplate;
                              $(".fingerprintDiv").css({visibility:'hidden', display: 'none'})
                              $(".verifyPhoneDiv").css({display: 'block'});

                              model.otp = Math.floor(Math.random() * 10000000);
                              if(model.otp.length < 6)
                              {
                                    for(var i=0;i<6-model.otp.length;i++)
                                          model.otp += Math.floor(Math.random() * 8) + 1;
                              }else if(model.otp.length>6){
                                    model.otp.substring(0,6);
                              }
                              model.sendOTP();
                        }
                        else{
                              alert('Error scanning fingerprint');
                        }
                  };
                  model.verifyOTP = function(input){
                        if(input==model.user.otp){
                              $(".verifyPhoneDiv").css({display: 'none'});
                              $(".finishedAccDiv").css({display: 'block'});
                              model.doneStatus = true;
                        }else{
                              model.showHints = true;
                        }
                  };
                  model.sendOTP = function(){
                        $http.get("lib/OTP/sendsms.php?uid=7588819387&pwd=sagar16&phone="+model.user.contactNumber+"&msg=Hello "+model.user.firstName+",%20your%20OTP%20for%20the%20secure-bank%20gateway%20is%20"+model.otp+".%20This%20OTP%20is%20valid%20only%20for%205%20mins.").then(function(response){
                                    console.log(response);
                        });
                  };

                  model.success = function(){
                              $http.get("lib/OTP/sendsms.php?uid=7588819387&pwd=sagar16&phone="+model.user.contactNumber+"&msg=Thank%20You%20,%20Account%20Successfully%20Created.%20Happy%20Secure%20Banking.").then(function(response){
                                          if(response.data == "true"){
                                                model.regModal.close();
                                                document.getElementById("regForm").reset();
                                                $location.path("/login");
                                                ToastNotify.showToast("Account created successfully! :)");
                                          }
                              });

                  };
            }
      });
}());
