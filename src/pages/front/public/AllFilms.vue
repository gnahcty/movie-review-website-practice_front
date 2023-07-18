<template>
  <div class="q-pa-md">
      <q-btn-group spread flat class="q-ma-md">
        <q-btn-dropdown flat :label=params.year>
          <q-list>
            <q-item clickable v-close-popup v-for="(year,i) in years" :key="i" @click="setYear(year)" >
              <q-item-section>
                <q-item-label>{{year}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown flat :label="(params.rating|| 'ratings')">
          <q-list>
            <q-item clickable v-close-popup v-for="i in 5" :key="i" @click="setRating(i)" >
              <q-item-section>
                <q-item-label>{{i}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn label="Second" />
      </q-btn-group>

    <div class="row">
      <div class="col-3 flex flex-center" v-for="(film) in films" :key="film.id">
        <FilmCard v-bind="film"></FilmCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from 'boot/axios'
import { computed, reactive } from 'vue'
import FilmCard from 'components/FilmCard.vue'
const films = reactive([])
const params = reactive({
  region: 'TW',
  year: 2023,
  rating: ''
})
const getFilms = async () => {
  try {
    const { data } = await api.get('/films/allFilms',
      { params })
    const results = data.results.results
    films.push(...results)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

const years = computed(() => {
  const arr = []
  for (let i = 2023; i > 1990; i--) {
    arr.push(i)
  }
  return arr
})

const setYear = (year) => {
  params.year = year
}
const setRating = (i) => {
  params.rating = i
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
