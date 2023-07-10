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
        <q-btn flat round icon="face_2" to="/user">
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

            <q-item-section>
              <q-item-label class="text-h5 q-pl-lg">User Name</q-item-label>
              <q-item-label >
                <q-btn outline color="green" size="xs" label="Login" class="q-ml-md" to="/register" />
                <q-btn outline style="color: goldenrod;" size="xs" label="Sign Up" class="q-ml-xs" to="/register" />
              </q-item-label>
            </q-item-section>
          </q-item>
            <template v-for="(menuItem, index) in menuList" :key="index" >
              <q-item clickable v-ripple :to="menuItem.to"  class="q-pl-lg">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const menuList = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  { to: '/reviews', label: 'Reviews', icon: 'reviews' },
  { to: '/user/diary', label: 'Diary', icon: 'import_contacts' },
  { to: '/user/watchlist', label: 'watchlist', icon: 'more_time' },
  { to: '/user/likes', label: 'Likes', icon: 'favorite' },
  { to: 'user/settings', label: 'Settings', icon: 'settings' }
]

</script>
