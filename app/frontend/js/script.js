/* General Script File*/
var onMobile = false;

$(document).ready(function() {
    // If Android exists then we're on the mobile app, in which case we use touch
    if (window.Android) {
        onMobile = true;
    // If it doesn't then we set up a mock android (to remove errors if its called)
    } else {
        window.Android = new MockAndroid();
    }

    // Server URL
    $('#appsettings').append(newServerURLField())
    var server = Android.getServerUrl();

    var serverUrl = 'http://'+ server + ':3000';
    var fayeUrl = 'http://'+ server + ':9292/faye';

    initialiseData(serverUrl);
    startFaye(fayeUrl);
});

/* Callback for when settings are changed. Updates the server and the display appropriately. */
var handleSettingUpdate = function (event) {
    var id = $(this).attr('id');
    capabilityId = $(this).data('capability-id');
    deviceId = $(this).data('device-id');
    id = $(this).data('id');
    cap = devices[deviceId].capabilities[capabilityId];
    var value = cap.settings[id].getChangedValue();
    cap.settings[id].updateToServer(id, value);
}

/* Adding content to the page with server JSON and a template
Also creates the device objects for our use*/
var initialiseData = function(serverUrl) {
    //Get the Template and compile it
    var source   = $("#appTemplate").html();
    var template = Handlebars.compile(source);
    // JSON object describing the devices we have access to
    $.getJSON(serverUrl+'/devices.json', function(data) {
        var html    = template(data);
        //Replace the body section with the new code.
        document.body.innerHTML = html;
        // Make devices for each one - updates the page to correct values
        $.each(data, function (val) {
            addDevice(data[val], serverUrl);
/* Charissa's Colour Wheel Stuff ... */
            var dataId = data[val]["id"];
            $('#devices').append(devices[dataId].stringDisplay());//newDeviceBox(devices[dataId]));
            //For each device we find its settings and if they are a colour setting, create the colourwheel
            $.each(devices[dataId].capabilities, function (cap) {
                var capabilityId = devices[dataId].capabilities[cap]["id"];
                $.each(devices[dataId].capabilities[capabilityId].settings, function(set) {
                    var settingId = devices[dataId].capabilities[capabilityId].settings[set].id;
                    if (devices[dataId].capabilities[capabilityId].settings[settingId].name == "Colour") {
                        var div = devices[dataId].capabilities[capabilityId].settings[settingId].divId;
                        var cw = Raphael.colorwheel($(div)[0], 75);
                        cw.input($(div + "_input")[0]);
                        devices[dataId].capabilities[capabilityId].settings[settingId].cw = cw;
                        // On change update the server
                        cw.onchange(function(colour)
                            {
                                var div = cw.parent();
                                var id = div.attr('id');
                                var capabilityId = div.data('capability-id');
                                var deviceId = div.data('device-id');
                                id = div.data('id');
                                var cap = devices[deviceId].capabilities[capabilityId];
                                var value = cap.settings[id].getChangedValue();
                                cap.settings[id].updateToServer(id, value);

                            });
                    }
                });
            });
            /* End Charissa's Colour Wheel Stuff ...(I think) */
        });
        // Enable callbacks for devices - must be done here because classes don't exist on page load
        if (onMobile) {
            $('#devices').on('touchend', '.changeableSetting', handleSettingUpdate);
        } else {
            $('#devices').on('click change', '.changeableSetting', handleSettingUpdate);
        }
    });

}

/* Receives broadcasts from the server each time it updates */
var startFaye = function(fayeUrl) {
    var client = new Faye.Client(fayeUrl);
    var subscription = client.subscribe('/connect', function(message) {
        message = $.parseJSON(message);
        var deviceId = message["device"];
        var capabilityId = message["capability"];
        var settingId = message["setting"];
        var value = message["value"]
        devices[deviceId].capabilities[capabilityId].settings[settingId].updateFromServer(value);
    });
}

/* A set of templating helpers for printing out the correct setting type */
Handlebars.registerHelper("isPower", function(settingName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return settingName == 'Power' ? fnTrue() : fnFalse();
});
Handlebars.registerHelper("isColour", function(settingName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return settingName == 'Colour' ? fnTrue() : fnFalse();
});
