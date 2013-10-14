$.Class.extend("Capability", {
    // constructor function
    init : function(id, deviceId, type, name, url){
        this.id = id;
        this.deviceId = deviceId;
        this.type = type;
        this.name = name;
        this.server = url;
        this.settings = {};
    },

    makeSetting: function(settingInfo) {
        var type = settingInfo['type'];
        var id = settingInfo['id'];
        var value = settingInfo['value'];
        var min = settingInfo['min'];
        var max = settingInfo['max'];
        var setting;
        switch (type) {
            case 'Power':
                setting = new Power(this, id, type, value, min, max);
                break;
            case 'Colour':
                setting = new Colour(this, id, type, value, min, max);
                break;
            default:
                setting = new Setting(this, id, type, value, min, max);
        }
        this.settings[settingInfo['id']] = setting;
    },

    stringDisplays: function () {
        var str = "";
        $.each(this.settings, function(id, object) {
            str = str + object.displayString() + "<br/>";
        });
        return str;
    },

    updateDisplays: function () {
        $.each(this.settings, function(id, object) {
            object.updateDisplay();
        });
    },


    /* Send the new state to the server */
    updateToServer: function (f, settingId, newValue) {
        var success = true;
        var url = this.server+'/pages/colour';
        //var url = 'localhost:3000/pages/'+this.device_id+'/'+this.id+'/'+settingChanged+'/update';
        var serverResponse = $.ajax({
            type: 'POST',
            url: url,
            data: {
                'colour': newValue //'value': newValue
            },
            timeout: 1000 // sets timeout to 3 seconds
        })
        .fail($.proxy(function(data, textStatus, jqXHR){
            alert(textStatus +","+ errorThrown);
            Android.serverError(this.deviceId, this.name);
        }, this))
        .done($.proxy(function(){
            f.call(this, settingId, newValue);
            Android.serverSuccess(this.deviceId, this.name);
        }, this));

    },
    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (settingId, value) {
        this.settings[settingId].set(value);
        this.settings[settingId].updateDisplay();
    }
});