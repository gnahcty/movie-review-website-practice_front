<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn flat round icon="menu" @click = "toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-btn to="/" size="xl" flat rounded color="primary" icon="img:https://stickershop.line-scdn.net/stickershop/v1/sticker/563671934/android/sticker.png?v=1" label="Title" />
        </q-toolbar-title>
        <q-btn flat round icon="format_list_bulleted" to="/lists" >
          <q-tooltip>Lists</q-tooltip>
        </q-btn>
        <q-btn flat round icon="fa-solid fa-ranking-star" class="q-ma-lg" to="/users">
          <q-tooltip>Popular User</q-tooltip>
        </q-btn>
        <q-btn flat round icon="face_2" to="/profile">
          <q-tooltip>User</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="desktop" elevated>
      <q-scroll-area class="fit">
        <q-list>
          <q-item style="height:150px;">
            <q-item-section avatar style="width:80px;">
              <q-avatar style="width:80px;height: 100%">
                <img src="https://source.boringavatars.com/beam/120/Annie%20Jump?colors=264653,2a9d8f,e9c46a,f4a261,e76f51">
              </q-avatar>
            </q-item-section>
<!-- TODO: 登入後把login signup改成 watched films -->
            <q-item-section>
              <q-item-label class="text-h5 q-pl-lg q-pb-sm">{{user.username || 'Guest User'}}</q-item-label>
              <q-item-label v-if="!isLogin">
                <q-btn outline color="green" size="xs" label="Login" class="q-ml-md" @click="open('login')" />
                <q-btn outline style="color: goldenrod;" size="xs" label="Sign Up" class="q-ml-xs" @click="open('register')" />
              </q-item-label>
            </q-item-section>
          </q-item>
            <template v-for="(menuItem, index) in menuList" :key="index" >
              <q-item clickable v-ripple :to="menuItem.to" class="q-pl-lg">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
            <q-item clickable v-ripple v-if="isLogin" class="q-pl-lg" @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="loginModal">
      <q-card style="width: 400px;">
        <q-tabs
            v-model="tab"
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify"
          >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated >
          <!-- 燈入頁面 -->
          <q-tab-panel name="login" class="q-px-xl flex-center">
            <q-form
              @submit="loginSubmit"
            >
              <div class="row">
                <q-input label="Username" v-model="form.username" :rules="[rules.isString, rules.required, rules.min4, rules.max10]"  lazy-rules class="col">
                </q-input>
              </div>
              <div class="row">
                <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password" :rules="[rules.isString, rules.required, rules.min4, rules.max20]"  lazy-rules>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="row flex-center">
                <q-btn outline label="submit" type="submit" class="q-mt-md"/>
              </div>
            </q-form>
          </q-tab-panel>
          <!-- 註冊頁面  -->
          <q-tab-panel name="register" class="q-px-xl flex-center" >
            <q-form
              @submit="regSubmit"
            >
          <div class="row">
            <q-input label="Username" v-model="form.username" :rules="[rules.isString, rules.required, rules.min4, rules.max10]"  lazy-rules class="col">
            </q-input>
          </div>
          <div class="row">
            <q-input type="email" label="email" class="col" v-model="form.email" :rules="[rules.isString, rules.required, rules.isEmail]"  lazy-rules>
            </q-input>
          </div>
          <div class="row">
            <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password" :rules="[rules.isString, rules.required, rules.min4, rules.max20]"  lazy-rules>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input :type="isPwd ? 'password' : 'text'" label="Confirm Password" class="col" v-model="form.confirmPassword" :rules="[rules.required, rules.confirmPassword]" reactive-rules>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row flex-center">
            <q-btn outline label="submit" type="submit" class="q-mt-md"/>
          </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive, watch } from 'vue'
import validator from 'validator'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'
import { api, apiAuth } from '../boot/axios.js'

const leftDrawerOpen = ref(false)
const loginModal = ref(false)
const tab = ref('login')
const isPwd = ref(true)
const router = useRouter()
const user = useUserStore()
const $q = useQuasar()
const route = useRoute()
const { isLogin } = storeToRefs(user)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const open = (tabName) => {
  loginModal.value = !loginModal.value
  tab.value = tabName
}

const menuList = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  { to: '/reviews', label: 'Reviews', icon: 'reviews' },
  { to: '/diary', label: 'Diary', icon: 'import_contacts' },
  { to: '/watchlist', label: 'watchlist', icon: 'more_time' },
  { to: '/likes', label: 'Likes', icon: 'favorite' },
  { to: '/settings', label: 'Settings', icon: 'settings' }
]

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  isString: val => typeof val === 'string' || 'invalid',
  required: val => !!val || 'required',
  min4: val => val.length >= 4 || 'at least 4 characters',
  max10: val => val.length <= 10 || 'at most 10 characters',
  max20: val => val.length <= 20 || 'at most 20 characters',
  isEmail: val => validator.isEmail(val) || 'not a valid email',
  confirmPassword: val => val === form.password || 'passwords do not match'
}

const regSubmit = async (e) => {
  try {
    const { data } = await api.post('s', {
      username: form.username,
      email: form.email,
      password: form.password
    })
    // TODO: 改要存在store的資料
    user.login({
      token: data.result.token,
      username: data.result.username,
      email: data.result.email,
      admin: data.result.admin
    })
    $q.notify({
      position: 'top-right',
      color: 'green-4',
      textColor: 'white',
      icon: 'done',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Success!'
    })
  } catch (error) {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'error'
    })
  }
}

const loginSubmit = async (e) => {
  try {
    const { data } = await api.post('/users/login', {
      username: form.username,
      password: form.password
    })
    // TODO: 改要存在store的資料
    user.login({
      token: data.result.token,
      username: data.result.username,
      email: data.result.email,
      admin: data.result.admin
    })
    $q.notify({
      position: 'top-right',
      color: 'green-4',
      textColor: 'white',
      icon: 'done',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Success!'
    })
    loginModal.value = false
    // TODO: 導向profile?
    router.push('/')
  } catch (error) {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: error.response.data.message
    })
  }
}

const logout = async () => {
  try {
    await apiAuth.delete('users/logout')
    user.logout()
    $q.notify({
      position: 'top-right',
      color: 'green-4',
      textColor: 'white',
      icon: 'done',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'See You!'
    })
    router.push('/')
  } catch (error) {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: error.response.data.message
    })
  }
}

watch(() => route.query, () => {
  if ('login' in route.query) open('login')
  else if ('register' in route.query) open('register')
})

watch(() => loginModal.value, () => {
  if (loginModal.value === false) {
    router.replace({ query: null })
  }
})
</script>

<style scoped>
.q-notification{
  opacity: 0.7;
  width: 20rem;
}
.q-notifications__list--top {
    top: 7rem !important;
}

.q-notification__message{
  padding-left: 25px;
}
</style>
