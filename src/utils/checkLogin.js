import { useUserStore } from 'stores/user'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

export const useLogin = () => {
  const route = useRoute()
  const router = useRouter()
  const $q = useQuasar()
  const currentUser = useUserStore()

  const checkLogin = (func) => {
    if (!currentUser.isLogin) {
      $q.notify({ type: 'warnings', message: 'Please login' })
      router.push(`${route.path}/?tab=login`)
    } else {
      func()
    }
  }

  const loginTryCatch = async (func) => {
    if (!currentUser.isLogin) {
      $q.notify({ type: 'warnings', message: 'Please login' })
      router.push(`${route.path}/?tab=login`)
    } else {
      try {
        await func()
      } catch (error) {
        console.log(error)
        $q.notify({ type: 'warnings', message: 'Something went wrong' })
      }
    }
  }

  return {
    checkLogin,
    loginTryCatch
  }
}
