 var gamepad = require("gamepad");
 var SerialPort = require("serialport");
// var parsers = require('serialport/parsers');
 var serialPort = new SerialPort("COM3", {
     baudrate: 9600,
     parser: SerialPort.parsers.readline("\n")
 });
 serialPort.on("open", function() {
     console.log('open');
     serialPort.on('data', function(data) {
         console.log(data + " ");
     });

 });
 /*var SerialPort = require("serialport").SerialPort
 var serialPort = new SerialPort("COM3", {
   baudrate: 9600
 });
 serialPort.on("open", function () {
   console.log('open');
   serialPort.on('data', function(data) {
     console.log('data received: ' + data);
   });
   serialPort.write("ls\n", function(err, results) {
     console.log('err ' + err);
     console.log('results ' + results);
   });
 });            
 */
 function mapVal(x, in_min, in_max, out_min, out_max) {
     return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
 }
 // Initialize the library 
 gamepad.init()
 rvaluex = 0;
 rvaluey = 0;
 lvaluex = 0;
 lvaluey = 0;
 // List the state of all currently attached devices 

 // Create a game loop and poll for events 
 setInterval(gamepad.processEvents, 15);
 // Scan for new gamepads as a slower rate 
 setInterval(gamepad.detectDevices, 500);

 // Listen for move events on all gamepads 
 gamepad.on("move", function(id, axis, value) {
     if (id == 1) {
         
         
                  //console.log(lvaluex)
     }
     if (id == 0) {
         if (axis == 0) {
             rvaluey = Math.round(value * 100) / 100;
         };
         if (axis == 1) {
             rvaluex = Math.round(-1 * value * 100) / 100;
         };
         if (axis == 2) {
             lvaluey = Math.round(value * 100) / 100;
         };

         if (axis == 3) {
             lvaluex = Math.round(value * 100) / 100;
         };
     }



     rValXString = String(Math.round(mapVal(rvaluex, -1, 1, 0, 4)));
     rValYString = String(Math.round(mapVal(rvaluey, -1, 1, 0, 4)));
     lValXString = String(Math.round(mapVal(lvaluex, -0.7, .7, 0, 4)));
     lValYString = String(Math.round(mapVal(lvaluey, -.7, .7, 0, 4)));
     //console.log(rValXString + rValYString + lValXString + lValYString)
     //console.log(Math.round(mapVal(rvaluex, -1, 1, 160, 585)));
     serialPort.write(rValXString + rValYString + lValXString + lValYString+',');

     //console.log(" Right Joystick: " + " X Val: " + mapVal(rvaluex, -1, 1, -100, 100).toFixed(3) + " Y Val: " + mapVal(-rvaluey, -1, 1, -100, 100).toFixed(3));
     //console.log(" Left Joystick: " + " X Val: " + mapVal(lvaluex, -1, 1, -100, 100).toFixed(3) + " Y Val: " + mapVal(-lvaluey, -1, 1, -100, 100).toFixed(3));
 });

 // Listen for button up events on all gamepads 
