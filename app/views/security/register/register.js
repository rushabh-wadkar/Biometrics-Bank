(function(){

      var registerModule = angular.module("SecureBankAPP");
      registerModule.component("registerComponent", {
            templateUrl: "./app/views/security/register/register.html",
            controllerAs: "model",
            controller: function(){
                  var model = this;
                  model.$onInit = function(){
                              model.loadingFingerPrint = false;
                  };

                  model.confirmReg = function(){
                        var options = {
                              hashTracking:false,
                              closeOnConfirm:true,
                              closeOnCancel:false,
                              closeOnEscape:false,
                              closeOnOutsideClick: false
                        };
                        var inst = $('[data-remodal-id=RegisterConfirmModal]').remodal(options);
                        inst.open();
                  };
                  model.scan = function(){
                        model.loadingFingerPrint = true;
                  };
            }
      });
}());
