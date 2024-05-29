<template>
  <q-layout view="lhh lpR fFf" :style="hStyle">
    <q-header class="column text-black" id="header" style="background: transparent;">
      <q-toolbar class="col-2">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-scroll-area class="fit">
        <SideBar :menuList="menuList"></SideBar>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="row col-8 justify-center">
        <div class="col-md-8 col-12 row items-center" id="profile">
          <div class="col-12 col-sm-6">
            <q-item class="row">
              <q-item-section avatar class="col-5">
                <router-link :to="`/profile/${profile.username}/recent`">
                  <img class="round q-pa-lg" style="width: 100%;" :src=profile.avatar>
                </router-link>
              </q-item-section>
              <q-item-section>
                <q-item-label style="font-weight: 800;" class="title2 text-bold">{{ profile.username }}</q-item-label>
                <q-item-label style="margin-top: 10px !important;" v-if="CurrentUser.username !== profile.username">
                  <q-btn unelevated class="text-black" :label="!followed ? 'follow' : 'followed'"
                    :color="!followed ? 'white' : 'light-green-14'" @click="follow()" /></q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12  col-sm-6 row q-xs-pb-lg ">
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
      <router-view />
    </q-page-container>
    <LoginModal></LoginModal>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, computed, onMounted } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useUserStore } from 'stores/user'
import SideBar from 'src/components/SideBar.vue'
import LoginModal from 'src/components/LoginModal.vue'

const CurrentUser = useUserStore()
const route = useRoute()
const profile = reactive({})
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const hStyle = computed(() => {
  return `background-color: ${route.meta.bg}`
})

const menuList = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/lists', label: 'Lists', icon: 'format_list_bulleted' },
  { to: '/users', label: 'Popular User', icon: 'fa-solid fa-ranking-star' },
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  { to: '/watchlist', label: 'watchlist', icon: 'more_time' },
  { to: `/profile/${CurrentUser.username}/likes`, label: 'Likes', icon: 'favorite' }
  // { to: '/settings', label: 'Settings', icon: 'settings' }
]

const followed = computed(() => {
  return profile.followers?.some(follower => follower._id === CurrentUser._id)
})

const follow = async () => {
  await apiAuth.post('users/follow', { username: profile.username })
  getRecent()
}

const getRecent = async () => {
  const { data } = await api.get('/profile/recent/' + route.params.username)
  Object.assign(profile, data.result.profile)
}
onMounted(() => {
  getRecent()
})

</script>

<style scoped>
/* #header {
  height: 40vh;
  transition-duration: 0.5s !important;
} */

#profile {
  border-bottom: 4px solid #000;
}

:deep(.q-tab__label) {
  font-size: 2rem !important;
}
</style>
