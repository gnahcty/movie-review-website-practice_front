import { boot } from 'quasar/wrappers'
import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

export default boot(({ app }) => {
  app.use(VueFullPage)
})
