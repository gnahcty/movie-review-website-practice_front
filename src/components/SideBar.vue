<template>
  <q-list>
    <!-- 使用者資訊 -->
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
        <q-item-label v-if="!isLogin">
          <q-btn outline color="green" size="xs" label="Login" class="q-ml-md" @click="tab = 'login'" />
          <q-btn outline style="color: goldenrod;" size="xs" label="Sign Up" class="q-ml-xs" @click="tab = 'register'" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <!-- menu -->
    <q-item class="lt-md">
      <form class="w100">
        <!-- search bar -->
        <q-input rounded outlined v-model="search" placeholder="search movie">
          <template v-slot:after>
            <q-btn type="submit" flat round icon="search" @click="SearchMovie" />
          </template>
        </q-input>
      </form>
    </q-item>
    <!-- menu items -->
    <template v-for="(menuItem, index) in props.menuList" :key="index">
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
      <!-- logout -->
      <q-item-section>
        Logout
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useUserStore } from 'stores/user.js'
import { useRouteQuery } from '@vueuse/router'
import { apiAuth } from 'boot/axios.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()
const { isLogin } = storeToRefs(user)
const $q = useQuasar()
const tab = useRouteQuery('tab', '')

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const search = ref('')

const SearchMovie = () => {
  if (search.value !== '') {
    router.push(`/search/${search.value}`)
  }
  search.value = ''
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
</script>
