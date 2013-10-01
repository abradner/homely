var Light = function(id) {
    this.id = id;
    this.power = 0;
    this.brightness = 0;
    this.color = 0;
}

$.extend(Light.prototype, {
    togglePower: function() {
        this.power ^= 1;
        this.updatePowerDisplay();
    },
    setPower: function(v) {
        // Sanitise power to be 0 or 1
        v = Math.max(0,v);
        v = Math.min(1,v);
        this.power = v;
        this.updatePowerDisplay();
    },
    updatePowerDisplay: function () {
        if (this.power == 0) {
            //alert('#'+this.id+'_Power');
            $('#'+this.id+'_Power').removeClass('btn-success').addClass('btn-inverse');
        } else {
            $('#'+this.id+'_Power').removeClass('btn-inverse').addClass('btn-success');
        }
    },
    setBrightness: function (v) {
        // Sanitise brightness to be 0-9
        v = Math.max(0, v);
        v = Math.min(v, 9);
        this.brightness = v;
        // update brightness thing
    }, setColour: function (v) {
        // Sanitise color to be 0-255
        v = Math.max(0, v);
        v = Math.min(v, 255);
        this.color = v;
    }
});

var kitchenLight = new Light('kitchenLight');
var livingRoomLight = new Light('livingRoomLight');


$(document).ready( function() {

    $(document).on('touchstart',function(event) {
        event.preventDefault();
    },false);

    $(document).on('touchmove', function(event) {
        event.preventDefault();
    },false);


    // If on a mobile remove the click - e.g. have a var that represents the string 'click touchend'
    $('.changeableSetting').on('touchend', function (event) {
        //alert (event.screenX);
        var id = $(this).attr('id');
        deviceType = $(this).data('device_type');
        deviceID = $(this).data('device_id');
        settingType = $(this).data('setting_type');

        if (settingType == 'Power') {
            window[deviceID].togglePower();
        } else {
            var value = $('#'+id).val();
            eval('window[deviceID].set'+settingType+'('+value+');');
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