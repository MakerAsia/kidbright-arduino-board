#include <Arduino.h> 

extern String _PREFIX;
extern String _DEVICE_NAME;
extern String _WIFI_SSID;
extern String _WIFI_PASSWORD;
extern char bufferPrefix[100];

/* BOARD INFO */
String DEVICE_NAME      = "KBPRO-001"//_DEVICE_NAME; //"YOUR-DEVICE-NAME-001"; 

/* WIFI INFO */ 
String WIFI_SSID        = "ampere"; //_WIFI_SSID; //"ampere";
String WIFI_PASSWORD    = "espertap"; //_WIFI_PASSWORD; //"espertap";

/* MQTT INFO */ 
String MQTT_HOST        = "mqtt.cmmc.io";
String MQTT_USERNAME    = "";
String MQTT_PASSWORD    = "";
String MQTT_CLIENT_ID   = "";


String MQTT_PREFIX      = "KBPRO/";//bufferPrefix; //"WORKSHOP/";

int    MQTT_PORT        = 1883;
int PUBLISH_EVERY       = 10L * 1000;
int MQTT_CONNECT_TIMEOUT= 10; 
