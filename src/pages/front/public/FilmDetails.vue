<template>
  <div style="padding:0 9.5vw;">
    <q-splitter v-model="splitterModel" style="height: 90vh">

      <template v-slot:before>
        <div class="fit q-pa-xl flex flex-center column q-gutter-y-sm">
          <img class="col-7 rounded border10" :src="'http://image.tmdb.org/t/p/w300/' + film.poster"
            style="border-radius: 60px;">
          <q-rating v-model="film.ratings" max="5" size="50px" color="black" icon="eva-star-outline"
            icon-selected="eva-star" icon-half="star_half" :readonly="!user.isLogin" />
          <div class="flex flex-center q-gutter-x-sm">
            <q-btn flat round :color="film.watched ? 'green' : 'grey'" icon="fa-regular fa-eye" @click="seen()"
              :disable="!user.isLogin" size="xl" />
            <q-btn flat round :color="film.like ? 'red' : 'grey'" icon="favorite" @click="like()" :disable="!user.isLogin"
              size="xl" />
            <q-btn flat round :color="film.inWatchList ? 'blue' : 'grey'" icon="more_time" @click="addToWatchList()"
              :disable="!user.isLogin" size="xl" />
          </div>
          <q-btn color="yellow-8" text-color="white" label="Review"
            style="width: 200px; height: 73px; font-size: xx-large;" class="rounded15 lilita q-py-none"
            @click="reviewDialog = true" />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-px-xl">
          <!-- film details -->
          <div class="q-pr-xl">
            <div class="lilita" style="font-size: 6rem; margin-bottom: -15px;">{{ film.title }}</div>
            <div class="text-h5">
              <span class="q-mr-md underline">2022</span>
              <span>Directed by <span class="underline">{{ film.director }}</span></span>
            </div>
            <!-- TODO:年分、平均分數 -->
            <q-rating v-model="ratingModel" size="50px" icon="eva-star-outline" icon-selected="eva-star" class="q-my-md"
              color="black" readonly />
            <div class="text-h4 text-bold">{{ film.overview }}</div>
          </div>
          <!-- comments -->
          <div class="q-pt-xl q-pr-xl">
            <q-toolbar class="q-pl-none" style="border-bottom: 5px solid #000;">
              <q-toolbar-title class="text-h3 lilita">
                Comments
              </q-toolbar-title>
            </q-toolbar>

            <div class=" q-gutter-y-lg q-mt-md">
              <template v-for="cmt in allReviews" :key="cmt.id">
                <FilmReview v-bind="cmt" v-if="cmt.comments !== ''" @cmtUpdated="updateReview($event)"></FilmReview>
              </template>
            </div>
          </div>
        </div>
      </template>

    </q-splitter>

    <q-dialog v-model="reviewDialog">
      <q-card>
        <q-editor v-model="reviewEditor" min-height="5rem"
          :placeholder="user.isLogin ? 'write something...' : 'Login to leave a review...'" class="text-left"
          :readonly="!user.isLogin" />
        <q-btn label="submit" @click="submitReview" class="q-ma-sm" :disable="disableSubmit" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>

import { api, apiAuth } from 'src/boot/axios'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import FilmReview from 'components/FilmReview.vue'
import { useUserStore } from 'stores/user'
import { useRoute } from 'vue-router'

const reviewDialog = ref(false)
const ratingModel = 4
const splitterModel = ref(36)
const user = useUserStore()
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
  const { data } = await api.get('/reviews/' + route.params.id)
  allReviews.splice(0, allReviews.length, ...data.results)
}

const getUserReview = async () => {
  const { data } = await apiAuth.get('/reviews/user/' + route.params.id)
  if (data.result) {
    film.like = data.result.like
    film.ratings = data.result.ratings
    film.watched = data.result.watched
    film.comments = data.result.comments
  } else {
    film.like = false
    film.ratings = 0
    film.watched = false
    film.comments = ''
  }
}

const checkWatchList = async () => {
  const { data } = await apiAuth.get('users/profile')
  const watchList = data.result.watchList
  if (watchList.some(movie => movie.id === film.id.toString())) {
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

// const submitReview = async () => {
//   await apiAuth.post('/reviews/', {
//     filmID: film.id,
//     comments: reviewEditor.value
//   })
//   getUserReview()
//   getReviews()
// }

const addToWatchList = async () => {
  const addedFilm = {
    filmID: film.id,
    title: film.title,
    poster: film.poster
  }
  await apiAuth.post('/users/watchlist', addedFilm)
  checkWatchList()
}

// const updateReview = (data) => {
//   const index = allReviews.findIndex((cmt) => cmt._id === data.result._id)
//   if (index !== -1) {
//     allReviews[index].comments = data.result.comments
//   }
// }

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
  getReviews()
  getUserReview()
  checkWatchList()
})

</script>

<style scoped>
.arched {
  width: 100%;
  height: 180px;
  border: 5px solid #000;
  background-color: #ddd;
  border-radius: 122px 0 0 122px;
}
</style>
