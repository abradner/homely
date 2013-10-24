Setting.extend("Colour",{

    init: function(deviceId, capId, id, name, value, min, max, serverUrl){
        this._super(deviceId, capId, id, name, value, min, max, serverUrl);

        this.cw = Raphael.colorwheel($(this.divId)[0], 75);
        this.cw.input($(this.divId + "_input")[0]);

        // TODO: Fix the context
        var self = this;
        // On change update the server
        this.cw.onchange(function(colour) {
            var value = self.getChangedValue();
            value = value.replace('#', '');
            alert(value);
            self.updateToServer(value);
        });
    },

    sanitise: function(v) {
        return v.replace('#', ''); //TODO fix this to be better
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
