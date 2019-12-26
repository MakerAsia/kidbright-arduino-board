#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <vector>
#include "Adafruit_GFX.h"
#include "Adafruit_LEDBackpack.h"
#include "SPI.h"

#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_ht16k33.h"
#include "KB_initBoard.h"
#include "KB_music.h"
#include "MCP7941x.h"

MCP7941x rtc = MCP7941x();

KB_board board = KB_board();
KB_music music = KB_music();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();

typedef int Number;
typedef int Boolean;
using namespace std;

void setup() {
  board.begin();
  music.begin();
  lm73.begin();
  matrix.displayBegin();
  ldr.begin();
}
void loop() {
  if (((int)digitalRead(KB_BUTTON1)) == 0) {
    matrix.drawBitmap(
        0, 0,
        (uint8_t *)"\x0\x0\x0\x0\x4\x16\x35\x55\x95\xfd\x5\x6\x4\x0\x0\x0");
  }
  if (((int)digitalRead(KB_BUTTON2)) == 0) {
    matrix.drawBitmap(
        0, 0,
        (uint8_t *)"\x0\x0\x0\x0\x0\x39\x45\x57\x44\x57\x45\x39\x0\x0\x0\x0");
  }
}