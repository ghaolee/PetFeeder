#if 1
#include "Arduino.h"
#include <math.h>

#include"PetHardware.h"
#include "HX711ADC.h"
#include <Stepper.h>

using namespace std;

double aEmptyWeight;
const int stepsPerRevolution = 200;
HX711ADC scale(A1, A0);
Stepper myStepper(stepsPerRevolution, 1, 2, 3, 4);

/**
 * Setup the feeder hardware
 */
void setupHardware() {
  Serial.begin(9600);
  scale.begin();
  scale.tare();
  myStepper.setSpeed(40);
}

/**
 * Spins stepper motor once to provide one serving
 */
void activateFeeder() {
  Serial.println("ACTIVATE FEEDER");
  myStepper.step(stepsPerRevolution);
  myStepper.step(stepsPerRevolution);
  myStepper.step(stepsPerRevolution);
  myStepper.step(stepsPerRevolution);
  myStepper.step(stepsPerRevolution);
}

// double initializeEmptyBowl() {
//   scale.power_up();
//   double weight = scale.get_units();
//   scale.power_down();
//   return weight;
// }
//
// double initializeFilledBowl() {
//   scale.power_up();
//   double weight = scale.get_units();
//   scale.power_down();
//   return weight;
// }

/**
 * Gets the current weight of the food bowl
 */
double getCurrentWeight() {
  scale.power_up();
  double weight = scale.get_units();
  scale.power_down();
  return weight;
}

// bool getEmptyStateFault() {
//
// }
//
// bool getFilledStateFault() {
//
// }
//
// bool getFeedFault() {
//
// }

/**
 * This function will send a debugging message.
 *
 * Parameter: message. The message (no more tha 200 bytes)
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void sendDebug(String message) {
  Serial.println(message);
}

#endif
