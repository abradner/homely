// Dictionary for storing deviceIds/devices
var settings = {};

/* Creates a new device from the JSON, complete with capabilities and settings */
addSetting = function (setting, serverUrl, roomId, deviceId, capType) {
    var settingId = setting["id"];
    var type = setting["name"];
    // The only hard coding of setting names - different setting types have different functions
    switch (type) {
        case 'Power':
            settings[settingId] = new Power(setting, serverUrl, roomId, deviceId, capType);
            break;
        case 'Colour':
            settings[settingId] = new Colour(setting, serverUrl, roomId, deviceId, capType);
            break;
        default:
            settings[settingId] = new Setting(setting, serverUrl, roomId, deviceId, capType);
    }
}