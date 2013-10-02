describe("Light Object", function() {
    var l = new Light("id");
    it("initialises the ID correctly", function() {
        expect(l.id).toBe("id");
    });

    it("initialises the power to 0", function() {
        expect(l.power).toBe(0);
    });

    it("initialises the brightness to 0", function() {
        expect(l.brightness).toBe(0);
    });

    it("initialises the colour to 0", function() {
        expect(l.colour).toBe(0);
    });

    it("toggles power correctly", function() {
        l.togglePower();
        expect(l.power).toBe(1);
        l.togglePower();
        expect(l.power).toBe(0);
    });

    it ("sets power correctly", function() {
        l.setPower(1);
        expect(l.power).toBe(1);
    });

    it ("bounds power correctly", function() {
        l.setPower(12);
        expect(l.power).toBe(1);
        l.setPower(-3);
        expect(l.power).toBe(0);
    });

    it ("sets brightness correctly", function() {
        l.setBrightness(5);
        expect(l.brightness).toBe(5);
    });

    it ("bounds brightness correctly", function() {
        l.setBrightness(12);
        expect(l.brightness).toBe(9);
        l.setBrightness(-3);
        expect(l.brightness).toBe(0);
    });

    it ("sets colour correctly", function() {
        l.setColour(32);
        expect(l.colour).toBe(32);
    });

    it ("bounds colour correctly", function() {
        l.setColour(293);
        expect(l.colour).toBe(255);
        l.setColour(-36);
        expect(l.colour).toBe(0);
    });

});

describe("Handling clicks", function() {
    //var kitchenLight = new Light('kitchenLight');
    //var livingRoomLight = new Light('livingRoomLight');


    it ("Changes the value of the power status when the button is clicked", function() {
        kitchenLight.setPower(0);
        $("#kitchenLight_Power").click();
        expect(kitchenLight.power).toBe(1);

    });

    it("Only affects the element that is clicked", function() {
        kitchenLight.setPower(0);
        livingRoomLight.setPower(0);
        $("#kitchenLight_Power").click();
        expect(kitchenLight.power).toBe(1);
        expect(livingRoomLight.power).toBe(0);
    });s

    it("Adjusts the power classes for turning off", function() {
        kitchenLight.setPower(0);
        expect($('#kitchenLight_Power')).toHaveClass('btn-inverse');
        expect($('#kitchenLight_Power')).not.toHaveClass('btn-success');
    });

    it("Adjusts the power classes for turning on", function() {
        kitchenLight.setPower(1);
        expect($('#kitchenLight_Power')).toHaveClass('btn-success');
        expect($('#kitchenLight_Power')).not.toHaveClass('btn-inverse');
    });

});