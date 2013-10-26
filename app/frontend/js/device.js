/* Device Object - Stores the capabilities */
$.Class.extend("Device", {
    // constructor function
    init : function(id, type, name){
        this.id = id;
        this.type = type;
        this.name = name;
        this.capabilities = {};
    },

    /* Creates a new capability and saves it in this.capabilities */
    makeCapability: function(capId, capType, capName) {
        this.capabilities[capId] = new Capability(capId, this.id, capType, capName);
    },

    /* Update the display of each setting */
    updateDisplays: function () {
        $.each(this.capabilities, function(id, object) {
            object.updateDisplays();
        });
    }

});