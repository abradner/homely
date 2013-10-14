var devices = {};

addDevice = function (device_id, capabilities) {
    $.each(capabilities, function(i) {
        var cap = capabilities[i];
        var deviceId = cap["device_id"];
        var capId = cap["id"];
        var capType = cap["capability_type"];
        var capName = cap["name"];
        var url = "http://localhost:3000";

        // Add the capability into the devices hash
        if (!(deviceId in devices)) {
            devices[deviceId] = {};
        }
        devices[deviceId][capId] = new Capability(capId, deviceId, capType, capName, url);
        // Create the setting objects for the capability, and them to its settings hash
        $.each(cap["setting"], function (i) {
            devices[deviceId][capId].makeSetting(cap["setting"][i]);
        });

    });

}