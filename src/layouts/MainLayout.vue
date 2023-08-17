<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="text-black" style="height: 10%;" :style="{ background: colors[headerColor] }">
      <q-toolbar class="fit">
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link to="/">
            <img style="height: 6vh;"
              src="https://cdn.discordapp.com/attachments/1109403221245571167/1140443471002488943/5a3fc2d4e5a78829.png">
          </router-link>
        </q-toolbar-title>
        <!-- <q-space /> -->
        <form class="gt-sm">
          <q-input rounded standout="bg-black" bg-color="white" v-model="search" placeholder="search movie"
            style="width:30vw" class="q-ml-xl ">
            <template v-slot:after>
              <q-btn type="submit" flat round icon="search" @click="SearchMovie" />
            </template>
          </q-input>
        </form>
        <q-space />
        <q-btn flat round icon="format_list_bulleted" to="/lists">
          <q-tooltip>Lists</q-tooltip>
        </q-btn>
        <q-btn flat round icon="fa-solid fa-ranking-star" class="q-ma-lg" to="/users">
          <q-tooltip>Popular User</q-tooltip>
        </q-btn>
        <q-btn flat round icon="face_2" :to="user.isLogin ? `/profile/${user.username}/recent` : '?tab=login'">
          <q-tooltip>Profile</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="desktop" elevated>
      <q-scroll-area class="fit">
        <SideBar :menuList="menuList"></SideBar>
      </q-scroll-area>
    </q-drawer>

    <q-page-container :style="pt">
      <router-view :key="$route.fullPath" @fullpage-scroll="onFullPageScroll" />
    </q-page-container>
    <LoginModal></LoginModal>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from 'stores/user.js'
import LoginModal from 'src/components/LoginModal.vue'
import SideBar from 'src/components/SideBar.vue'

const leftDrawerOpen = ref(false)
const search = ref('')
const user = useUserStore()
const route = useRoute()
const router = useRouter()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const menuList = [
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  // { to: '/reviews', label: 'Reviews', icon: 'reviews' },
  // { to: '/diary', label: 'Diary', icon: 'import_contacts' },
  { to: '/watchlist', label: 'watchlist', icon: 'more_time' },
  { to: '/profile/likes', label: 'Likes', icon: 'favorite' },
  { to: '/settings', label: 'Settings', icon: 'settings' }
]

const SearchMovie = () => {
  if (search.value !== '') {
    router.push(`/search/${search.value}`)
  }
  search.value = ''
}

const pt = computed(() => {
  if (route.meta.fullpage) {
    return 'padding-top:0 !important;'
  } else {
    return ''
  }
}
)

const colors = ['#ffe500', '#000', '#f00']
const headerColor = ref(0)
const onFullPageScroll = (destination) => {
  // console.log(destination)
  headerColor.value = destination
}
</script>
