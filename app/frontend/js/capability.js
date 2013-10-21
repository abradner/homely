$.Class.extend("Capability", {
    // constructor function
    init : function(id, deviceId, type, name){
        this.id = id;
        this.deviceId = deviceId;
        this.type = type;
        this.name = name;
        this.settings = {};
    },

    makeSetting: function(settingInfo, serverUrl) {
        var type = settingInfo['name'];
        var id = settingInfo['id'];
        var value = settingInfo['value'];
        var min = settingInfo['min'];
        var max = settingInfo['max'];
        var setting;
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

    stringDisplays: function () {
        var str = '';
        $.each(this.settings, function(id, object) {
            str = str + object.displayString() + '<br/>';
        });
        return str;
    },

    updateDisplays: function () {
        $.each(this.settings, function(id, object) {
            object.updateDisplay();
        });
    },

});