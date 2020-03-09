//Pages
var loginPage = document.getElementById("login-page");
var settingsPage = document.getElementById("settings-page");
var mainPage = document.getElementById("main-page");
var signupPage = document.getElementById("signup-page");
var loadingPage = document.getElementById("loading-page");
var loadingData = document.getElementById("loading-data");

//Inputs
var loginButton = document.getElementById("login-button");
var createUserButton = document.getElementById("create-user-button");
var settings = document.getElementById("settings");
var logoutButton = document.getElementById("logout-button");
var signupButton = document.getElementById("signup-button");
var backButton = document.getElementById("back-button");
var emptyButton = document.getElementById("empty-bowl-button");
var filledButton = document.getElementById("filled-bowl-button");
var feedButton = document.getElementById("feed-pet-button");
var fillMeter = document.getElementById("fill-level-meter");
var bowlStatus = document.getElementById("bowl-fault-status");

//Change pages
function getMainPage() {
  loginPage.hidden = true;
  settingsPage.hidden = true;
  mainPage.hidden = false;
}

function getLoginPage() {
  mainPage.hidden = true;
  signupPage.hidden = true;
  loginPage.hidden = false;
}

function getSignupPage() {
  loginPage.hidden = true;
  signupPage.hidden = false;
}

function getSettingsPage() {
  mainPage.hidden = true;
  settingsPage.hidden = false;
}

function loadingPageOn() {
  loadingData.hidden = true;
  loadingPage.hidden = false;
}

function loadingPageOff() {
  loadingData.hidden = false;
  loadingPage.hidden = true;
}

//Button Alerts
function alertEmpty() {
  feeder.setEmptyWeight();
  alert("Empty Bowl Weight Set.");
}

function alertFilled() {
  feeder.setFilledWeight();
  alert("Filled Bowl Weight Set.");
}

//activate feeder
function feedPetNow() {
  feeder.feedPetOnce();
  //feeder.getFillLevel();
}

//updates main page UI values
function stateUpdate(newState) {
  fillMeter.value = feeder.fillLevel;
  //shows fault status
  if (feeder.emptyStatefault) {
    bowlStatus.innerHTML = "Please initialize bowl settings. <br>";
  }
  else {
    bowlStatus.innerHTML = "";
  }
  if (feeder.filledStatefault) {
    bowlStatus.innerHTML += "Fill weight is set lighter than empty weight. Please reinitialize bowl settings. <br> <br>";
  }
  if (feeder.feedFault) {
    bowlStatus.innerHTML += "Feeding wheel blockage. Please check device. <br>";
  }
}

//Initial Setup
window.onload = function() {
  loginButton.addEventListener("click", getMainPage);
  createUserButton.addEventListener("click", getSignupPage);
  settings.addEventListener("click", getSettingsPage);
  logoutButton.addEventListener("click", getLoginPage);
  signupButton.addEventListener("click", getLoginPage);
  backButton.addEventListener("click", getMainPage);
  emptyButton.addEventListener("click", alertEmpty);
  filledButton.addEventListener("click", alertFilled);
  feedButton.addEventListener("click", feedPetNow);

  feeder.setStateChangeListener(stateUpdate);
  this.loadingPageOn();
  feeder.setup();
}
