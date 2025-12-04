#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#define SensorPin A0
#define buzzerPin 3
#define greenLight 4
#define yellowLight 6
#define redLight 5

unsigned long int avgValue;
float b;
int buf[10], temp;

#define ONE_WIRE_BUS 2  // Data wire is connected to digital pin 2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

LiquidCrystal_I2C lcd(0x27, 16, 2); 

void setup(void) {
  Serial.begin(9600);
  Serial.println("DS18B20 Temperature Sensor Test");
  sensors.begin();
  lcd.init(); // Initialize the LCD
  lcd.backlight(); // Turn on the backlight
  lcd.clear();
  pinMode(buzzerPin, OUTPUT);
  pinMode(greenLight, OUTPUT);
  pinMode(yellowLight, OUTPUT);
  pinMode(redLight, OUTPUT);
}

void loop(void) {
  sensors.requestTemperatures();  // Send the command to get temperatures
  float temperatureC = sensors.getTempCByIndex(0);  // Get the first sensor
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println(" °C");
  lcd.setCursor(0, 1);
  lcd.print("temp:           ");
  lcd.setCursor(7, 1);
  lcd.print(temperatureC);

  for (int i = 0; i < 10; i++) { 
    buf[i] = analogRead(SensorPin);
    delay(10);
  }
  
  for (int i = 0; i < 9; i++) {
    for (int j = i + 1; j < 10; j++) {
      if (buf[i] > buf[j]) {
        temp = buf[i];
        buf[i] = buf[j];
        buf[j] = temp;
      }
    }
  }
  
  avgValue = 0;
  for (int i = 2; i < 8; i++)
    avgValue += buf[i];
  
  float phValue = (float)avgValue * 5.0 / 1024 / 6;
  //phValue = 3.5 * phValue;  // adjust calibration here
  
  Serial.print("pH value:       ");
  Serial.println(phValue, 3);
  lcd.setCursor(0, 0);
  lcd.print("pH:             ");
  lcd.setCursor(4, 0);
  lcd.print(phValue);
  
  if(phValue > 3.4 ){
    lcd.setCursor(0, 0);
    lcd.print("vinegar ready   ");

    digitalWrite(greenLight, LOW);
    digitalWrite(yellowLight, LOW);
    for(int i=0;i<3;i ++){
      digitalWrite(redLight, HIGH);
      tone(buzzerPin, 1000);
      delay(500);
      noTone(buzzerPin);
      digitalWrite(redLight, LOW);
      delay(200);
    }
  }else if(phValue > 3.2){
    lcd.setCursor(0, 0);
    lcd.print("vngr almst ready");

    digitalWrite(greenLight, LOW);
    digitalWrite(redLight, LOW);
    for(int i=0;i<3;i ++){
      digitalWrite(yellowLight, HIGH);
      tone(buzzerPin, 1000);
      delay(500);
      noTone(buzzerPin);
      digitalWrite(yellowLight, LOW);
      delay(200);
    }
  }else{
    digitalWrite(greenLight, HIGH);
    digitalWrite(yellowLight, LOW);
    digitalWrite(redLight, LOW);
  }

  delay(1000);
}