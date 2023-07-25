<template>
      <q-card class="my-card" flat bordered>
        <RouterLink :to="'/films/'+ props.id">
        <q-img :ratio="3/4" :src="'http://image.tmdb.org/t/p/w185/' + props.poster_path">
          <div class="absolute-top-right" style="background: transparent; padding: 0;">
            <q-btn flat round color="grey" icon="add" id="add" class="absolute-top-right"/>
          </div>
          <q-tooltip anchor="center middle"
            self="top middle">{{ title }}</q-tooltip>
        </q-img>
      </RouterLink>
        <q-card-actions align="left">
          <q-btn flat round :color="watched ? 'green' : 'grey'" icon="visibility" @click="seen()"/>
          <!-- <span style="color: green;">00</span> -->
          <q-btn flat round :color="commented ? 'yellow' : 'grey'" icon="segment"/>
          <!-- <span style="color: goldenrod;">00</span> -->
          <q-btn flat round :color="liked ? 'red' : 'grey'" icon="favorite" @click="like()"/>
          <!-- <span style="color: red;">00</span> -->
        </q-card-actions>
      </q-card>
</template>

<script setup>
import { ref } from 'vue'
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
  }
})

const watched = ref(props.watched)
const commented = ref(props.comments !== '')
const liked = ref(props.like)

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
</script>
