import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiAuth } from '../boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const username = ref('')
  const email = ref('')
  const admin = ref(false)
  const following = ref([])
  const followers = ref([])
  const watchlist = ref([])

  const login = (data) => {
    token.value = data.token
    username.value = data.username
    email.value = data.email
    admin.value = data.admin
    following.value = data.following
    followers.value = data.followers
    watchlist.value = data.watchlist
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return admin.value === 1
  })

  // const avatar = computed(() => {
  //   return `https://source.boringavatars.com/beam/120/${username.value}?colors=0db2ac,f5dd7e,fc8d4d,fc694d,faba32`
  // })

  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/profile')
      username.value = data.result.username
      email.value = data.result.email
      admin.value = data.admin
    } catch (error) {
      token.value = ''
    }
  }

  const logout = () => {
    token.value = ''
    username.value = ''
    email.value = ''
    admin.value = 0
  }

  return {
    token,
    username,
    email,
    login,
    isLogin,
    isAdmin,
    getProfile,
    logout
  }
}, {
  persist: {
    key: 'project',
    paths: ['token']
  }
})
