$.Class.extend("Setting", {
    // constructor function
    init: function(cap, type, value, divId){
        this.cap = cap;
        this.type = type;
        this.value = value;
        this.divId = divId;
    },

    set: function(v) {
        this.value = v;
    },

    updateDisplay: function () {

    },

    displayString: function () {


    }
});