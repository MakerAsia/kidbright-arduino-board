#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "SPI.h"
// #include "Adafruit_GFX.h"
// #include <Adafruit_ILI9341.h>

// #define TFT_DC 18
// #define TFT_CS 19
// #define TFT_RST 27
// #define TFT_MOSI 21
// #define TFT_MISO 32
// #define TFT_CLK 22

// Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_MOSI, TFT_CLK, TFT_RST, TFT_MISO);

${EXTINC}

#include "KB_initBoard.h"
#include "KB_music.h"
#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_ht16k33.h"
// #include "KB_tft.h"

KB_board board = KB_board();
KB_music music = KB_music();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();
// KB_TFT tftScreen = KB_TFT();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}


void setup()
{
  board.begin();
  //music.begin();
  lm73.begin();
  matrix.displayBegin();
  // tft.begin();
  // tftScreen.begin();

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  mqtt->loop();
  // while(1);
}
