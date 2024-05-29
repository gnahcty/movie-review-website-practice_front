<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="text-black" style="height: 10%;" :style="{ background: colors[headerColor] }">
      <q-toolbar class="h100 flex items-center">
        <!-- menu btn -->
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" />
        <!-- menu btn -->
        <!-- logo -->
        <router-link to="/">
          <img style="height: 6vh;" src="https://github.com/gnahcty/pics/blob/main/filmory/IMG_7952.PNG?raw=true">
        </router-link>
        <!-- logo -->

        <q-space />
        <!-- searchbar -->
        <form class="gt-sm">
          <q-input rounded standout="bg-black" bg-color="white" v-model="search" placeholder="search movie"
            style="width:30vw">
            <template v-slot:after>
              <q-btn type="submit" flat round icon="search" @click="SearchMovie" />
            </template>
          </q-input>
        </form>
        <!-- searchbar -->

        <q-space />
        <!-- links to other pages -->
        <q-btn flat round icon="format_list_bulleted" to="/lists" class="gt-xs">
          <q-tooltip>Lists</q-tooltip>
        </q-btn>
        <q-btn flat round icon="fa-solid fa-ranking-star" class="q-ma-lg gt-xs" to="/users">
          <q-tooltip>Popular User</q-tooltip>
        </q-btn>
        <q-btn flat round icon="face_2"
          :to="CurrentUser.isLogin ? `/profile/${CurrentUser.username}/recent` : '?tab=login'">
          <q-tooltip>Profile</q-tooltip>
        </q-btn>
        <!-- links to other pages -->

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="desktop" elevated>
      <q-scroll-area class="fit">
        <SideBar :menuList="menuList"></SideBar>
      </q-scroll-area>
    </q-drawer>

    <q-page-container :style="pt">
      <Transition name="round" enter-from-class="round-enter-from" enter-active-class="round-enter-active"
        enter-to-class="round-enter-to" leave-from-class="round-leave-from" leave-active-class="round-leave-active"
        leave-to-class="round-leave-to">
        <div v-show="state.isLoading" class="w100 bg-black text-white flex flex-center" id="loadingPage"
          style="height:100vh">
          <img src="https://github.com/gnahcty/pics/blob/main/filmory/1709543803577.gif?raw=true" style="height:80%">
        </div>
      </Transition>
      <router-view v-show="!state.isLoading" :key="$route.fullPath" @fullpage-scroll="onFullPageScroll" />
    </q-page-container>
    <LoginModal></LoginModal>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from 'stores/user.js'
import { useGeneralStore } from 'stores/general.js'
import LoginModal from 'src/components/LoginModal.vue'
import SideBar from 'src/components/SideBar.vue'

const leftDrawerOpen = ref(false)
const search = ref('')
const state = useGeneralStore()
const CurrentUser = useUserStore()
const route = useRoute()
const router = useRouter()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const menuList = [
  { to: '/films', label: 'Films', icon: 'fa-solid fa-film' },
  { to: '/watchlist', label: 'watchlist', icon: 'more_time' },
  { to: `/profile/${CurrentUser.username}/likes`, label: 'Likes', icon: 'favorite' },
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

const colors = ['transparent', '#ffe500', '#ffe500', '#ffe500']
const headerColor = ref(1)
const onFullPageScroll = (destination) => {
  headerColor.value = destination
}
</script>

<style scoped>
#loadingPage {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
}

.round-enter-active {
  animation-duration: 0.5s
}

.round-leave-active {
  transition-delay: 1.5s;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out
}

.round-enter-from,
.round-enter-to {
  animation-name: round-in;
  animation-fill-mode: forwards
}

@keyframes round-in {
  0% {
    clip-path: circle(3% at 46% -50%);
    animation-timing-function: cubic-bezier(0.005, 0.920, 0.060, 0.99)
  }

  40% {
    clip-path: circle(3% at 50% 50%);
    animation-timing-function: cubic-bezier(0.630, -0.170, 0.140, 0.980)
  }

  100% {
    clip-path: circle(70.7% at 50% 50%)
  }
}

.round-leave-from {
  clip-path: circle(70.7% at 50% 50%)
}

.round-leave-to {
  clip-path: circle(40% at 140% 140%)
}
</style>
