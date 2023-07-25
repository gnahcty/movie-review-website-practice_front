<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3">
        <q-card class="my-card">
          <q-img fil="cover" scale="3/4" :src="'http://image.tmdb.org/t/p/w300/' + film.poster"/>
            <q-card-actions align="center">
              <q-rating
          v-model="rating"
          max="5"
          size="3em"
          color="orange"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
        />
        </q-card-actions>
          <q-card-actions align="center">
          <q-btn flat round :color="film.watched ? 'green' : 'grey'" icon="visibility" @click="seen()"/>
          <q-btn flat round :color="film.like ? 'red' : 'grey'" icon="favorite" @click="like()"/>
          <q-btn flat round :color="inWatchList ? 'yellow' : 'grey'" icon="more_time" @click="watchList"/>
        </q-card-actions>
        </q-card>
      </div>
      <div class="col-6 q-px-md">
        <h2>{{ film.title }}</h2>
        <p>{{ film.overview }}</p>
        <p>Director: {{ film.director }}</p>
        <q-separator />
        <div class="text-center q-ma-md">
          <q-editor v-model="editor" min-height="5rem" :toolbar="[
        ['bold', 'italic', 'strike', 'underline']]" />
        <q-btn label="submit" @click="submitReview" class="q-ma-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api, apiAuth } from 'src/boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const rating = ref(2.5)

const film = ref({
  id: 0,
  title: '',
  poster: '',
  overview: '',
  director: '',
  watched: false,
  like: false,
  ratings: 0,
  comments: ''
})

const getDetails = async () => {
  try {
    const { data } = await api.get('/films/' + route.params.id)
    film.value.id = data.results.id
    film.value.title = data.results.title
    film.value.poster = data.results.poster_path
    film.value.overview = data.results.overview
    film.value.director = await getCrew(film.value.id, 'Director')
  } catch (error) {
    console.log(error)
  }
}

const getCrew = async (id, job) => {
  try {
    const { data } = await api.get('/films/' + id + '/crew')
    const list = data.results.crew.filter((member) => member.job === job)
    return getNames(list)
  } catch (error) {
    console.log(error)
  }
}

const getNames = (list) => {
  const nameArr = []
  for (const person of list) {
    nameArr.push(person.name)
  }
  return nameArr.join()
}

const getUserReview = async () => {
  const { data } = await apiAuth.get('/reviews/user/' + route.params.id)
  console.log(data)
  film.value.like = data.result.like
  film.value.ratings = data.result.ratings
  film.value.watched = data.result.watched
  film.value.comments = data.result.comments
}

getDetails()
getUserReview()
</script>
