<template>
        <q-item v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ user.username }}
            <q-rating
            v-if="ratings > 0"
            v-model="rating"
            max="5"
            color="orange"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            class="q-ml-md"
            readonly
            />
            <q-icon v-if="like" name="favorite" color="red" class="q-ml-md"/>
          </q-item-label>
          <q-item-label caption lines="2">
            <span>
            {{ comments }}
            </span>

          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label lines="1">
            <q-btn flat rounded icon="favorite"
            :color="CmtLiked? 'red':'grey'"  @click="likeCmt" />
            <span class="q-ml-sm">{{ cmtLikes.length }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset="item" />
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { apiAuth } from 'boot/axios'

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
  watched: Boolean
})
const likesArr = reactive(props.cmtLikes)
const CmtLiked = computed(() => {
  return props.cmtLikes.indexOf(props.user._id) > -1
}

)

const rating = ref(props.ratings)

const likeCmt = async () => {
  await apiAuth.post('reviews/like', {
    cmtID: props._id,
    userID: props.user._id
  })
  likesArr.push(props.user._id)
}
</script>
