/*
  An object representing a contraption that sends food into a bowl.
  Features include:
     Ability to give food
     Ability to show how full the bowl is
*/

//particle access information
var myParticleAccessToken = "2897494749a0b74eda712ac1ab9d88154db4f161"
var myDeviceId = "420028000447373336323230"
var topic = "petFeeder/pet"

//runs when publishState event enters stream
function newFeedEvent(objectContainingData) {
  loadingPageOff();
  console.dir(objectContainingData);
  var object = JSON.parse(objectContainingData.data);
  console.log(object);
  feeder.fillLevel = object.fillLevel;
  feeder.emptyStatefault = object.emptyStatefault;
  feeder.filledStatefault = object.filledStatefault;
  feeder.feedFault = object.feedFault;
  feeder.stateChange();
}

//feed contraption structure
var feeder = {
  fillLevel: 100,
  emptyStatefault: true,
  filledStatefault: true,
  feedFault: false,

  // Variable used to track listener function
  stateChangeListener: null,

  particle: null,

  // ****** Simple setter functions *******
  //feeds the pet one serving, runs the motor once
  feedPetOnce: function() {
    var functionData = {
      deviceId: myDeviceId,
      name: "feedPetOnce",
      argument: ""+this.feedPet,
      auth: myParticleAccessToken
    }
    console.dir(functionData);
    function onSuccess(e) { console.log("feedPetOnce call success") }
    function onFailure(e) { console.log("feedPetOnce call failed")
                           console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)
  },

  //sets empty bowl weight to compare
  setEmptyWeight: function() {
    //call empty weight cloud function
    var functionData = {
      deviceId: myDeviceId,
      name: "setEmptyWeight",
      argument: ""+this.emptyWeight,
      auth: myParticleAccessToken
    }
    console.dir(functionData);
    function onSuccess(e) { console.log("setEmptyWeight call success") }
    function onFailure(e) { console.log("setEmptyWeight call failed")
                           console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)
  },
  //sets filled bowl weight to compare
  setFilledWeight: function() {
    //call filled weight cloud function
    var functionData = {
      deviceId: myDeviceId,
      name: "setFilledWeight",
      argument: ""+this.fillWeight,
      auth: myParticleAccessToken
    }
    console.dir(functionData);
    function onSuccess(e) { console.log("setFilledWeight call success") }
    function onFailure(e) { console.log("setFilledWeight call failed")
                           console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)
  },
  //requests current fill level percentage of bowl
  getFillLevel: function() {
    this.stateChange();
    var functionData = {
      deviceId: myDeviceId,
      name: "getFillLevel",
      argument: ""+this.fillLevel,
      auth: myParticleAccessToken
    }
    console.dir(functionData);
    function onSuccess(e) { console.log("getFillLevel call success") }
    function onFailure(e) { console.log("getFillLevel call failed")
                           console.dir(e) }
    particle.callFunction(functionData).then(onSuccess,onFailure)
  },

  //Change Listeners
  setStateChangeListener: function(aListener) {
    this.stateChangeListener = aListener;
    this.stateChange();
  },

  //update UI values
  stateChange: function() {
    var callingObject = this
    if(callingObject.stateChangeListener) {
      var state = { fillLevel: this.fillLevel,
                    emptyStatefault: this.emptyStatefault,
                    filledStatefault: this.filledStatefault,
                    feedFault: this.feedFault
                  };
      callingObject.stateChangeListener(state)
    }
  },

  //establishes connection to the cloud for pub-sub messaging
  setup: function() {
    particle = new Particle();
    function onSuccess(stream) {
      console.log("getEventStream success")
      //activate newFeedEvent when event is published
      stream.on('event', newFeedEvent)

      //look for publishState function data
      var functionData = {
        deviceId:myDeviceId,
        name: "publishState",
        argument:"",
        auth: myParticleAccessToken
      }
      function onSuccess(e) { console.log("setUp call success") }
      function onFailure(e) { console.log("setUp call failed")
                             console.dir(e) }
      particle.callFunction(functionData).then(onSuccess,onFailure)
    }
    function onFailure(e) { console.log("getEventStream call failed")
                            console.dir(e) }
    // Subscribe to the stream
    particle.getEventStream( { name: topic, auth: myParticleAccessToken }).then(onSuccess, onFailure)
  }
}
