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

Number _state;

void setup() {
  board.begin();
  music.begin();
  lm73.begin();
  matrix.displayBegin();
  ldr.begin();

  _state = 1;
}
void loop() {
  if (((int)digitalRead(KB_BUTTON1)) == 0) {
    _state = 1;
  }
  if (((int)digitalRead(KB_BUTTON2)) == 0) {
    _state = 2;
  }
  if (_state == 1) {
    matrix.printText(0, 0, String(ldr.mapLDR()));
  }
  if (_state == 2) {
    matrix.printText(0, 0, String(lm73.readTemp()));
  }
}