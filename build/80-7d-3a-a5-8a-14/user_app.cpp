#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "SPI.h"
#include "Adafruit_GFX.h"
#include "Adafruit_LEDBackpack.h"



#include "KB_initBoard.h"
#include "KB_music.h"
#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_ht16k33.h"

KB_board board = KB_board();
KB_music music = KB_music();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();

typedef int Number;
typedef int Boolean;
using namespace std;






void setup()
{
  board.begin();
  music.begin();
  lm73.begin();
  matrix.displayBegin();

  
  
}
void loop()
{
  void vTask5(void *pvParameters) {
  while(1) {
    matrix.scrollText(String(ldr.mapLDR()));
    vTaskDelay(1000 / portTICK_RATE_MS);
  }
  // kill itself
  vTaskDelete(NULL);
}

  

  while(1) {delay(1);};
}