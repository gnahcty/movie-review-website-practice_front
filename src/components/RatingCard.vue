<template>
  <div class="flex-center column q-gutter-y-sm" style="min-width: 320px;">
    <img class="col-7 rounded border10" :src="'https://image.tmdb.org/t/p/w300/' + props.film.poster"
      style="border-radius: 32px;">
    <q-rating v-model="userReview.ratings" max="5" size="50px" color="black" icon="eva-star-outline"
      icon-selected="eva-star" icon-half="star_half" :readonly="!currentUser.isLogin" />
    <div class="flex flex-center q-gutter-x-sm">
      <q-btn flat round icon="fa-regular fa-eye" size="xl" :color="userReview.watched ? 'green' : 'grey'"
        :disable="!currentUser.isLogin" @click="loginTryCatch(seen)" />
      <q-btn flat round :color="userReview.like ? 'red' : 'grey'" icon="favorite" @click="loginTryCatch(like)"
        :disable="!currentUser.isLogin" size="xl" />
      <q-btn flat round :color="inWatchList ? 'blue' : 'grey'" icon="more_time" @click="loginTryCatch(addToWatchList)"
        :disable="!currentUser.isLogin" size="xl" />
    </div>
    <q-btn color="yellow-8" text-color="white" :label="reviewed && !props.cmtDeleted ? 'reviewed' : 'review'"
      :disable="reviewed && !props.cmtDeleted" style="width: 200px; height: 73px; font-size: xx-large;"
      class="rounded15 lilita q-py-none" @click="checkLogin(openReviewDialog)" />
  </div>

  <q-dialog v-model="reviewDialog" full-width>
    <div id="reviewDialog" class="border10 column q-gutter-xl bg-white">
      <div class="text-h3 lilita q-mt-none"> Your Review</div>
      <q-editor v-model="reviewEditor" placeholder="Write something..." class="text-left col-8 border10 rounded15 "
        :readonly="!currentUser.isLogin" />
      <div class="row flex-center q-gutter-md">
        <q-btn flat label="submit" class="border5 rounded15 lilita" @click="loginTryCatch(submitReview)"
          :disable="editorEmpty" />
        <q-btn flat label="cancel" class="border5 rounded15 lilita" @click="reviewEditor = ''" v-close-popup />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from 'stores/user'
import { apiAuth } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { useLogin } from 'src/utils/checkLogin.js'

const { checkLogin, loginTryCatch } = useLogin()
const currentUser = useUserStore()
const route = useRoute()
const $q = useQuasar()

const props = defineProps({
  film: {
    type: Object,
    default: () => ({
      id: '',
      title: '',
      poster: '',
      overview: '',
      director: ''
    }
    )
  },
  cmtDeleted: {
    type: Boolean,
    default: () => false
  }
})
const emits = defineEmits(['newCmt'])

const reviewDialog = ref(false)
const reviewEditor = ref('')
const userReview = reactive({
  like: false,
  ratings: 0,
  watched: false,
  comments: ''
})

// 評論是否為空
const editorEmpty = computed(() => {
  return reviewEditor.value === ''
}
)

// 是否已評論過
const reviewed = computed(() => {
  return userReview.comments !== ''
})

const inWatchList = computed(() => {
  return currentUser.watchList.some(movie => movie.id === props.film.id.toString())
}
)

// 登入才能開review modal
const openReviewDialog = () => {
  reviewDialog.value = true
}

// mark as seen
const seen = async () => {
  userReview.watched = !userReview.watched
  // if (userReview.watched === false) { userReview.ratings = 0 }
  await apiAuth.post('/reviews/', {
    filmID: props.film.id,
    watched: userReview.watched,
    ratings: userReview.ratings
  })
  getUserReview()
}

// like this film
const like = async () => {
  await apiAuth.post('/reviews/', {
    filmID: props.film.id,
    like: !userReview.like
  })
  getUserReview()
}

const submitReview = async () => {
  const { data } = await apiAuth.post('/reviews/', {
    filmID: props.film.id,
    comments: reviewEditor.value
  })
  reviewDialog.value = false
  reviewEditor.value = ''
  getUserReview()
  emits('newCmt', data.result)
  $q.notify({
    type: 'success',
    message: 'Review added successfully'
  })
}

const addToWatchList = async () => {
  const addedFilm = {
    filmID: props.film.id,
    title: props.film.title,
    poster: props.film.poster
  }
  await apiAuth.post('/users/watchlist', addedFilm)
  checkWatchList()
}

const checkWatchList = async () => {
  const { data } = await apiAuth.get('users/profile')
  currentUser.watchList = data.result.watchList
}

// get this user's review
const getUserReview = async () => {
  const { data } = await apiAuth.get('/reviews/user/' + route.params.id)
  userReview.like = data.result?.like || false
  userReview.ratings = data.result?.ratings || 0
  userReview.watched = data.result?.watched || false
  userReview.comments = data.result?.comments || ''
}

watch(() => userReview.ratings, async (newRatings, oldRatings) => {
  if (newRatings !== oldRatings) {
    try {
      await apiAuth.post('/reviews/', {
        filmID: route.params.id,
        ratings: newRatings
      })
      getUserReview()
    } catch (error) {
      console.error('Error sending ratings:', error)
    }
  }
})

onMounted(async () => {
  if (currentUser.isLogin) { getUserReview() }
})
</script>

<style scoped>
#reviewDialog {
  height: 80vh;
  width: 75vw !important;
  border-radius: 50px !important;
  padding: 48px 48px 24px 0;
}
</style>
