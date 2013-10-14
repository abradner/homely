var onMobile = false;

/* FUNCTIONS */
var handleSettingUpdate = function (event) {
    var id = $(this).attr('id');
    capabilityId = $(this).data('capability-id');
    deviceId = $(this).data('device-id');
    id = $(this).data('id');
    cap = devices[deviceId][capabilityId];
    var value = cap.settings[id].getValue();

    // Pass in a callback function to updateServer - if it's successful, we'll update our values
    cap.updateToServer(cap.updateFromServer, id, value);
}


$(document).ready(function() {

    // This goes in the client.subscribe() function
    // We get the json as a message on first connecting
    $.getJSON('http://localhost:3000/devices.json', function(data) {
        $.each(data, function (val) {
            var id = data[val]["id"];
            var capabilities = data[val]["capabilities"];
            addDevice(id, capabilities);
            $('#devices').append(newDeviceBox(data[val]));
        });
    });

    //var client = new Faye.Client('http://localhost:3001');
    //var subscription = client.subscribe('/connect', function(message) {
    //    alert(message);
        /*var deviceID = message["device_id"];
        var capabilityID = message["name"];
        var state = message["state"];
        devices[deviceID][capabilityID].updateFromServer(state);*/
    //});

    if (window.Android) {
        onMobile = true;
        $(document).on('touchstart',function(event) {
            event.preventDefault();
        },false);
        $(document).on('touchmove', function(event) {
            event.preventDefault();
        },false);
        // Necessary for dynamically loaded content - can't just attach it to the class
        $('#devices').on('touchend', '.changeableSetting', handleSettingUpdate);
    } else {
        window.Android = new MockAndroid();
        $('#devices').on('click change', '.changeableSetting', handleSettingUpdate);
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
