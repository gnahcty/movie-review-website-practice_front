<template>
  <q-layout view="lhh lpR fFf" :style="hStyle">
    <q-header class="column text-black" id="header" style="background: transparent;">
      <q-toolbar class="col-2">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="row col-8 justify-center">
        <div class="col-md-8 col-12 row items-center" id="profile">
          <div class="col-12 col-md-6">
            <q-item class="row">
              <q-item-section avatar class="col-5">
                <router-link :to="`/profile/${profile.username}/recent`">
                  <img class="round q-pa-lg" style="width: 100%;" :src=profile.avatar>
                </router-link>
              </q-item-section>
              <q-item-section>
                <q-item-label style="font-weight: 800;" class="title2 text-bold">{{ profile.username }}</q-item-label>
                <q-item-label style="margin-top: 10px !important;" v-if="user.username !== profile.username">
                  <q-btn color="white" label="follow" class="text-black" @click="follow()" /></q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12  col-md-6 row">
            <div class="col column text-center"> <span class="text-bold text-h6">{{ profile.watched
            }}</span><span>films</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">{{ profile.reviewed
            }}</span><span>reviews</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">{{ profile.followers?.length
            }}</span><span>followers</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">{{ profile.following?.length
            }}</span><span>following</span></div>
          </div>
        </div>
      </div>
      <div class="col row justify-center">
        <div class="col-md-8 col-12 row items-center">
          <q-tabs align="left" indicator-color="transparent" class="q-mt-md col-2 row window-width">
            <q-route-tab to="recent" label="recent" class="col-sm col-md-3 q-py-sm"
              style="background-color: #ffe500 ; opacity: 1 ;" />
            <q-route-tab to="likes" label="favorites" class="col-sm col-md-3 q-py-sm"
              style="background-color:#00e0ff ; opacity: 1 ;" />
          </q-tabs>
        </div>
      </div>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="desktop" elevated>
      <q-scroll-area class="fit">
        <q-list>
          <q-item style="height:150px;">
            <q-item-section avatar style="width:80px;">
              <router-link :to="`/profile/${user.username}/recent`">
                <q-avatar style="width:80px;height: 100%">
                  <img
                    :src="(user.avatar || 'https://source.boringavatars.com/beam/120/Annie%20Jump?colors=264653,2a9d8f,e9c46a,f4a261,e76f51')">
                </q-avatar>
              </router-link>
            </q-item-section>
            <!-- TODO: 登入後把login signup改成 watched films -->
            <q-item-section>
              <q-item-label class="text-h5 q-pl-lg q-pb-sm">{{ user.username || 'Guest User' }}</q-item-label>
              <q-item-label v-if="!user.isLogin">
                <q-btn outline color="green" size="xs" label="Login" class="q-ml-md" @click="tab = 'login'" />
                <q-btn outline style="color: goldenrod;" size="xs" label="Sign Up" class="q-ml-xs"
                  @click="tab = 'register'" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="lt-md">
            <form class="w100">
              <q-input rounded outlined v-model="search" placeholder="search movie">
                <template v-slot:after>
                  <q-btn type="submit" flat round icon="search" @click="SearchMovie" />
                </template>
              </q-input>
            </form>
          </q-item>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable v-ripple :to="menuItem.to" class="q-pl-lg">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
          <q-item clickable v-ripple v-if="user.isLogin" class="q-pl-lg" @click="logout">
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

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useRouteQuery } from '@vueuse/router'
import { ref, reactive, computed, onMounted } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useUserStore } from 'stores/user'

const $q = useQuasar()
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const search = ref('')
const profile = reactive({})
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const tab = useRouteQuery('tab', '')

const hStyle = computed(() => {
  return `background-color: ${route.meta.bg}`
})

const SearchMovie = () => {
  if (search.value !== '') {
    router.push(`/search/${search.value}`)
  }
  search.value = ''
}

const menuList = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  { to: '/reviews', label: 'Reviews', icon: 'reviews' },
  { to: '/watchlist', label: 'watchlist', icon: 'more_time' }
]

const getRecent = async () => {
  const { data } = await api.get('/profile/recent/' + route.params.username)
  Object.assign(profile, data.result.profile)
}
onMounted(() => {
  getRecent()
})

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
</script>

<style scoped>
#header {
  height: 40vh;
  transition-duration: 0.5s !important;
}

#profile {
  border-bottom: 4px solid #000;
}

:deep(.q-tab__label) {
  font-size: 2rem !important;
}
</style>
