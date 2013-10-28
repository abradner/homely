/* Extends the setting class for colour changing */
Setting.extend("Colour",{

    init: function(data, serverUrl, roomId, deviceId, capType){
        this._super(data, serverUrl, roomId, deviceId, capType);

        this.cw = Raphael.colorwheel($(this.divId)[0], 200);
        this.cw.input($(this.divId + "_input")[0]);

        // TODO: Fix the context
        var self = this;
        // On change update the server
        this.cw.onchange(function(colour) {
            var value = self.getChangedValue();
            value = self.sanitise(value);
            self.updateToServer(value);
        });
    },

    /* Removes the '#' on any colour code */
    sanitise: function(v) {
        var valid_hex = /(^#?[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(v);
        if (!valid_hex) {
            v = "000";
        }
        return v.replace('#', '')
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
    },

    /* Override updateToServer so display is not updated on done */
    updateToServer: function (newValue) {
        var success = true;
        var serverRespons = $.ajax({
            type: 'GET',
            url: this.url,
            data: {
                'value': newValue,
                'id': uuid
            },
            timeout: 600000, // sets timeout to 1 second
        })
        .fail($.proxy(function(data, textStatus, jqXHR) {
            //get rid of alert
            alert(textStatus + ":"+ jqXHR.errorThrown);
            Android.serverError(this.deviceId, this.name);
            this.updateDisplay();
        }, this))
        .done($.proxy(function(){
            this.set(newValue);
        }, this));
    }
});
