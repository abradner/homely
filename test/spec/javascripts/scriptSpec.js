var l = new Capability('1', '2',  'Light', 'id', 'http://localhost:3000');
var power = {'type':'Power', 'value':0, 'id':3, 'min':0, 'max':1};
var colour = {'type':'Colour', 'value':0, 'id':2, 'min':0, 'max':999};
l.makeSetting(power);
l.makeSetting(colour);
describe("Capability Initialisation", function() {
    it("Initialises the device ID correctly", function() {
        expect(l.deviceId).toBe('2');
    });

    it("Initialised the capability ID correctly", function() {
        expect(l.id).toBe('1');
    });

    it("Initialises the capability name correctly", function() {
        expect(l.name).toBe("id");
    });

    it("Initialises the capability type correctly", function() {
        expect(l.type).toBe("Light");
    });

    it("Initialises the url correctly", function() {
        expect(l.server).toBe("http://localhost:3000");
    });

    it("Initialises the power to 0", function() {
        expect(l.settings[3].value).toBe(0);
    });

    it("Initialises the colour to 0", function() {
        expect(l.settings[2].value).toBe(0);
    });

    it("Update from server function works", function() {
        l.updateFromServer(3, 1);
        expect(l.settings[3].value).toBe(1);
    });

    it("Updates power display correctly", function() {
        loadFixtures('button.html')
        expect($(l.settings[3].divId)).toHaveClass('btn-inverse');
        expect($(l.settings[3].divId)).toHaveClass('homely-off');
        expect($(l.settings[3].divId)).not.toHaveClass('btn-success');
        expect($(l.settings[3].divId)).not.toHaveClass('homely-on');
        //l.settings[3].set(1);
        l.settings[3].updateDisplay();
        expect($(l.settings[3].divId)).not.toHaveClass('btn-inverse');
        expect($(l.settings[3].divId)).not.toHaveClass('homely-off');
        expect($(l.settings[3].divId)).toHaveClass('btn-success');
        expect($(l.settings[3].divId)).toHaveClass('homely-on');

    });
    

    it("Sanitises settings correctly", function() {
        l.settings[3].set(5);
        expect(l.settings[3].value).toBe(1);
        l.settings[3].set(-2);
        expect(l.settings[3].value).toBe(0);
    });
    /*
    it("Get Value does things right", function() {
        $(l.settings[2].divId.val(54));
        expect($(l.settings[2].divId.val())).toBe(54);
    }); */

});

//Capability.js - todo stringDisplays, updateDisplays

/*
describe("Light Object Functions", function() {
    it("Toggles power correctly", function() {
        l.togglePower();
        expect(l.power).toBe(1);
        //l.togglePower();
        //expect(l.power).toBe(0);
    });

    it ("Sets power correctly", function() {
        l.setPower(1);
        expect(l.power).toBe(1);
    });

    it ("Bounds power correctly", function() {
        l.setPower(12);
        expect(l.power).toBe(1);
        l.setPower(-3);
        expect(l.power).toBe(0);
    });

    it ("Sets brightness correctly", function() {
        l.setBrightness(5);
        expect(l.brightness).toBe(5);
    });

    it ("Bounds brightness correctly", function() {
        l.setBrightness(12);
        expect(l.brightness).toBe(9);
        l.setBrightness(-3);
        expect(l.brightness).toBe(0);
    });

    it ("Sets colour correctly", function() {
        l.setColour(32);
        expect(l.colour).toBe(32);
    });
    
    it ("Bounds colour correctly", function() {
        l.setColour(10001);
        expect(l.colour).toBe(999);
        l.setColour(-36);
        expect(l.colour).toBe(0);
    });

});

var kitchenLight = new Light('1', 'Light', 'kitchenLight', 'http://192.168.0.3:3000');

describe ("Test", function() {
        //dom = $('<button type="button" class="btn btn-inverse homely-btn changeableSetting light power homely-off" id="kitchenLight_Power" data-capability-type="Light" data-device-id = "1" data-capability-name="kitchenLight" data-setting-type="Power" data-toggle="button">');

    it("Updates power display correctly", function() {
        loadFixtures('button.html')
        expect($("#kitchenLight_Power")).toHaveClass('btn-inverse');
        expect($("#kitchenLight_Power")).toHaveClass('homely-off');
        expect($("#kitchenLight_Power")).not.toHaveClass('btn-success');
        expect($("#kitchenLight_Power")).not.toHaveClass('homely-on');
        kitchenLight.setPower(1);
        kitchenLight.updatePowerDisplay();
        expect($("#kitchenLight_Power")).not.toHaveClass('btn-inverse');
        expect($("#kitchenLight_Power")).not.toHaveClass('homely-off');
        expect($("#kitchenLight_Power")).toHaveClass('btn-success');
        expect($("#kitchenLight_Power")).toHaveClass('homely-on');
        
    });
});

*//*
var bathroomLight = new Light('1', 'Light', 'bathroomLight', 'http://192.168.0.3:3000');
var livingRoomLight = new Light('1', 'Light', 'livingRoomLight', 'http://192.168.0.3:3000');
describe("Handling clicks", function() {

    it ("Changes the value of the power status when the button is clicked", function() {
        bathroomLight.setPower(0);
        $("#bathroomLight_Power").click();
        expect(bathroomLight.power).toBe(1);

    });

    it("Only affects the element that is clicked", function() {
        bathroomLight.setPower(0);
        livingRoomLight.setPower(0);
        $("#bathroomLight_Power").click();
        expect(bathroomLight.power).toBe(1);
        expect(livingRoomLight.power).toBe(0);
    });

    it("Adjusts the power classes for turning off", function() {
        bathroomLight.setPower(0);
        expect($('#bathroomLight_Power')).toHaveClass('btn-inverse');
        expect($('#bathroomLight_Power')).not.toHaveClass('btn-success');
    });

    it("Adjusts the power classes for turning on", function() {
        bathroomLight.setPower(1);
        expect($('#bathroomLight_Power')).toHaveClass('btn-success');
        expect($('#bathroomLight_Power')).not.toHaveClass('btn-inverse');
    });

});*/
