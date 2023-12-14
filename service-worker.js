self.addEventListener('push', function (event) {
    let payload
    try {
      // parse JSON string to an object
      payload = JSON.parse(event.data.text())
    } catch (err) {
      console.log(err)
      // if error in parsing we can set default value to the payload
      payload = {
        title: 'New Updates Arrives!',
        body: 'We Got Something for You!',
        clickUrl: ''
      }
    }
    const title = payload.title
    // this option is used to modify the notification 
    const options = {
      // this is the notification body
      body: payload.body || 'New Updates Arrives!',
      // notification icon
      icon: '/favicon.png',
      // badge icon
      badge: '/favicon.png',
      //custom data used when handling the event in the notification (click or others)
      data: {
        tag: payload.tag, // allows us to identify notification
        clickActionUrl: self.location.origin + (payload.clickUrl ? payload.clickUrl : '/announcements'),
      },
      // notification action button
      actions: [
        {
          //action label
          action: 'explore',
          // action title
          title: 'Go to the site'
        },
        {
          //action label
          action: 'close',
          // action title
          title: 'No thank you'
        }
      ],
      // tag used to replace any simmilar notif
      tag: payload.tag? payload.tag: null 
    }
  
    // wait until notification displayed
    event.waitUntil(self.registration.showNotification(title, options))
  })