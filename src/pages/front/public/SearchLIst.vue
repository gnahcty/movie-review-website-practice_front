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
import { api } from 'boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from 'components/FilmCard.vue'

const route = useRoute()
const films = ref([])

const searchMovie = async () => {
  try {
    console.log(route.params.title)
    const { data } = await api.get('/films/search/' + route.params.title)
    const results = data.results.results
    films.value.push(...results)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

searchMovie()
</script>
