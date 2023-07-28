<template>
  <q-item v-ripple>
    <q-item-section avatar>
      <q-avatar>
        <img :src="user.avatar">
      </q-avatar>
    </q-item-section>

    <q-item-section clickable @click="details=true">
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
      <q-item-label caption lines="3">
        <span>
        {{ comments }}
        </span>

      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label lines="1">
        <q-btn flat round icon="favorite"
        :color="CmtLiked? 'red':'grey'"  @click="likeCmt" />
        <span>{{ likesArr.length }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>

<q-separator inset="item" />
<q-dialog v-model="details">
    <q-card style="width:500px">
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-avatar>
              <img :src="user.avatar">
            </q-avatar>
            <span class="text-h6 q-ml-md">{{ user.username }}</span>
          </div>
          <div class="col-auto">
            <q-btn flat round icon="more_horiz">
              <q-menu>
                <q-list style="min-width: 100px" >
                  <q-item clickable v-close-popup class="flex justify-around items-center">
                      <q-icon name="share" /> Share
                  </q-item>
                  <q-item clickable v-close-popup class="flex justify-around items-center">
                    <q-icon name="warning" /> Report
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <!-- <q-separator /> -->

      <q-card-section style="max-height: 50vh" class="scroll q-px-xl">
        {{ comments }}
      </q-card-section>

      <!-- <q-separator /> -->

      <q-card-actions align="right">
        <span class="q-mr-sm">{{ likesArr.length }}</span> people liked this
        <q-btn flat round icon="favorite"
        :color="CmtLiked? 'red':'grey'"  @click="likeCmt"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { apiAuth } from 'boot/axios'
import { useUserStore } from 'stores/user'

const me = useUserStore()
const details = ref(false)
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
  return likesArr.indexOf(me._id) > -1
}

)

const rating = ref(props.ratings)

const likeCmt = async () => {
  console.log(me._id)
  const { data } = await apiAuth.post('reviews/like', {
    cmtID: props._id
  })
  likesArr.splice(0, likesArr.length, ...data.cmt.cmtLikes)
}
</script>
