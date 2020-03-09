/*
 * Project PetFeederController
 * Description:
 * Author:
 * Date:
 */

#include "PetHardware.h"

//state variables for UI
bool feedPet = false;
int fillLevel = 100;
double emptyWeight = 0;
double fillWeight = 0;
bool emptyStatefault = 1;
bool filledStatefault = 0;
bool feedFault = 0;

//state variables for hardware
double lastWeight = 0.0;
int lastTime = 0;

//particle functions
int publishState(String value);

const String topic = "petFeeder/pet";

void setup() {
  setupHardware();
  Particle.function("feedPetOnce", feedPetOnce);
  Particle.function("setEmptyWeight", setEmptyWeight);
  Particle.function("setFilledWeight", setFilledWeight);
  Particle.function("getFillLevel", getFillLevel);
  Particle.function("publishState", publishState);
  lastTime = millis();
  // Particle.subscribe("cse222Garage/thisGarage/lightRemote", lightRemotePressed, MY_DEVICES);
}

int feedPetOnce(String value) {
  activateFeeder();
  //checkFaults();
  publishState("1");
}

int setEmptyWeight(String value) {
  emptyWeight = getCurrentWeight();
  emptyStatefault = false;
  Serial.print("EMPTY WEIGHT: ");
  Serial.println(emptyWeight);
  //checkFaults();
  publishState("1");
}

int setFilledWeight(String value) {
  fillWeight = getCurrentWeight();
  Serial.print("FILL WEIGHT: ");
  Serial.println(fillWeight);
  if (fillWeight < emptyWeight) {
    filledStatefault = true;
  }
  else {
    filledStatefault = false;
  }
  //checkFaults();
  publishState("1");
}

int getFillLevel(String value) {
  double currentWeight = getCurrentWeight();
  Serial.println(currentWeight);
  if (currentWeight < emptyWeight) {
    currentWeight = 0.0;
  }
  fillLevel = (currentWeight - emptyWeight) / (fillWeight - emptyWeight) * 100;
  //checkFaults();
  if (currentWeight > lastWeight + 1000) {
    lastWeight = currentWeight;
    publishState("1");
  }
  else if (currentWeight < lastWeight - 1000) {
    lastWeight = currentWeight;
    publishState("1");
  }
}

// void checkFaults() {
//   emptyStatefault = getEmptyStateFault();
//   filledStatefault = getFilledStateFault();
//   feedFault = getFeedFault();
// }

//sends garage state to cloud
int publishState(String value) {
  String data = "{";

  data += "\"feedPet\":";
  data += feedPet;
  data += ", ";
  data += "\"fillLevel\":";
  data += fillLevel;
  data += ", ";
  data += "\"emptyWeight\":";
  data += int(emptyWeight);
  data += ", ";
  data += "\"fillWeight\":";
  data += int(fillWeight);
  data += ", ";
  data += "\"emptyStatefault\":";
  data += emptyStatefault;
  data += ", ";
  data += "\"filledStatefault\":";
  data += filledStatefault;
  data += ", ";
  data += "\"feedFault\":";
  data += feedFault;

  data += "}";

  Serial.println("Publishing:");
  Serial.println(data);

  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}

void loop() {
  if (millis() - lastTime > 5000) {
    getFillLevel("1");
    lastTime = millis();
  }
}
