$.Class.extend("Setting", {
    // constructor function
    init: function(cap, id, type, value, min, max){
        this.cap = cap;
        this.id = id;
        this.type = type;
        this.value = value;
        this.div = this.cap.deviceId + "_" + this.cap.id + "_" + this.id;
        this.divId = "#" + this.div;
        this.min = min;
        this.max = max;
    },

    sanitise: function(v) {
        v = Math.max(this.min, v);
        v = Math.min(v, this.max);
        return v;
    },

    set: function(v) {
        v = this.sanitise(v);
        this.value = v;
    },

    updateDisplay: function () {
        $(this.divId).val(this.value);
    },

    displayString: function () {
        return "<input type='range' class='changeableSetting' name='slider' id='"+this.div+"' data-capability-id='"+this.cap.id+"' data-device-id = '"+this.cap.deviceId+"' data-id='"+this.id+"' value='"+this.value+"' min='"+this.min+"' max='"+this.max+"'";
    },

    getValue: function () {
        return $(this.divId).val();
    }
});