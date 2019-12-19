#include "KB_ht16k33.h"


void KB_8x16Matrix::displayBegin(void) {
    Wire.begin();
    matrix.begin(MATRIX_ADDR);
    matrix.setTextColor(LED_ON);
    matrix.setTextSize(1);
    matrix.setRotation(1);
    matrix.setTextWrap(false);
}


void KB_8x16Matrix::scrollText(String text) {
  String msg = text;
  msg_len = (-1 * (msg.length() * 6));
  for (int16_t x = 16; x >= msg_len; x--) {
     matrix.clear();
     matrix.setCursor(x, 0);
     matrix.print(msg);
     matrix.writeDisplay();
     delay(50);
  }
}

void KB_8x16Matrix::printText(int x, int y, String text) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(text);
    matrix.writeDisplay();
}

void KB_8x16Matrix::printNumber(int x, int y, int number) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(String(number));
    matrix.writeDisplay();
}

void KB_8x16Matrix::printFloat(int x, int y, float number) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(String(number));
    matrix.writeDisplay();
}
void KB_8x16Matrix::drawBitmap(int x, int y, uint8_t *img){
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.setRotation(0);
    matrix.drawBitmap(0, 0, img, 8, 16, LED_ON);
    matrix.writeDisplay();
    matrix.setRotation(1);   
}


void KB_8x16Matrix::drawPixel(int16_t x, int16_t y, uint16_t color) {
    matrix.setRotation(1);
    matrix.drawPixel(x, y, color);
    matrix.writeDisplay();
}
 

void KB_8x16Matrix::drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color) {
    matrix.setRotation(1);
    matrix.drawLine(x0, y0, x1, y1, color);
    matrix.writeDisplay();
}

void KB_8x16Matrix::drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color) {
    matrix.setRotation(1);
    matrix.drawRect(x, y, w, h, color);
    matrix.writeDisplay();
}

void KB_8x16Matrix::drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color) {
    matrix.setRotation(1);
    matrix.drawCircle(x0, y0, r, color);
    matrix.writeDisplay();
}

void KB_8x16Matrix::fillCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color) {
    matrix.setRotation(1);
    matrix.fillCircle(x0, y0, r, color);
    matrix.writeDisplay();
}

void KB_8x16Matrix::drawTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1, int16_t x2, int16_t y2, uint16_t color) {
    matrix.setRotation(1);
    matrix.drawTriangle(x0, y0, x1, y1, x2, y2, color);
    matrix.writeDisplay();
}

void KB_8x16Matrix::fillTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1,int16_t x2, int16_t y2, uint16_t color) {
    matrix.setRotation(1);
    matrix.fillTriangle(x0, y0, x1, y1,x2, y2, color);
    matrix.writeDisplay();
}