export default {
  install: (app) => {
    const toast = {
      log: (message) => {
        setTimeout(() => {
          try {
            window.toast.log(message)
          } catch (err) {
            console.log(err)
          }
        })
      },
      warn: (message) => {
        setTimeout(() => {
          try {
            window.toast.warn(message)
          } catch (err) {
            console.log(err)
          }
        })
      },
      error: ({ message = 'Failed!', error = { message: '' } }) => {
        setTimeout(() => {
          try {
            window.toast.error(message + ' ' + error.message)
          } catch (err) {
            console.log(err)
          }
        })
      },
      success: (message) => {
        setTimeout(() => {
          try {
            window.toast.success(message)
          } catch (err) {
            console.log(err)
          }
        })
      },
    }

    app.config.globalProperties.$toast = toast
  },
}
