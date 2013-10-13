describe("Light Object", function() {
    var l = new Light('1', 'Light', 'id', 'http://192.168.0.3:3000');
    it("Initialises the capability name correctly", function() {
        expect(l.capability_name).toBe("id");
    });

    it("Initialises the capability type correctly", function() {
        expect(l.capability_type).toBe("Light");
    });

    it("Initialises the power to 0", function() {
        expect(l.power).toBe(0);
    });

    it("Initialises the brightness to 0", function() {
        expect(l.brightness).toBe(0);
    });

    it("Initialises the colour to 0", function() {
        expect(l.colour).toBe(0);
    });
    /*
    it("Toggles power correctly", function() {
        l.togglePower();
        expect(l.power).toBe(1);
        l.togglePower();
        expect(l.power).toBe(0);
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
        l.setColour(293);
        expect(l.colour).toBe(255);
        l.setColour(-36);
        expect(l.colour).toBe(0);
    });

});

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
    });*/

});
