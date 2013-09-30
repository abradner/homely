var kitchenLightPowerStatus = 0;
var livingRoomLightPowerStatus = 0;

$(document).ready(
   function() {

    $('.changeableSetting').on('click touchend', function () {
      var id = $(this).attr("id");
      //alert(id);
      var status = id + "Status";
      //alert(status);
      window[status] ^= 1;
      if (window[status] == 0) {
        $("#"+id).removeClass("btn-success").addClass("btn-inverse");
      } else {
        $("#"+id).removeClass("btn-inverse").addClass("btn-success");
      }
    });

   }
);


/*
We have classes for each device type

e.g. Light contains a power button, brightness level and colour

Each device is tied to a div containing it - e.g. <div id="livingRoomLight">

Information from server - json.
- ID name of device
- device type
- device status (for each of the settings, colour/brightness/etc)

Every device we get we add a div in of its type with id ID
Every button/setting will be IDbuttonName and class <type, button> (e.g. id="livingRoomLightPower", class="light power")
And all variables will be like nameStatus, e.g. powerStatus
so when you click something it finds the object it belongs to and edits the nameStatus

So each settingType (e.g. power) has a function which takes in an object and modifies that generically.

What I want:



*/