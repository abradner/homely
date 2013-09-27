var lightStatus = 0;

$(document).ready(
   function() {

    $('#lightsOnOff').click(function () {
      lightStatus ^= 1;
      if (lightStatus == 0) {
        $(this).removeClass("btn-success").addClass("btn-inverse");
      } else {
        $(this).removeClass("btn-inverse").addClass("btn-success");
      }
    });

   }
);
