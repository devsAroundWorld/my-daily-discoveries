const useNotification = () => {
  const showNotification = (title: string, message: string) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
        })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, {
              body: message,
            })
          }
        })
      }
    }
  }

  return {
    showNotification,
  }
}

export default useNotification
