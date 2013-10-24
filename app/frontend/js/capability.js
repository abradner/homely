/* Capability Object - stores the settings */
$.Class.extend("Capability", {
    // constructor function
    init : function(id, deviceId, type, name){
        this.id = id;
        this.deviceId = deviceId;
        this.type = type;
        this.name = name;
        this.settings = {};
    },

    /* Creates a setting based on the json/dict and stores it in the capability's setting dict */
    makeSetting: function(settingInfo, serverUrl) {
        var type = settingInfo['name'];
        var id = settingInfo['id'];
        var value = settingInfo['value'];
        var min = settingInfo['min'];
        var max = settingInfo['max'];
        var setting;
        // The only hard coding of setting names - different setting types have different functions
        switch (type) {
            case 'Power':
                setting = new Power(this.deviceId, this.id, id, type, value, min, max, serverUrl);
                break;
            case 'Colour':
                setting = new Colour(this.deviceId, this.id, id, type, value, min, max, serverUrl);
                break;
            default:
                setting = new Setting(this.deviceId, this.id, id, type, value, min, max, serverUrl);
        }
        this.settings[settingInfo['id']] = setting;
    },

    /* Updates the visual display of each setting
    Usually only used on first set up to sync with the server. */
    updateDisplays: function () {
        $.each(this.settings, function(id, object) {
            object.updateDisplay();
        });
    },

});