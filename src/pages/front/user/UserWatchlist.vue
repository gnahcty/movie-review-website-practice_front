<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 90vh">

      <template v-slot:after>
        <q-tabs v-model="tab" vertical>
          <q-tab name="watchlist" label="watchlist" />
          <template v-for="(list, i) in user.userLists" :key="i">
            <q-tab :name="list.name" :label="list.name" />
          </template>
        </q-tabs>
      </template>

      <template v-slot:before>
        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="watchlist">
            <div class="text-h4 q-mb-md">Watchlist</div>
            <div class=" q-mb-md">Your films to be watched.</div>
            <div class="row q-col-gutter-md">
              <div class="col-3 " v-for="(film, i) in user.watchList" :key="i">
                <RouterLink :to="'/films/' + film.id">
                  <q-img :ratio="3 / 4" :src="'http://image.tmdb.org/t/p/w300/' + film.poster">
                    <q-tooltip anchor="center middle" self="top middle">{{ film.title }}</q-tooltip>
                  </q-img>
                </RouterLink>
              </div>
            </div>
          </q-tab-panel>

          <template v-for="(list, i) in user.userLists" :key="i">
            <q-tab-panel :name="list.name">
              <div class="text-h4 q-mb-md">{{ list.name }}</div>
              <div class=" q-mb-md">{{ list.description || 'No description' }}</div>
              <div class="row q-col-gutter-md">
                <div class="col-3 " v-for="(film, i) in list.films" :key="i">
                  <RouterLink :to="'/films/' + film.id">
                    <q-img :ratio="3 / 4" :src="'http://image.tmdb.org/t/p/w300/' + film.poster">
                      <q-tooltip anchor="center middle" self="top middle">{{ film.title }}</q-tooltip>
                    </q-img>
                  </RouterLink>
                </div>
              </div>
            </q-tab-panel>
          </template>

        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiAuth } from 'src/boot/axios'
import { useUserStore } from 'stores/user.js'
const user = useUserStore()
const tab = ref('watchlist')
const splitterModel = ref(85)
const getUserLists = async () => {
  try {
    const { data } = await apiAuth.get('lists/user')
    if (user.userLists) {
      user.userLists = data.UserLists
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(getUserLists)
</script>
