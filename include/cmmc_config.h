#include <Arduino.h> 

extern String _PREFIX;
extern String _DEVICE_NAME;
extern String _WIFI_SSID;
extern String _WIFI_PASSWORD;


/* BOARD INFO */
String DEVICE_NAME      = _DEVICE_NAME; //"YOUR-DEVICE-NAME-001"; 

/* WIFI INFO */ 
String WIFI_SSID        = _WIFI_SSID; //"ampere";
String WIFI_PASSWORD    = _WIFI_PASSWORD; //"espertap";

/* MQTT INFO */ 
String MQTT_HOST        = "mqtt.cmmc.io";
String MQTT_USERNAME    = "";
String MQTT_PASSWORD    = "";
String MQTT_CLIENT_ID   = "";

char bufferPrefix[100];
sprintf(bufferPrefix, "%s/", _PREFIX.c_str());

String MQTT_PREFIX      = "WORKSHOP/";

int    MQTT_PORT        = 1883;
int PUBLISH_EVERY       = 10L * 1000;
int MQTT_CONNECT_TIMEOUT= 10; 
