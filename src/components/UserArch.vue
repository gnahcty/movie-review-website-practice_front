<template>
  <div class="arched column justify-around items-center bgea q-pt-md-md q-pt-lg-xl">
    <!-- 1 -->
    <router-link :to="`/profile/${props.username}/recent`" style="width: 70%;">
      <q-img :src="props.avatar" class="round" style="border: 3px solid #000;" />
    </router-link>
    <!-- 2 -->
    <router-link :to="`/profile/${props.username}/recent`" class="text-center" style="width: 70%;">
      <span class="text-bold text-h3 q-mt-xs">{{ props.username }}</span>
    </router-link>
    <!-- 3 -->
    <div class="text-bold row gt-md ">
      <span class="q-mr-md">{{ props.watched }} films</span> <span>{{ props.reviewed }} reviews</span>
    </div>
    <!-- 4 -->
    <div class="gt-sm col-4 row q-gutter-md q-pa-md flex-center " style="width:100%">
      <div class="col flex justify-center" v-for="(review, i) in props.latestComments" :key="i">
        <RouterLink :to="'/films/' + review.film" class="full-width">
          <q-img :src="'https://image.tmdb.org/t/p/w300/' + review.poster" class="ratio full-width rounded15"
            style="border: 3px solid #000;">
            <q-tooltip anchor="center middle" self="top middle">{{ review.title }} </q-tooltip>
          </q-img>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- <div class="col column h100 q-pl-md-md q-pl-sm-sm q-pl-xs-xs">
                    <div class="col-auto">
                      <router-link :to="`/profile/${props.username}/recent`" class="text-center" style="width: 70%;">
                        <span class="text-bold title3">{{ props.username }}</span>
                      </router-link>
                    </div>
                    <div class="col row gt-xs">
                      <div class="col h100 text-center" v-for="(review, i) in props.latestComments" :key="i">
                        <RouterLink :to="'/films/' + review.film" class="h100">
                          <img :src="'https://image.tmdb.org/t/p/w300/' + review.poster" class="ratio rounded15 h100 "
                            style="border: 2px solid #000;">
                        </RouterLink>
                      </div>
                    </div>
                    <div class="col-auto">
                      <span class="q-mr-md">{{ props.watched }} films</span> <span>{{ props.reviewed }} reviews</span>
                    </div>
                  </div> -->
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

<style lang="scss" scoped></style>
