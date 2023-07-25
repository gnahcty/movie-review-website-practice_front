<template>
  <div class="q-pa-md flex flex-center">
    <div class="row">
      <div class="col-3 flex flex-center" v-for="(film) in films" :key="film.id">
        <FilmCard v-bind="film"></FilmCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api, apiAuth } from 'boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from 'components/FilmCard.vue'

const route = useRoute()
const films = ref([])

const searchMovie = async () => {
  try {
    const { data } = await api.get('/films/search/' + route.params.title)
    const results = data.results.results
    const withUserReview = await apiAuth.post('/reviews/user', [...results])
    films.value.push(...withUserReview.data.films)
  } catch (error) {
    console.log(error)
  }
}

searchMovie()
</script>
