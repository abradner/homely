/* Power is a specific type of setting; it has additional functions and some slight modifications */
Setting.extend("Power",{

    /* Power is a button, not a slider */
    displayString: function () {
        // Class toggles depending on the value
        if (this.value == 0) {
            var btnStatus = "inverse";
            var homelyStatus = "off";
        } else {
            var btnStatus = "success";
            var homelyStatus = "on";
        }
        return "<button type='button' class='btn btn-"+btnStatus+" homely-btn changeableSetting homely-"+homelyStatus+"' id='"+this.div+"' data-device-id = '" + this.deviceId +"' data-capability-id='" + this.capId +"'data-id='"+this.id+"' data-toggle='button'></button>";

    },

    /* Buttons have no implicit value, so the toggle is done based on our stored value */
    updateDisplay: function () {
        if (this.value == 0) {
            $(this.divId).removeClass('btn-success homely-on').addClass('btn-inverse homely-off');
        } else {
            $(this.divId).removeClass('btn-inverse homely-off').addClass('btn-success homely-on');
        }
    },

    /* Simple function to toggle the value with a xor */
    togglePower: function() {
        this.value ^= 1;
    },

    /* This function is used for detecting the change from a user.
    As buttons have no implicit value, the changedValue is just the toggle of the saved value */
    getChangedValue: function () {
        return this.value ^ 1;
    }

});

