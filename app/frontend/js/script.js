/* CLASSES */
var Light = function(id) {
    this.id = id;
    this.power = 0;
    this.brightness = 0;
    this.colour = 0;
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
            $('#'+this.id+'_Power').removeClass('btn-success homely-on').addClass('btn-inverse homely-off');
            $.get("localhost:3000/pages/off");
        } else {
            $('#'+this.id+'_Power').removeClass('btn-inverse homely-off').addClass('btn-success homely-on');
            $.get("localhost:3000/pages/white");
        }
    },
    setBrightness: function (v) {
        // Sanitise brightness to be 0-9
        v = Math.max(0, v);
        v = Math.min(v, 9);
        this.brightness = v;
    }, setColour: function (v) {
        v = Math.max(0, v);
        v = Math.min(v, 999);
        this.colour = v;
        // TODO(beth): Insert an actual slider wheel
        $.post( "localhost:3000/pages/colour", {colour: this.colour} );
    }
});


/* FUNCTIONS */
var handleSettingUpdate = function (event) {
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
}

/* VARIABLES */
var onMobile = false;
var kitchenLight = new Light('kitchenLight');
var livingRoomLight = new Light('livingRoomLight');


$(document).ready(function() {

    if (typeof Android  != 'undefined') {
        onMobile = true;
    }

    if (onMobile) {
        $(document).on('touchstart',function(event) {
            event.preventDefault();
        },false);
        $(document).on('touchmove', function(event) {
            event.preventDefault();
        },false);
        $('.changeableSetting').on('touchend', handleSettingUpdate);
    } else {
        $('.changeableSetting').on('click change', handleSettingUpdate);
    }

});


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
