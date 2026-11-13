self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { body: event.data ? event.data.text() : '' };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Maya Garments', {
      body: data.body || 'নতুন নোট এসেছে',
      data: { url: data.url || './order-new.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = new URL(
    event.notification.data?.url || './order-new.html',
    self.location.href
  ).href;
  event.waitUntil(clients.openWindow(url));
});
