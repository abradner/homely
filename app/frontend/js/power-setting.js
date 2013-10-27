/* Power is a specific type of setting; it has additional functions and some slight modifications */
Setting.extend("Power",{

    init: function(data, serverUrl){
        this._super(data, serverUrl);

        this.setDisplay();
    },

    /* Sets the initial class state of the power button - the template doesn't handle this */
    setDisplay: function () {
        if (this.value == 0) {
            var btnStatus = "btn-inverse";
            var homelyStatus = "homely-off";
        } else {
            var btnStatus = "btn-success";
            var homelyStatus = "homely-on";
        }
        $(this.divId).addClass(btnStatus + " " + homelyStatus);
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

