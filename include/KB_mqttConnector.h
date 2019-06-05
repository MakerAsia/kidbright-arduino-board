#ifndef KB_MQTT_CONNECTOR_h
#define KB_MQTT_CONNECTOR_h

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <MqttConnector.h>
#include <Wire.h>
#include <SPI.h>
#include "cmmc_init_mqtt.h"
#include "cmmc_publish.h"
#include "cmmc_receive.h"
#include "cmmc_config.h"

MqttConnector *mqtt; 

int relayPin = KB_OUTPUT1; // pin 26
int relayPinState = HIGH;
int LED_PIN = KB_LED_BT;  // pin 17

String _PREFIX = "KBPRO/";
String _DEVICE_NAME = "KBPRO-001";
String _WIFI_SSID = "ampere";
String _WIFI_PASSWORD = "espertap";

class KB_mqttConnector
{
 public:
  void beginMqtt(char prefix, char devicename, char ssidwifi, char passwifi);

 protected:
  void init_hardware(void);
  void init_wifi(void);

 private:
};

#endif /* KB_LM73_h */