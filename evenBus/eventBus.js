(function(window) {
  const eventBus={}
  let eventCallbacks={}
  eventBus.on=function (eventName,callback) {
    const callbacks=eventCallbacks[eventName]
    if(callbacks){
      callbacks.push(callback)
    }else{
      eventCallbacks[eventName]=[callback]
    } 
  }
  eventBus.emit=function (eventName,data) {
    const callbacks = eventCallbacks[eventName]
    if(callbacks&&callbacks.length>0){
      callbacks.forEach(callback => {
        callback(data)
      });
    }
    
  }
  eventBus.cancel=function (eventName) {
    if(eventName){
      delete eventCallbacks[eventName]
    }else{
      eventCallbacks={}
    }
    
  }



  window.eventBus = eventBus
})(window)