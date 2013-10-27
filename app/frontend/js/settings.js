// Dictionary for storing deviceIds/devices
var settings = {};

/* Creates a new device from the JSON, complete with capabilities and settings */
addSetting = function (setting, serverUrl) {
    var settingId = setting["id"];
    if (!(settingId in settings)) {
        var type = setting["name"];
        // The only hard coding of setting names - different setting types have different functions
        switch (type) {
            case 'Power':
                settings[settingId] = new Power(setting);
                break;
            case 'Colour':
                settings[settingId] = new Colour(setting);
                break;
            default:
                settings[settingId] = new Setting(setting);
        }
    }
}