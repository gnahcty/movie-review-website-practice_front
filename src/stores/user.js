import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiAuth } from '../boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const _id = ref('')
  const token = ref('')
  const username = ref('')
  const email = ref('')
  const admin = ref(false)
  const following = ref([])
  const followers = ref([])
  const watchList = ref([])
  const avatar = ref('')
  const userLists = ref([])
  const watched = ref('')
  const reviewed = ref('')

  const login = (data) => {
    _id.value = data._id
    token.value = data.token
    username.value = data.username
    email.value = data.email
    admin.value = data.admin
    avatar.value = data.avatar
    following.value = data.following
    followers.value = data.followers
    watchList.value = data.watchList
    watched.value = data.watched
    reviewed.value = data.reviewed
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return admin.value === 1
  })

  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/profile')
      _id.value = data.result._id
      username.value = data.result.username
      email.value = data.result.email
      admin.value = data.result.admin
      avatar.value = data.result.avatar
      following.value = data.result.following
      followers.value = data.result.followers
      watchList.value = data.result.watchList
      watched.value = data.result.watched
      reviewed.value = data.result.reviewed
    } catch (error) {
      token.value = ''
    }
  }

  const logout = () => {
    _id.value = ''
    token.value = ''
    username.value = ''
    email.value = ''
    admin.value = 0
    avatar.value = ''
    following.value = []
    followers.value = []
    watchList.value = []
  }

  return {
    _id,
    token,
    username,
    email,
    following,
    followers,
    avatar,
    userLists,
    watchList,
    watched,
    reviewed,
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
