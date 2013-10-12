var onMobile = false;

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
        eval('window[deviceID].updateServer()');
    }
}

$(document).ready(function() {

    if (typeof Android  != 'undefined') {
        onMobile = true;
    }

    var client = new Faye.Client('http://localhost:3001');
    var subscription = client.subscribe('/connect', function(message) {
        alert(message);
        /*var deviceID = message["device_id"];
        var capabilityID = message["name"];
        var state = message["state"];
        devices[deviceID][capabilityID].updateFromServer(state);*/
    });

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
