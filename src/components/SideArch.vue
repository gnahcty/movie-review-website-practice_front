<template>
  <div class="side-arched bgea col border5 q-pl-sm">
    <div class="h100 row items-center">
      <div class="col-auto h100 ">
        <router-link :to="`/profile/${props.username}/recent`" class="h100 flex items-center">
          <!-- <img :src="props.avatar" class="round" style="border: 3px solid #000;height: 85%;" /> -->
        </router-link>
      </div>
      <div class="col column q-pl-md">
        <div class="col-auto">
          <router-link :to="`/profile/${props.username}/recent`" class="text-center" style="width: 70%;">
            <span class="text-bold title3">{{ props.username }}</span>
          </router-link>
        </div>
        <div class="col-auto row text-bold">
          <div class="q-mr-md col-auto text-center">{{ props.watched }} films</div>
          <div class="col-auto text-center">{{ props.reviewed }} reviews</div>
        </div>
      </div>
      <div class="col-2 text-center gt-xs" v-for="(review, i) in props.latestComments" :key="i">
        <RouterLink :to="'/films/' + review.film">
          <img :src="'https://image.tmdb.org/t/p/w300/' + review.poster" class="ratio rounded15 "
            style="border: 2px solid #000; width: 80%;">
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  username: {
    type: String,
    default: () => ''
  },
  avatar: {
    type: String,
    default: () => ''
  },
  reviewed: {
    type: Number,
    default: () => 0
  },
  watched: {
    type: Number,
    default: () => 0
  },
  latestComments: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.side-arched {
  width: 80%;
  border-radius: 222px 0 0 222px;
}
</style>
