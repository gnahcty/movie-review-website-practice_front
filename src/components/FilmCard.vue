<template>
  <q-card class="my-card" flat bordered style="width:80%;" @mouseleave="expanded = false">
    <q-btn flat round color="grey" icon="add" id="add" class="absolute-top-right" style="z-index:2"
      v-if="CurrentUser.isLogin">
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item clickable :class="['row', 'items-center', inWatchList]" @click="addToWatchList">
            <q-icon name="more_time" class="col-2 q-pr-sm" />
            <div class="text-left"> WatchList</div>
          </q-item>
          <template v-for="(list, i) in CurrentUser.userLists" :key="i">
            <q-item clickable :class="['row', 'items-center', inList(i)]" @click="addToList(i)">
              <q-icon name="segment" class="col-2 q-pr-sm" />
              <div class="text-left"> {{ list.name }}</div>
            </q-item>
          </template>
          <q-separator inset />
          <q-item clickable v-close-popup class="row items-center" @click="newListDialog = true">
            <q-icon name="add" class="col-2 q-pr-sm" />
            <div class="text-left"> create a list</div>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <RouterLink :to="'/films/' + props.id">
      <q-img :src="'http://image.tmdb.org/t/p/w300/' + props.poster_path" class="ratio border5 rounded15"
        @mouseenter="expanded = true" ref="imgRef">
        <q-tooltip anchor="center middle" self="top middle">{{ title }}
        </q-tooltip>
      </q-img>
    </RouterLink>
    <div v-if="!expanded" style="width: 100% ; height: 58px; bg-grey"></div>
    <q-slide-transition v-else>
      <div class="relative">
        <q-card-actions align="center">
          <q-btn flat round :color="watched ? 'green' : 'grey'" icon="visibility" @click="loginTryCatch(seen)" />
          <!-- <span style="color: green;">00</span> -->
          <q-btn flat round :color="commented ? 'yellow' : 'grey'" icon="segment" />
          <!-- <span style="color: goldenrod;">00</span> -->
          <q-btn flat round :color="liked ? 'red' : 'grey'" icon="favorite" @click="loginTryCatch(like)" />
          <!-- <span style="color: red;">00</span> -->
        </q-card-actions>
      </div>
    </q-slide-transition>
  </q-card>

  <q-dialog v-model="newListDialog">
    <q-card style="min-width: 450px">
      <q-card-section>
        <q-input rounded outlined v-model="listTitle" type="text" label="List Title" class="q-mb-lg"
          :rules="[val => !!val || 'List Title is Required']" />
        <q-input rounded filled v-model="listDescription" type="textarea" label="list Description" />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Cancel" type="reset" color="primary" v-close-popup @click="clear" />
        <q-btn flat label="Submit" type="submit" color="primary" v-close-popup @click="createList" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { apiAuth } from 'boot/axios'
import { useUserStore } from 'stores/user'
import { useQuasar } from 'quasar'
import { useLogin } from 'src/utils/checkLogin.js'

const { loginTryCatch } = useLogin()
const CurrentUser = useUserStore()
const $q = useQuasar()

const props = defineProps({
  id: {
    type: Number,
    default: () => 0
  },
  title: {
    type: String,
    default: () => ''
  },
  poster_path: {
    type: String,
    default: () => ''
  },
  watched: {
    type: Boolean,
    default: () => false
  },
  like: {
    type: Boolean,
    default: () => false
  },
  comments: {
    type: String,
    default: () => ''
  },
  adult: {

  },
  backdrop_path: {

  },
  genre_ids: {

  },
  original_language: {

  },
  original_title: {

  },
  overview: {},
  popularity: {},
  release_date: {},
  video: {},
  vote_average: {},
  vote_count: {},
  ratings: {}
})

const expanded = ref(false)
const listTitle = ref('')
const listDescription = ref('')
const watched = ref(props.watched)
const commented = ref(props.comments !== '')
const liked = ref(props.like)
const newListDialog = ref(false)
const imgRef = ref(null)

const inList = computed(function () {
  return (i) => {
    return CurrentUser.userLists[i].films.some(film => film.id === props.id.toString()) ? 'text-blue' : 'text-grey'
  }
})

const inWatchList = computed(() => {
  return CurrentUser.watchList.some(film => film.id === props.id.toString()) ? 'text-blue' : 'text-grey'
})

const seen = async () => {
  watched.value = !watched.value
  await apiAuth.post('/reviews/', {
    filmID: props.id,
    watched: watched.value
  })
}

const like = async () => {
  liked.value = !liked.value
  await apiAuth.post('/reviews/', {
    filmID: props.id,
    like: liked.value
  })
}

const clear = () => {
  listTitle.value = ''
  listDescription.value = ''
}

const createList = async () => {
  if (listTitle.value === '') {
    $q.notify({
      type: 'warnings',
      message: 'Please Enter a Title'
    })
  } else {
    try {
      const film = {
        id: props.id,
        title: props.title,
        poster: props.poster_path
      }
      const { data } = await apiAuth.post('lists/create', {
        name: listTitle.value,
        description: listDescription.value,
        films: [film]
      })
      CurrentUser.userLists.push(data.newList)
      $q.notify({
        type: 'success',
        message: 'Success!'
      })
    } catch (error) {
      $q.notify({
        type: 'warnings',
        message: 'something went wrong'
      })
    }
  }
}

const addToList = async (i) => {
  try {
    const film = {
      id: props.id,
      title: props.title,
      poster: props.poster_path
    }
    const { data } = await apiAuth.post('lists/update', {
      _id: CurrentUser.userLists[i]._id,
      film
    })
    CurrentUser.userLists[i] = data.list
  } catch (error) {
    $q.notify({
      type: 'warnings',
      message: 'something went wrong'
    })
  }
}

const addToWatchList = async () => {
  try {
    const film = {
      filmID: props.id,
      title: props.title,
      poster: props.poster_path
    }
    const { data } = await apiAuth.post('/users/watchlist', film)
    CurrentUser.watchList = data.result
  } catch (error) {
    $q.notify({
      type: 'warnings',
      message: 'something went wrong'
    })
  }
}

</script>
