#include <Servo.h>

Servo motor;
int ang = 0;

void setup() {
  Serial.begin(9600);
  motor.attach(9);
  pinMode(10, OUTPUT);
}

void loop() {
  int pot1 = analogRead(A0);
  int pot2 = analogRead(A1);
  
  if (Serial.available() > 0) {
    int p5info = Serial.read();
    
    Serial.print(pot1);
    Serial.print(",");
    Serial.print(pot2);
    Serial.print(",");
    }
}
