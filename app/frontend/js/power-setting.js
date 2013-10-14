Setting.extend("Power",{

    displayString: function () {
        if (this.value == 0) {
            var btnStatus = "inverse";
            var homelyStatus = "off";
        } else {
            var btnStatus = "success";
            var homelyStatus = "on";
        }
        return "<button type='button' class='btn btn-"+btnStatus+" homely-btn changeableSetting homely-"+homelyStatus+"' id='"+this.cap.deviceId+"_"+this.cap.id+"_"+this.id+"' data-device-id = '" + this.cap.deviceId +"' data-capability-id='" + this.cap.id +"'data-id='"+this.id+"' data-toggle='button'></button>";

    },

    updateDisplay: function () {
        if (this.value == 0) {
            $(this.divId).removeClass('btn-success homely-on').addClass('btn-inverse homely-off');
        } else {
            $(this.divId).removeClass('btn-inverse homely-off').addClass('btn-success homely-on');
        }
    },

    togglePower: function() {
        this.value ^= 1;
    },

    getValue: function () {
        return this.value ^ 1;
    }

});

