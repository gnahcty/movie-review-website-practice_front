<template>
  <div class="row justify-center ">
    <div class="col-12 col-xl-10 row justify-around">
      <div class="col-12 col-md-3 flex flex-center" style="height: 90vh;min-width: 320px;">
        <RatingCard :film="film" @newCmt="addCmt"></RatingCard>
      </div>
      <div class="col-12 col-md-8 col-lg-9 flex flex-center" style="height: 90vh; overflow-y: scroll;">
        <div class="bg-grey-2 q-px-lg-xl q-px-md-none q-px-md fit">
          <!-- film details -->
          <div>
            <div class="lilita titles" style=" margin-bottom: -15px;">{{ film.title }}</div>
            <div class="text-h5">
              <span class="q-mr-md underline">2022</span>
              <span>Directed by <span class="underline">{{ film.director }}</span></span>
            </div>
            <!-- TODO:年分 -->
            <q-rating v-model="ratingModel" size="50px" icon="eva-star-outline" icon-selected="eva-star" class="q-my-md"
              color="black" readonly />
            <div class="title3 text-bold">{{ film.overview }}</div>
          </div>
          <!-- comments -->
          <div class="q-pt-xl">
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
      </div>
    </div>
  </div>
</template>

<script setup>

import { api, apiAuth } from 'src/boot/axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from 'stores/user'

import FilmReview from 'components/FilmReview.vue'
import RatingCard from 'src/components/RatingCard.vue'

const currentUser = useUserStore()
const ratingModel = ref(0)
const route = useRoute()
const film = reactive({
  id: '',
  title: '',
  poster: '',
  overview: '',
  director: ''
})
const allReviews = reactive([])

// get film details (title, poster...etc)
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

// get film crew
const getCrew = async (id, job) => {
  try {
    const { data } = await api.get('/films/' + id + '/crew')
    const list = data.results.crew.filter((member) => member.job === job)
    return getNames(list)
  } catch (error) {
    console.log(error)
  }
}

// 將crew以,連接
const getNames = (list) => {
  const nameArr = []
  for (const person of list) {
    nameArr.push(person.name)
  }
  return nameArr.join()
}

// get all reviews
const getReviews = async () => {
  const { data } = await api.get('/reviews/' + route.params.id)
  allReviews.splice(0, allReviews.length, ...data.results)
  let sum = 0
  let i = 0
  for (const review of allReviews) {
    if (review.ratings > 0) {
      sum += review.ratings
      i++
    }
  }
  ratingModel.value = (sum / i) || 0
}

const getFriendsReviews = async () => {
  const { data } = await apiAuth.get(`reviews/${route.params.id}/friend`)
  console.log(data)
}

const updateReview = (data) => {
  const index = allReviews.findIndex((cmt) => cmt._id === data.result._id)
  if (index !== -1) {
    allReviews[index].comments = data.result.comments
  }
}

const addCmt = (cmt) => {
  console.log(cmt)
}

onMounted(async () => {
  await getDetails()
  getReviews()
  if (currentUser.isLogin) {
    getFriendsReviews()
  }
})

</script>
