var stripPhone=function(phoneString){
    var toReturn='';
    for(var i=0;i<phoneString.length;i++){
        if(phoneString[i].match(/\d/)){
            toReturn+=(phoneString[i]);
        }
    }
    return toReturn;
} //TODO: remove REPEAT CODE

var INTEGER_REGEXP = /^[0-9]{10,11}$/;

app.directive('phoneValidation', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.numlength = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }
        console.log(stripPhone(viewValue));
        console.log(INTEGER_REGEXP.test(stripPhone(viewValue)))
        if (INTEGER_REGEXP.test(stripPhone(viewValue))) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});