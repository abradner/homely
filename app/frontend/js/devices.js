// Dictionary for storing deviceIds/devices
var devices = {};

/* Creates a new device from the JSON, complete with capabilities and settings */
addDevice = function (device, serverUrl) {
    var deviceId = device["id"];
    if (!(deviceId in devices)) {
        devices[deviceId] = new Device(deviceId, device["device_type"], device["name"]);
    }

    var capabilities = device["capabilities"];

    $.each(capabilities, function(i) {
        var cap = capabilities[i];
        var capId = cap["id"];
        var capType = cap["capability_type"];
        var capName = cap["name"];

        // Add the capability into the devices hash
        devices[deviceId].makeCapability(capId, capType, capName);

        // Create the setting objects for the capability, and them to its settings hash
        $.each(cap["setting"], function (i) {
            devices[deviceId].capabilities[capId].makeSetting(cap["setting"][i], serverUrl);
        });

    });

}