var Light = function(id) {
    this.device_id = "";
    this.capability_id = "";
    this.id = id;
    this.power = 0;
    this.brightness = 0;
    this.colour = 0;
}

$.extend(Light.prototype, {
    togglePower: function() {
        this.power ^= 1;
        this.updatePowerDisplay();
    },

    /* Set the class variables upon updates from input or server */
    setPower: function(v) {
        // Sanitise power to be 0 or 1
        v = Math.max(0,v);
        v = Math.min(1,v);
        this.power = v;
        this.updatePowerDisplay();
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
        // TODO: Remove this - UpdateServer is called in the handleSettingUpdate
        $.post("localhost:3000/pages/colour", {colour: this.colour});
    },

    /* Update the visual display upon updates from input or server */
    updatePowerDisplay: function () {
        if (this.power == 0) {
            $('#'+this.id+'_Power').removeClass('btn-success homely-on').addClass('btn-inverse homely-off');
            // TODO: remove the get requests from here and UpdateServer() in the setPower function
            $.get("localhost:3000/pages/off");
        } else {
            $('#'+this.id+'_Power').removeClass('btn-inverse homely-off').addClass('btn-success homely-on');
            $.get("localhost:3000/pages/white");
        }
    },
    updateBrightnessDisplay: function () {
        $('#'+this.id+'_Brightness').val(this.brightness);
    },
    updateColourDisplay: function () {
        $('#'+this.id+'_Colour').val(this.colour);
    },

    /* Send the new state to the server */
    updateToServer: function () {
        var state = "" + this.power + "," + this.brightness + "," + this.colour;
        $.post("localhost:3000/pages/"+this.device_id+"/"+this.capability_id+"/update", {state : state});
    },

    /* Update each setting after we receive an update from the server */
    updateFromServer: function (state) {
        var states = state.split(",");
        if (this.power != states[0]) {
            setPower(states[0]);
        }
        if (this.brightness != states[1]) {
            setBrightness(states[1]);
            updateBrightnessDisplay();
        }
        if (this.colour != states[2]) {
            setColour(states[2]);
            updateColourDisplay();
        }
    }
});