// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');
console.log("REEE ")
navigator.serviceWorker.ready
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      return subscription;
    }
    console.log("here :D")
    // Get the server's public key
    const response = 'BI-zXHGtNEN1e_YL9qVKwGJTcRqdSGiqTsJ5OlaCiuEI2akHga9woMc3SfW2CcMXm-ytipD8XWZ7ODciyvXoBvo';
    const vapidPublicKey = await response;
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    console.log('11')
    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {
  console.log('we are jere')
  // Send the subscription details to the server using the Fetch API.
  console.log(subscription)
  // fetch('./register', {
  //   method: 'post',
  //   headers: {
  //     'Content-type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     subscription: subscription
  //   }),
  // });
  
  const convertedVapidKey = urlBase64ToUint8Array(`BI-zXHGtNEN1e_YL9qVKwGJTcRqdSGiqTsJ5OlaCiuEI2akHga9woMc3SfW2CcMXm-ytipD8XWZ7ODciyvXoBvo`);
  console.log(convertedVapidKey)  
  fetch('/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({sub:subscription,key:convertedVapidKey}),
      });

    // Ask the server to send the client a notification (for testing purposes, in actual
    // applications the push notification is likely going to be generated by some event
    // in the server).


});
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}