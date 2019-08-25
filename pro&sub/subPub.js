(function (w) {
  const pubSub={}
  //订阅的函数
  let callbacksObj={}
  pubSub.subscribe = function (msgName, callback) {
    let token=0;
    tokenID="token_"+ ++token
     const callbacks = callbacksObj[msgName]
    if(!callbacks){
        callbacksObj[msgName]={
        [tokenID] : callback
        }
      
    }else{
      callbacks[token] = callback
    }

      return tokenID
    
  }


  //同步的订阅函数
  pubSub.syncpublish = function (msgName, date) {
    const callbacks=callbacksObj[msgName]
    if (callbacks) {
      Object.value(callbacks).foreach(callback=>{
        callback(date)
      })
      
    }
  }
//发布的函数
  pubSub.publish = function (msgName,date) {
     const callbacks = callbacksObj[msgName]
     if (callbacks) {
      setTimeout(() => {
        console.log(callbacks)
         Object.values(callbacks).forEach(callback => {
               callback(date)
      }, 0);
       })

     }
  }
//取消订阅的函数
  pubSub.unSubscribe = function (flag) {
    if(flag===undefined||flag===null){
      callbacksObj={}
    } else if (typeof flag === "string") {
      if (flag.indexOf('token_') === 0) {
       
        const callbacks = Object.values(callbacksObj).find(callbacks => {
          callbacks.hasOwnProperty(flag)
        })
        if(callbacks){
           delete callbacks[flag]
       
      } else {
        delete callbacksObj[flag]
      }
    }
  }

  }



w.pubSub = pubSub
})(window)