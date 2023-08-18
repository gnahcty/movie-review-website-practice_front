import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // Set default values for warning type notification

  Notify.registerType('warnings', {
    type: 'warnings',
    group: false,
    timeout: 1500,
    position: 'top-right',
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: 'Something went wrong',
    classes: 'warnings',
    actions: [
      { icon: 'close', color: 'white', round: true }
    ]
  })

  Notify.registerType('success', {
    type: 'success',
    group: false,
    timeout: 1500,
    position: 'top-right',
    color: 'green-4',
    textColor: 'white',
    icon: 'done',
    message: 'Success!',
    classes: 'success',
    actions: [
      { icon: 'close', color: 'white', round: true }
    ]
  })
})
