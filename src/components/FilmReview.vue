<template>
  <!-- sm以上 -->
  <q-item v-ripple class="arched bg-white gt-xs">
    <q-item-section avatar>
      <router-link :to="`/profile/${user.username}/recent`">
        <q-img class="round " style="width:150px;" :src="user.avatar" />
      </router-link>
    </q-item-section>

    <q-item-section clickable @click="reviewModal = true" style="justify-content: start;">
      <q-item-label lines="1" class="lilita text-h4">{{ user.username }}
        <q-rating v-if="ratings > 0" v-model="rating" max="5" color="black" icon="eva-star-outline"
          icon-selected="eva-star" icon-half="star_half" class="q-ml-md" readonly />
        <q-icon v-if="like" name="favorite" class="q-ml-md" />
      </q-item-label>
      <q-item-label lines="3" class="text-h4 col-8">
        <span class="full-height flex items-center">
          {{ comments }}
        </span>

      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label lines="1">
        <q-btn flat round icon="favorite" :color="CmtLiked ? 'red' : 'grey'" @click="likeCmt" />
        <span>{{ likesArr.length }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
  <!-- sm以下 -->
  <q-item v-ripple class="bg-white lt-sm">
    <q-item-section avatar>
      <router-link :to="`/profile/${user.username}/recent`">
        <q-img class="round " style="width:53px;" :src="user.avatar" />
      </router-link>
    </q-item-section>

    <q-item-section clickable @click="reviewModal = true" style="justify-content: start;" class="column">
      <q-item-label lines="1" class="lilita col">{{ user.username }}
        <span v-if="ratings > 0" class="q-ml-md">{{ rating }} <q-icon name="eva-star" /></span>
        <q-icon v-if="like" name="favorite" class="q-ml-md" />
      </q-item-label>
      <q-item-label lines="3" class="col-8">
        <span class="full-height flex items-center">
          {{ comments }}
        </span>

      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label lines="1">
        <q-btn flat round icon="favorite" :color="CmtLiked ? 'red' : 'grey'" @click="likeCmt" />
        <span>{{ likesArr.length }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-dialog v-model="reviewModal">
    <q-card style="width:500px">
      <q-card-section>
        <div class="row">
          <div class="col">
            <router-link :to="`/profile/${user.username}/recent`">
              <q-avatar>
                <img :src="user.avatar">
              </q-avatar>
            </router-link>
            <span class="text-h6 q-ml-md">{{ user.username }}</span>
          </div>
          <div class="col-auto">
            <q-btn flat round icon="more_horiz">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup class="row items-center">
                    <q-icon name="share" class="col-4" />
                    <div class="text-left"> Share</div>
                  </q-item>
                  <q-item clickable v-close-popup class="row items-center" @click="loginTryCatch(report)">
                    <q-icon name="warning" class="col-4" />
                    <div class="text-left"> Report</div>
                  </q-item>
                  <q-item v-if="user._id === currentUser._id" clickable class="row items-center" @click="editing = true">
                    <q-icon name="edit" class="col-4" />
                    <div class="text-left"> Edit</div>
                  </q-item>
                  <q-separator inset />
                  <q-item v-if="user._id === currentUser._id" clickable v-close-popup class="row items-center" color="red"
                    @click="loginTryCatch(deleteCmt)">
                    <q-icon name="delete" class="col-4 text-red" />
                    <div class="text-left text-red"> Delete</div>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll q-px-xl">
        {{ comments }}
        <q-dialog v-model="editing" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-editor v-model="reviewEditor" min-height="5rem" autofocus />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" v-close-popup @click="reviewEditor = props.comments" />
              <q-btn flat label="Submit" v-close-popup @click="updateCmt" />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-card-section>

      <q-card-actions align="right">
        <span class="q-mr-sm">{{ likesArr.length }}</span> people liked this
        <q-btn flat round icon="favorite" :color="CmtLiked ? 'red' : 'grey'" @click="loginTryCatch(likeCmt)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { apiAuth } from 'boot/axios'
import { useUserStore } from 'stores/user'
import { useQuasar } from 'quasar'
import { useLogin } from 'src/utils/checkLogin.js'

const $q = useQuasar()
const currentUser = useUserStore()
const { loginTryCatch } = useLogin()
const props = defineProps({
  _id: {
    type: String,
    default: ''
  },
  user: {
    type: Object,
    default: () => ({
      _id: '',
      username: '',
      avatar: ''
    })
  },
  like: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0
  },
  comments: {
    type: String,
    default: ''
  },
  cmtLikes: {
    type: Array,
    default: () => []
  },
  reported: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: String,
    default: ''
  },
  film: String,
  watched: Boolean,
  poster: String,
  title: String,
  year: String
})
const emit = defineEmits(['cmtUpdated'])
const reviewEditor = ref(props.comments)
const likesArr = reactive(props.cmtLikes)
const rating = ref(props.ratings)
const editing = ref(false)
const reviewModal = ref(false)

const CmtLiked = computed(() => {
  return likesArr.indexOf(currentUser._id) > -1
}

)

const likeCmt = async () => {
  const { data } = await apiAuth.post('reviews/like', {
    cmtID: props._id
  })
  likesArr.splice(0, likesArr.length, ...data.cmt.cmtLikes)
}

const updateCmt = async () => {
  if (reviewEditor.value.length === 0) {
    $q.notify({
      type: 'warnings',
      message: 'Please type something'
    })
  } else {
    const { data } = await apiAuth.post('/reviews/', {
      filmID: props.film,
      comments: reviewEditor.value
    })
    $q.notify({
      type: 'success',
      message: 'Success!'
    })
    emit('cmtUpdated', data)
  }
}

const deleteCmt = async () => {
  const { data } = await apiAuth.post('/reviews/delete', {
    _id: props._id
  })
  emit('cmtUpdated', data)
}

const report = async () => {
  await apiAuth.post('/reviews/report', { id: props._id })
  $q.notify({ type: 'success', message: 'Reported' })
}
</script>

<style scoped>
.arched {
  width: 100%;
  height: 180px;
  border: 5px solid #000;
  /* background-color: #ddd; */
  border-radius: 122px 0 0 122px;
}
</style>
