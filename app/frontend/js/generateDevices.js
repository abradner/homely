var newDeviceBox = function(data) {
    var id = data["id"];
    var name = data["name"];
    var deviceType = data["device_type"];
    var box = "<div class='container-fluid device'>\
                <h1>" + name + ", " + deviceType + "</h1>\
                <!-- Start Device Accordion !-->\
                <div class='accordion span6' id='device'" + id + ">";

    var capabilities = devices[id];
    $.each(capabilities, function (key, value) {
        box = box + newCapabilitiesBox(key, value);
    });

    box = box + "</div>\
                <!-- End Accordion Device 1 -->\
            </div>";
    return box;
}

var newCapabilitiesBox = function(id, cap) {
    var box = "\
    <!-- New Device Accordion -->\
        <div class='accordion-group'>\
            <div class='accordion-heading'>\
            <a class='accordion-toggle' data-toggle='collapse' data-parent='#device'"+id+"\ href='#capability"+id+"'>\
            <strong><span>"+cap.name+"</span></strong>\
                    -\
                    <em><span>"+cap.type+"</span></em>\
                </a>\
            </div>\
            <div id='capability"+id+"' class='accordion-body collapse'>\
                <div class='accordion-inner'>\
                    <!-- Start Capability Box -->\
                    <div class='modal-body'>\
                        <div class='span10 center'>";

    box = box + newStates(cap);

    box = box + "</div>\
                    </div>\
                    <!-- End Capability Box -->\
                </div>\
            </div>\
        </div>\
        <!-- End of one Capability Accordion -->";

    return box;
}

var newStates = function(capObject) {
    return capObject.stringDisplays();
}
