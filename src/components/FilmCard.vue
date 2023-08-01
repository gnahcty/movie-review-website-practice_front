<template>
  <q-card class="my-card" flat bordered>
    <q-btn flat round color="grey" icon="add" id="add" class="absolute-top-right" style="z-index:2" v-if="user.isLogin">
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup class="row items-center" >
            <q-icon name="more_time" class="col-2 q-pr-sm" />
            <div class="text-left"> WatchList</div>
          </q-item>
          <template v-for="(list, i) in user.userLists" :key="i">
            <q-item clickable v-close-popup class="row items-center" @click="addToList(i)" :style="inList(i)">
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
      <q-img :ratio="3 / 4" :src="'http://image.tmdb.org/t/p/w185/' + props.poster_path">
        <q-tooltip anchor="center middle" self="top middle">{{ title }}
        </q-tooltip>
      </q-img>
    </RouterLink>
    <q-card-actions align="left">
      <q-btn flat round :color="watched ? 'green' : 'grey'" icon="visibility" @click="seen()" />
      <!-- <span style="color: green;">00</span> -->
      <q-btn flat round :color="commented ? 'yellow' : 'grey'" icon="segment" />
      <!-- <span style="color: goldenrod;">00</span> -->
      <q-btn flat round :color="liked ? 'red' : 'grey'" icon="favorite" @click="like()" />
      <!-- <span style="color: red;">00</span> -->
    </q-card-actions>
  </q-card>

  <q-dialog v-model="newListDialog">
    <q-card style="min-width: 450px">
        <q-card-section>
          <q-input rounded outlined v-model="listTitle" type="text" label="List Title" class="q-mb-lg" :rules="[ val=>!!val || 'List Title is Required']"/>
          <q-input rounded filled v-model="listDescription" type="textarea" label="list Description" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Cancel" type="reset" color="primary" v-close-popup @click="clear"/>
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

const user = useUserStore()
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
  overview: { },
  popularity: { },
  release_date: { },
  video: { },
  vote_average: { },
  vote_count: { },
  ratings: { }
})

const listTitle = ref('')
const listDescription = ref('')
const watched = ref(props.watched)
const commented = ref(props.comments !== '')
const liked = ref(props.like)
const newListDialog = ref(false)

const seen = async () => {
  if (user.isLogin) {
    watched.value = !watched.value
    await apiAuth.post('/reviews/', {
      filmID: props.id,
      watched: watched.value
    })
  } else {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Please Login'
    })
  }
}

const like = async () => {
  if (user.isLogin) {
    liked.value = !liked.value
    await apiAuth.post('/reviews/', {
      filmID: props.id,
      like: liked.value
    })
  } else {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Please Login'
    })
  }
}

const clear = () => {
  listTitle.value = ''
  listDescription.value = ''
}

const createList = async () => {
  if (listTitle.value === '') {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Please Enter a List Title'
    })
  } else {
    try {
      const { data } = await apiAuth.post('lists/create', {
        name: listTitle.value,
        description: listDescription.value,
        films: [props.id]
      })
      user.userLists.push(data.newList)
    } catch (error) {
      console.log(error)
    }
  }
}

const addToList = async (i) => {
  try {
    await apiAuth.post('lists/update', {
      _id: user.userLists[i]._id,
      film: props.id
    })
    const idx = user.userLists[i].films.indexOf(props.id.toString())
    console.log(` user.userLists[i].films : ${user.userLists[i].films},props.id: ${props.id}, idx: ${idx}`)
    if (idx === -1) {
      user.userLists[i].films.push(props.id.toString())
    } else {
      user.userLists[i].films.splice(idx, 1)
    }
  } catch (error) {
    console.log(error)
  }
}

const inList = computed((i) => {
  return user.userLists[i].films.indexOf(props.id.toString()) === -1 ? 'color:grey' : 'color:blue'
}
)
</script>
