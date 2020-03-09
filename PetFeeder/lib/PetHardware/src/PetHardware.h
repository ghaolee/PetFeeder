#ifndef __GARAGE_HARDWARE__
#define __GARAGE_HARDWARE__

#include"Arduino.h"

/**
 * Setup the feeder hardware (all I/O should be configured here)
 *
 * This routine should be called only once from setup()
 */
void setupHardware();

/**
 * This function will rotate the motor one half circle for one serving.
 *
 * Parameter: none
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void activateFeeder();

// double initializeEmptyBowl();
//
// double initializeFilledBowl();

/**
 * This function will send the current weight measured on the scale.
 *
 * Parameter: none
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
double getCurrentWeight();

// bool getEmptyStateFault();
//
// bool getFilledStateFault();
//
// bool getFeedFault();

/**
 * This function will send a debugging message.
 *
 * Parameter: message. The message (no more tha 200 bytes)
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void sendDebug(String message);


#endif
