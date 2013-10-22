var newDeviceBox = function(device) {
    var box = "<div class='container-fluid device'>\
                <!-- Start Device Accordion !-->\
                <div class='accordion-heading'>\
                    <a class='accordion-toggle' data-toggle='collapse' data-parent='#devices'\ href='#device"+device.id+"'>\
                        <strong><span>"+device.name+"</span></strong>\
                        -\
                        <em><span>"+device.type+"</span></em>\
                    </a>\
                </div>\
                <div id='device"+device.id+"' class='accordion-body collapse'>\
                    <div class='accordion-inner' span10 offset1' id='device'" + device.id + ">";

    $.each(device.capabilities, function (key, value) {
        box = box + newCapabilitiesBox(key, value);
    });

    box = box + "   </div>\
                </div>\
                <!-- End Device Accordion -->\
            </div>";
    return box;
}

var newCapabilitiesBox = function(id, cap) {
    var box = "\
    <!-- New Capability Accordion -->\
        <div class='accordion-group'>\
            <div class='accordion-heading'>\
            <a class='accordion-toggle' data-toggle='collapse' data-parent='#device"+id+"'\ href='#capability"+cap.id+"'>\
            <strong><span>"+cap.name+"</span></strong>\
                    -\
                    <em><span>"+cap.type+"</span></em>\
                </a>\
            </div>\
            <div id='capability"+cap.id+"' class='accordion-body collapse'>\
                <div class='accordion-inner span10 offset1 center'>\
                    <!-- Start Capability Box -->";

    box = box + newStates(cap);

    box = box + "   <!-- End Capability Box -->\
                </div>\
            </div>\
        </div>\
        <!-- End Capability Accordion -->";

    return box;
}

var newStates = function(capObject) {
    return capObject.stringDisplays();
}
