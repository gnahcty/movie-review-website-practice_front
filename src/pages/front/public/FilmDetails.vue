<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3">
        <q-img fil="cover" scale="3/4" :src="'http://image.tmdb.org/t/p/w185/' + film.poster">
          </q-img>
      </div>
      <div class="col-6">
        <h2>{{ film.title }}</h2>
        <p>{{ film.overview }}</p>
        <p>{{ film.director }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from '../../../boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const film = ref({
  id: 0,
  title: '',
  poster: '',
  overview: '',
  director: []
})
const getDetails = async () => {
  try {
    const { data } = await api.get('/films/' + route.params.id)
    film.value.id = data.results.id
    film.value.title = data.results.title
    film.value.poster = data.results.poster_path
    film.value.overview = data.results.overview
    const dirList = await getCrew(film.value.id, 'Director')
    // console.log(dirList)
    for (const dir of dirList) {
      console.log(dir)
      film.value.director.push(dir.name)
    }
  } catch (error) {
    console.log(error)
  }
}

const getCrew = async (id, job) => {
  try {
    const { data } = await api.get('/films/' + id + '/crew')
    return data.results.crew.filter((member) => member.job === job)
  } catch (error) {
    console.log(error)
  }
}

getDetails()
</script>
