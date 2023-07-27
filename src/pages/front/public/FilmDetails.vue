<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3 flex flex-center">
        <q-card class="my-card" style="width: max-content;">
          <q-img fil="cover" scale="3/4" :src="'http://image.tmdb.org/t/p/w300/' + film.poster"/>
            <q-card-actions align="center">
              <q-rating
          v-model="film.ratings"
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
          <q-btn flat round :color="film.inWatchList ? 'blue' : 'grey'" icon="more_time" @click="addToWatchList()"/>
        </q-card-actions>
        </q-card>
      </div>
      <div class="col-6 q-px-md">
        <h2>{{ film.title }}</h2>
        <p>{{ film.overview }}</p>
        <p>Director: {{ film.director }}</p>
        <q-separator />
        <q-list>
          <q-item-label header>Comments</q-item-label>
            <template v-for="cmt in allReviews" :key="cmt.id">
              <FilmReview v-bind="cmt"></FilmReview>
            </template>
        </q-list>

        <div class="text-center q-ma-md" v-if="film.comments===''">
          <q-editor v-model="reviewEditor" min-height="5rem" placeholder="write something..." class="text-left"/>
        <q-btn label="submit" @click="submitReview" class="q-ma-sm" :disable="disableSubmit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api, apiAuth } from 'src/boot/axios'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import FilmReview from 'components/FilmReview.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const reviewEditor = ref('')
const film = reactive({
  id: '',
  title: '',
  poster: '',
  overview: '',
  director: '',
  watched: false,
  like: false,
  ratings: 0,
  comments: '',
  inWatchList: false
})
const allReviews = reactive([])

const getDetails = async () => {
  try {
    const { data } = await api.get('/films/' + route.params.id)
    film.id = data.results.id
    film.title = data.results.title
    film.poster = data.results.poster_path
    film.overview = data.results.overview
    film.director = await getCrew(film.id, 'Director')
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

const getReviews = async () => {
  const { data } = await apiAuth.get('/reviews/' + route.params.id)
  allReviews.splice(0, allReviews.length - 1, ...data.results)
  console.log(allReviews)
}

const getUserReview = async () => {
  const { data } = await apiAuth.get('/reviews/user/' + route.params.id)
  // console.log(data)
  film.like = data.result.like
  film.ratings = data.result.ratings
  film.watched = data.result.watched
  film.comments = data.result.comments
}

const checkWatchList = async () => {
  const { data } = await apiAuth.get('users/profile')
  const watchList = data.result.watchList
  if (watchList.indexOf(film.id.toString()) >= 0) {
    film.inWatchList = true
  } else {
    film.inWatchList = false
  }
}

const disableSubmit = computed(() => {
  return reviewEditor.value === ''
}
)

const seen = async () => {
  film.watched = !film.watched
  await apiAuth.post('/reviews/', {
    filmID: film.id,
    watched: film.watched
  })
}

const like = async () => {
  film.like = !film.like
  await apiAuth.post('/reviews/', {
    filmID: film.id,
    like: film.like
  })
}

const submitReview = async () => {
  await apiAuth.post('/reviews/', {
    filmID: film.id,
    comments: reviewEditor.value
  })
  getUserReview()
}

const addToWatchList = async () => {
  await apiAuth.post('/users/watchlist', {
    filmID: film.id.toString()
  })
  checkWatchList()
}

watch(() => film.ratings, async (newRatings, oldRatings) => {
  if (newRatings !== oldRatings) {
    try {
      await apiAuth.post('/reviews/', {
        filmID: film.id,
        ratings: newRatings
      })
      getUserReview()
    } catch (error) {
      console.error('Error sending ratings:', error)
    }
  }
})

onMounted(async () => {
  await getDetails()
  getUserReview()
  getReviews()
  checkWatchList()
})

</script>
