#ifndef KB_HT16K33_h
#define KB_HT16K33_h

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

#define MATRIX_ADDR 0x70

class KB_8x16Matrix
{
 public:
  void displayBegin(void);
  void scrollText(String text);
  void printText(int x, int y, String text);
  void printNumber(int x, int y, int number);
  void printFloat(int x, int y, float number);
  void drawBitmap(int x, int y, uint8_t *img);
  void drawPixel(int16_t x, int16_t y, uint16_t color);
  void drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color);
  void drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color);
  void drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color);
  void fillCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color);
  void drawTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1, int16_t x2, int16_t y2, uint16_t color);
  void fillTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1,int16_t x2, int16_t y2, uint16_t color);
 

 protected:
  int temp;
  String msg;
  int16_t msg_len;

  Adafruit_8x16minimatrix matrix = Adafruit_8x16minimatrix();


 private:
};

#endif /* KB_HT16K33_h */