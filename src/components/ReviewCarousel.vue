<template>
  <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
    control-color="black" padding arrows infinite style="width: 80vw;" class="self-center">
    <q-carousel-slide :name="index + 1" v-for="(reviewGroup, index) in props.reviewGroups" :key="index"
      class="wrapper flex flex-center" style="padding-bottom: 0 !important;">
      <template v-for="(review, reviewIndex) in reviewGroup" :key="reviewIndex">
        <q-card flat class="rounded15 border5 h100 bgea">
          <q-card-section horizontal class="fit row items-center">
            <RouterLink :to="'/films/' + review.film" class="col-3 flex items-center full-height">
              <q-card-section class="q-pr-none fit" style="box-sizing: border-box;">
                <q-img :src="'http://image.tmdb.org/t/p/w300/' + review.poster" class="rounded15 fit ratio border5" />
              </q-card-section>
            </RouterLink>
            <q-card-section class="col-9 full-height">
              <q-item class="fit q-pa-none">
                <q-item-section class="column">
                  <q-item-label lines="1" class="col-4 row">
                    <span class="text-h4 text-bold col text-no-wrap" style="text-overflow: ellipsis; overflow: hidden;">{{
                      review.title }}</span>
                    <span class="text-h6 q-ml-md col-3">{{ review.year }}</span>
                  </q-item-label>
                  <q-item-label lines="1" class="col-2">
                    <q-avatar size="sm"> <img :src=review.user.avatar></q-avatar>
                    <span class="q-ml-xs q-mr-sm">{{ review.user.username }}</span>
                    <q-rating v-model="review.ratings" :max="review.ratings" size="1em" icon="star_border"
                      icon-selected="star" icon-half="star_half" readonly />
                    <q-icon v-if="review.like" name="favorite" color="red" class="q-ml-sm" />
                  </q-item-label>
                  <q-item-label caption lines="3" class="col-4">{{ review.comments }}</q-item-label>
                  <q-item-label lines="1" class="col">
                    <q-icon name="favorite" class="q-mr-sm" />
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
</template>

<script setup>
import { ref } from 'vue'
const slide2 = ref(1)
const props = defineProps({
  reviewGroups: {
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
