<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3" v-for="(film) in films" :key="film.id">
        <FilmCard v-bind="film"></FilmCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from '../../../boot/axios'
import { reactive } from 'vue'
import FilmCard from '../../../components/FilmCard.vue'
const films = reactive([])

const getFilms = async () => {
  try {
    const { data } = await api.get('/films/allFilms')
    const results = data.results.results
    films.push(...results)
  } catch (error) {
    console.log(error)
  }
}

getFilms()

</script>

<style>
.my-card{
  width:200px;
  border: none;
}
span{
  margin-right: 5px;
  margin-right: 0px;
}
#add:hover{
  color: white;
}
</style>
