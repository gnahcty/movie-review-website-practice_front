<template>
  <div padding class="row justify-center q-pt-xl">
    <div class="col-12 col-md-8 row">
      <div class=" col-12 col-md-8 q-px-md">

        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="watchlist">
            <div class="titles ">Watchlist</div>
            <div class=" q-mb-md">Your films to be watched. </div>
            <div class="row q-col-gutter-md">
              <div class="col-6 col-md-4 col-lg-3 " v-for="(film, i) in CurrentUser.watchList" :key="i">
                <RouterLink :to="'/films/' + film.id">
                  <q-img :ratio="3 / 4" :src="'https://image.tmdb.org/t/p/w300/' + film.poster" class="rounded15 border5">
                    <q-tooltip anchor="center middle" self="top middle">{{ film.title }}</q-tooltip>
                  </q-img>
                </RouterLink>
              </div>
            </div>
          </q-tab-panel>

          <template v-for="(list, i) in CurrentUser.userLists" :key="i">
            <q-tab-panel :name="list.name">
              <div class="titles">{{ list.name }}</div>
              <div class=" q-mb-md flex justify-between">
                <span>{{ list.description || 'No description' }}</span>
                <span> <q-icon name="favorite" /> {{ list.likes.length }}</span>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-6 col-md-4 col-lg-3" v-for="(film, i) in list.films" :key="i">
                  <RouterLink :to="'/films/' + film.id">
                    <q-img :ratio="3 / 4" :src="'https://image.tmdb.org/t/p/w300/' + film.poster"
                      class="rounded15 border5">
                      <q-tooltip anchor="center middle" self="top middle">{{ film.title }}</q-tooltip>
                    </q-img>
                  </RouterLink>
                </div>
              </div>
            </q-tab-panel>
          </template>

        </q-tab-panels>
      </div>
      <div class=" col-12 col-md-4 q-pa-xl">
        <q-tabs v-model="tab" vertical>
          <q-tab name="watchlist" label="watchlist" />
          <template v-for="(list, i) in CurrentUser.userLists" :key="i">
            <q-tab :name="list.name" :label="list.name" />
          </template>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiAuth } from 'src/boot/axios'
import { useUserStore } from 'stores/user.js'
import { useGeneralStore } from 'stores/general.js'
const state = useGeneralStore()
const CurrentUser = useUserStore()
const tab = ref('watchlist')
const getUserLists = async () => {
  try {
    const { data } = await apiAuth.get('lists/user')
    if (CurrentUser.userLists) {
      CurrentUser.userLists = data.UserLists
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await getUserLists()
  state.isLoading = false
})
</script>
