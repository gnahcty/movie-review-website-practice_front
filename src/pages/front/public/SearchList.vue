<template>
  <div class="row justify-center">
    <div class="col-8">
      <q-infinite-scroll @load="onLoad" :offset="250">
        <div class="row">
          <div class="col-6 col-sm-6 col-md-4  col-lg-3 flex flex-center" v-for="(film) in films" :key="film.id"
            style="align-content: flex-start; ">
            <FilmCard v-bind="film"></FilmCard>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script setup>
import { api, apiAuth } from 'boot/axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGeneralStore } from 'stores/general.js'
const state = useGeneralStore()
import FilmCard from 'components/FilmCard.vue'

const route = useRoute()
const films = ref([])
const page = ref(1)

const searchMovie = async () => {
  try {
    const { data } = await api.post('/films/search/', { title: route.params.title, page: page.value })
    const results = data.results.results
    const withUserReview = await apiAuth.post('/reviews/user', [...results])
    films.value.push(...withUserReview.data.films)
  } catch (error) {
    console.log(error)
  }
}
const onLoad = (index, done) => {
  setTimeout(() => {
    page.value++
    searchMovie()
    done()
  }, 1000)
}
onMounted(async () => {
  await searchMovie()
  state.isLoading = false
})
</script>
