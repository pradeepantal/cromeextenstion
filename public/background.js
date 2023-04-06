/*global chrome*/


chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome extension successfully installed!');
  var userLogin;
  chrome.storage.local.get(["userInfo"]).then((result) => {
    userLogin=result.userInfo;
  });
  if (typeof (userLogin) !== "undefined" && userLogin !== null) {
    console.log("1");
  } else {
    let secret = generateSecret(8);
    var data = {
      "password": "",
      "key": btoa(secret),
      "status":0
    }
    setStorage(data);
  }
  return;
});


function generateSecret(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   
    if (request.key === "reset"){
      sendResponse({key:  btoa(generateSecret(8))});
    }
    if(request.key === "clear"){
      let secret = generateSecret(8);
      var data = {
        "password": "",
        "key": btoa(secret),
        "status":0
      }
      setStorage(data);
      sendResponse({key:  "success"});
    }
   
    }
   
);

setStorage = (data) => {
  chrome.storage.local.set({userInfo: data}, function() {

  });
}

