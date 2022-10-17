#include <Servo.h>

Servo motor;
int ang = 0;
int brightness = 0;

void setup() {
  Serial.begin(9600);
  motor.attach(9);
  pinMode(10, OUTPUT);
}

void loop() {
  int pot1 = analogRead(A0);
  int pot2 = analogRead(A1);
  int light = analogRead(A2);

  if (Serial.available() > 0) {
    int p5info = Serial.read();
    
    Serial.print(pot1);
    Serial.print(",");
    Serial.print(pot2);
    Serial.print(",");
    Serial.println(light);
    brightness = p5info;
    }
    analogWrite(10, brightness);
}
