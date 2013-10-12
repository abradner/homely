var Light = function(device_id, capability_type, capability_name, url) {
    this.device_id = device_id;
    this.capability_type = capability_type;
    this.capability_name = capability_name;
    this.power = 0;
    this.brightness = 0;
    this.colour = 0;
    this.server = url
}

$.extend(Light.prototype, {
    togglePower: function() {
        this.power ^= 1;
    },

    /* Set the class variables upon updates from input or server */
    setPower: function(v) {
        // Sanitise power to be 0 or 1
        v = Math.max(0,v);
        v = Math.min(1,v);
        this.power = v;
    },
    setBrightness: function (v) {
        // Sanitise brightness to be 0-9
        v = Math.max(0, v);
        v = Math.min(v, 9);
        this.brightness = v;
    },
    setColour: function (v) {
        v = Math.max(0, v);
        v = Math.min(v, 999);
        this.colour = v;
    },

    /* Update the visual display upon updates from input or server */
    updatePowerDisplay: function () {
        if (this.power == 0) {
            $('#'+this.capability_name+'_Power').removeClass('btn-success homely-on').addClass('btn-inverse homely-off');
        } else {
            $('#'+this.capability_name+'_Power').removeClass('btn-inverse homely-off').addClass('btn-success homely-on');
        }
    },
    updateBrightnessDisplay: function () {
        $('#'+this.capability_name+'_Brightness').val(this.brightness);
    },
    updateColourDisplay: function () {
        $('#'+this.capability_name+'_Colour').val(this.colour);
    },

    /* Send the new state to the server */
    updateToServer: function (f, settingChanged, newValue) {
        var self = this; //'this' gets changed with the .done and .fail, so create a copy
        var success = true;
        var url = this.server+'/pages/colour';
        //var url = 'localhost:3000/pages/'+this.device_id+'/'+this.capability_id+'/'+settingChanged+'/update';
        //var serverResponse = $.post(url, {value : value});
        var serverResponse = $.post(url, {colour : newValue});
        serverResponse.done(function () {
            Android.serverSuccess(self.device_id, self.capability_name);
            f(self, settingChanged, newValue);
        });
        serverResponse.fail(function (jqXHR, textStatus, errorThrown) {
            Android.serverError(self.device_id, self.capability_name);
            alert(textStatus +","+ errorThrown);
        });
    },

    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (self, setting, value) {
        eval('self.set'+setting+'('+value+');');
        eval('self.update'+setting+'Display();');
    }
});