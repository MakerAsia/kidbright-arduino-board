#include "KB_mqttConnector.h"
#include <Wire.h>

extern String _PREFIX;
extern String _DEVICE_NAME;
extern String _WIFI_SSID;
extern String _WIFI_PASSWORD;

void KB_mqttConnector::beginMqtt(char prefix, char devicename, char ssidwifi, char passwifi);
  _PREFIX = prefix.c_str();
  _DEVICE_NAME = devicename.c_str();
  _WIFI_SSID = ssidwifi.c_str();
  _WIFI_PASSWORD = passwifi.c_str();

  init_hardware();
  init_wifi();
  init_mqtt();
}

void KB_mqttConnector::init_hardware()
{
  pinMode(relayPin, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(relayPin, relayPinState);;
}

void KB_mqttConnector::init_wifi() {
  WiFi.disconnect();
  delay(20);
  WiFi.mode(WIFI_STA);
  delay(50);
  const char* ssid =  WIFI_SSID.c_str();
  const char* pass =  WIFI_PASSWORD.c_str();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf ("Connecting to %s:%s\r\n", ssid, pass);
    delay(300);
  }
  Serial.println("WiFi Connected.");
  digitalWrite(2, HIGH);
}