var onMobile = false;
var serverUrl = 'http://192.168.0.3:3000';

/* FUNCTIONS */
var handleSettingUpdate = function (event) {
    var id = $(this).attr('id');
    capabilityId = $(this).data('capability-id');
    deviceId = $(this).data('device-id');
    id = $(this).data('id');
    cap = devices[deviceId].capabilities[capabilityId];
    var value = cap.settings[id].getChangedValue();
    cap.settings[id].updateToServer(id, value);
}

var dataStore;

$(document).ready(function() {

    $('#appsettings').append(newServerURLField())
    serverUrl = getServerUrl()

    // This goes in the client.subscribe() function
    // We get the json as a message on first connecting
    $.getJSON(serverUrl+'/devices.json', function(data) {
        $.each(data, function (val) {
            addDevice(data[val], serverUrl);
            var dataId = data[val]["id"];
            $('#devices').append(newDeviceBox(devices[dataId]));
        });
    });

    var client = new Faye.Client('http://192.168.0.3:9292/faye');
    var subscription = client.subscribe('/connect', function(message) {
        message = $.parseJSON(message);
        var deviceId = message["device"];
        var capabilityId = message["capability"];
        var settingId = message["setting"];
        var value = message["value"]
        devices[deviceId].capabilities[capabilityId].settings[settingId].updateFromServer(value);
    });

    if (window.Android) {
        onMobile = true;
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
