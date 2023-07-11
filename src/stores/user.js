import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { apiAuth } from '../boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const admin = ref(false)

  const login = (data) => {
    token.value = data.token
    account.value = data.account
    email.value = data.email
    admin.value = data.admin
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  // const isAdmin = computed(() => {
  //   return role.value === UserRole.ADMIN
  // })

  // const avatar = computed(() => {
  //   return `https://source.boringavatars.com/beam/120/${account.value}?colors=0db2ac,f5dd7e,fc8d4d,fc694d,faba32`
  // })

  // const getProfile = async () => {
  //   if (token.value.length === 0) return
  //   try {
  //     const { data } = await apiAuth.get('/users/me')
  //     account.value = data.result.account
  //     email.value = data.result.email
  //     admin.value = data.admin
  //   } catch (error) {
  //     token.value = ''
  //   }
  // }

  const logout = () => {
    token.value = ''
    account.value = ''
    email.value = ''
    admin.value = false
  }

  return {
    token,
    account,
    email,
    login,
    isLogin,
    // getProfile,
    logout
  }
}, {
  persist: {
    key: 'project',
    paths: ['token']
  }
})
