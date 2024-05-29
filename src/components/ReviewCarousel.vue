<template>
  <q-carousel v-model="slide1" transition-prev="slide-right" transition-next="slide-left" swipeable animated
    control-color="black" padding arrows infinite style="width: 80vw; " class="no-scrollbar self-center gt-sm h100">
    <q-carousel-slide :name="index + 1" v-for="(reviewGroup, index) in props.reviewGroups" :key="index"
      class="wrapper flex flex-center no-scrollbar" style="padding-bottom: 0 !important; overflow:clip">
      <template v-for="review in reviewGroup" :key="review._id">
        <q-card flat class="rounded15 border5 h100 bgea">
          <q-card-section horizontal class="fit row items-center">
            <RouterLink :to="'/films/' + review.film" class="col-3 flex items-center full-height">
              <q-card-section class="q-pr-none fit" style="box-sizing: border-box;">
                <q-img :src="'https://image.tmdb.org/t/p/w300/' + review.poster" class="rounded15 fit ratio border5">
                  <q-tooltip anchor="center middle" self="top middle">{{ review.title }} </q-tooltip>
                </q-img>
              </q-card-section>
            </RouterLink>
            <q-card-section class="col-9 full-height q-py-sm">
              <q-item class="fit q-pa-none">
                <q-item-section class="column flex justify-center">
                  <q-item-label lines="1" class="col-3 ">
                    <RouterLink :to="'/films/' + review.film" class="row">
                      <span class="text-h4 text-bold col text-no-wrap"
                        style="text-overflow: ellipsis; overflow: hidden;">{{
                          review.title }}</span>
                    </RouterLink>
                    <span class="text-h6 q-ml-md col-3">{{ review.year }}</span>
                  </q-item-label>
                  <q-item-label lines="1" class="col-2">
                    <router-link :to="`/profile/${review.user.username}/recent`">
                      <q-avatar size="sm"> <img :src=review.user.avatar></q-avatar>
                      <span class="q-ml-xs q-mr-sm">{{ review.user.username }}</span>
                    </router-link>
                    <q-rating v-model="review.ratings" :max="review.ratings" size="1em" icon="star_border"
                      icon-selected="star" icon-half="star_half" readonly />
                    <q-icon v-if="review.like" name="favorite" color="red" class="q-ml-sm" />
                  </q-item-label>
                  <q-item-label caption lines="3" class="col-3">{{ review.comments }}</q-item-label>
                  <q-item-label lines="1" class="col-2 flex items-center">
                    <q-btn flat round icon="favorite" class="q-mr-sm" size="sm"
                      :color="review.cmtLikes.indexOf(CurrentUser._id) === -1 ? 'black' : 'red'"
                      @click="$emit('like', review._id)" />
                    <span class="q-mr-xs">{{ review.cmtLikes.length }}</span>likes
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card-section>
        </q-card>
      </template>
    </q-carousel-slide>
  </q-carousel>

  <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
    control-color="black" padding arrows infinite style="width: 100vw; " class="self-center lt-md h100">
    <q-carousel-slide :name="index + 1" v-for="(reviewGroup, index) in props.reviewGroups2" :key="index" class="column"
      style="padding-bottom: 0 !important;">
      <div v-for="review in reviewGroup" :key="review._id" class="col w100">
        <q-card flat class="rounded15 border5 h100 bgea">
          <q-card-section horizontal class="h100 row flex-center q-gutter-sm">
            <RouterLink :to="'/films/' + review.film" class="h100">
              <q-card-section class="q-pa-xs h100 col flex items-center justify-center" style="box-sizing: border-box;">
                <img :src="'https://image.tmdb.org/t/p/w300/' + review.poster" class="rounded15 ratio border5"
                  style="width:60%" />
              </q-card-section>
            </RouterLink>
            <q-card-section class="col-9 full-height q-py-sm">
              <q-item class="fit q-pa-none">
                <q-item-section class="column flex justify-center">
                  <q-item-label lines="1" class="col-3 ">
                    <RouterLink :to="'/films/' + review.film" class="row">
                      <span class="text-h4 text-bold col text-no-wrap"
                        style="text-overflow: ellipsis; overflow: hidden;">{{
                          review.title }}</span>
                    </RouterLink>
                    <!-- <span class="text-h6 q-ml-md col-3">{{ review.year }}</span> -->
                  </q-item-label>
                  <q-item-label lines="1" class="col-2">
                    <router-link :to="`/profile/${review.user.username}/recent`">
                      <q-avatar size="sm"> <img :src=review.user.avatar></q-avatar>
                      <span class="q-ml-xs q-mr-sm">{{ review.user.username }}</span>
                    </router-link>
                    <q-rating v-model="review.ratings" :max="review.ratings" size="1em" icon="star_border"
                      icon-selected="star" icon-half="star_half" readonly />
                    <q-icon v-if="review.like" name="favorite" color="red" class="q-ml-sm" />
                  </q-item-label>
                  <q-item-label caption lines="3" class="col-3">{{ review.comments }}</q-item-label>
                  <q-item-label lines="1" class="col-2 flex items-center">
                    <q-btn flat round icon="favorite" class="q-mr-sm" size="sm"
                      :color="review.cmtLikes.indexOf(CurrentUser._id) === -1 ? 'black' : 'red'"
                      @click="$emit('like', review._id)" />
                    <span class="q-mr-xs">{{ review.cmtLikes.length }}</span>likes
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from 'stores/user'

defineEmits(['like'])
const CurrentUser = useUserStore()
const slide1 = ref(1)
const slide2 = ref(1)
const props = defineProps({
  reviewGroups: {
    type: Array
  },
  reviewGroups2: {
    type: Array
  }
})

</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 30vw 30vw;
  grid-template-rows: 32% 32% 32%;
  grid-gap: 10px;
}
</style>
