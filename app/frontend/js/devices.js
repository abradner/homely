var kitchenLight = new Light('1', 'Light', 'kitchenLight', 'http://192.168.0.3:3000');
var livingRoomLight = new Light('1', 'Light', 'livingRoomLight', 'http://192.168.0.3:3000');

var devices = {
  '1' : {'1' : kitchenLight, '2' : livingRoomLight}
};