Setting.extend("Colour",{

    init: function(deviceId, capId, id, name, value, min, max, serverUrl){
        this._super(deviceId, capId, id, name, value, min, max, serverUrl);
    },

    /* Colour is a colour wheel (with text input), not a slider. */
    displayString: function() {
        return "<div class='changeableSetting colour-wheel' name='colour-wheel' id='" + this.div + "' data-capability-id='" + this.capId + "' data-device-id='" + this.deviceId + "' data-id='" + this.id + "'></div><div><input type='text' class='input-mini colour-input' id='"+this.div+"_input' value='#"+ this.value +"'></div>" ;
    },

    /* Update the colour wheel to display the new colour */
    updateDisplay: function() {
        var colour="#"+this.value;
        this.cw.color(colour);
    },

    /* Get the user updated value from the colourwheel object */
    getChangedValue: function() {
        var colour = this.cw.color();
        return colour.hex;
    }

});
