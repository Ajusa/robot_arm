
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();


char raw[9];
char rx[3];
char ry[3];
char lx[3];
char ly[3];
int rxInt;
int ryInt;
int lxInt;
int lyInt;
int rxPulse = 270;
int ryPulse = 400;
int lxPulse = 220;
int lyPulse = 550;
void setup() {
  Serial.begin(9600);
  Serial.println("16 channel Servo test!");
#ifdef ESP8266
  Wire.pins(2, 14);   // ESP8266 can use any two pins, such as SDA to #2 and SCL to #14
#endif
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  yield();
}
void loop() {
  if (Serial.available() > 0) {
                // read the incoming byte:
                Serial.readBytesUntil(',',raw, 5);
                
                rx[0] = char(raw[0]);
                ry[0] = char(raw[1]);
                lx[0] = char(raw[2]);
                ly[0] = char(raw[3]);
                rxInt = atoi(rx);
                ryInt = atoi(ry);
                lxInt = atoi(lx);
                lyInt = atoi(ly);
                rxInt = map(rxInt, 0, 4, -2, 2); 
                ryInt = map(ryInt, 0, 4, 2, -2); 
                lxInt = map(lxInt, 0, 4, -2, 2); 
                lyInt = map(lyInt, 0, 4, -2, 2);
                if(rxInt == 1 || rxInt == -1){
                    rxInt = 0;
                }
                if(ryInt == 1 || ryInt == -1){
                    ryInt = 0;
                }
                if(lxInt == 1 || lxInt == -1){
                    lxInt = 0;
                }
                if(lyInt == 1 || lyInt == -1){
                    lyInt = 0;
                }
                rxPulse = rxPulse + rxInt;
                ryPulse = ryPulse + ryInt;
                lxPulse = lxPulse + lxInt;
                lyPulse = lyPulse + lyInt;
        }
        
        
         if (rxPulse > 590) {
             rxPulse = 590;
         }
         if (rxPulse < 130) {
             rxPulse = 130;
         }
         if (ryPulse > 570) {
             ryPulse = 570;
         }
         if (ryPulse < 340) {
             ryPulse = 340;
         }
         if (lxPulse > 230) {
             lxPulse = 230;
         }
         if (lxPulse < 140) {
             lxPulse = 140;
         }
         if (lyPulse > 580) {
             lyPulse = 580;
         }
         if (lyPulse < 160) {
             lyPulse = 160;
         }
         
                pwm.setPWM(0, 0, rxPulse);
                pwm.setPWM(2, 0, ryPulse);
                pwm.setPWM(4, 0, lxPulse);
                pwm.setPWM(6, 0, lyPulse);
                //Serial.println(lxPulse);
                
                //Serial.print(String(ryPulse));
                //Serial.print(" " + String(ryPulse));
                //rxInt = 0;
                //ryInt = 0;
  delay(10);

}
