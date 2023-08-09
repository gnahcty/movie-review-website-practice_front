<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <div class="self-start"></div>
        <div class="column full-height" style="box-sizing: border-box;">
          <p class="titles">Popular This Week</p>
          <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
            control-color="black" padding arrows infinite height="65%" style="width: 100vw;">
            <q-carousel-slide :name="index + 1" v-for="(filmGroup, index) in filmGroups" :key="index"
              class="column no-wrap fit">
              <div class="row fit justify-start items-center q-gutter-md q-col-gutter no-wrap">
                <template v-for="(film, filmIndex) in filmGroup" :key="filmIndex">
                  <RouterLink :to="'/films/' + film.id" class="col-3 full-height">
                    <img :src="'http://image.tmdb.org/t/p/w300/' + film.poster_path"
                      class="full-height rounded15 border10 img-center">
                  </RouterLink>
                </template>

              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="section">
        <div class="column full-height" style="box-sizing: border-box;">
          <p class="titles">Popular Comments</p>
          <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
            control-color="black" padding arrows infinite height="65%" style="width: 80vw;" class="self-center">
            <q-carousel-slide :name="index + 1" v-for="(reviewGroup, index) in reviewGroups" :key="index"
              class="wrapper fit flex flex-center">
              <template v-for="(review, reviewIndex) in reviewGroup" :key="reviewIndex">
                <q-card class="rounded15 bg-grey fit">
                  <q-card-section horizontal class="fit row items-center">
                    <RouterLink :to="'/films/' + review.film" class="col-3 flex items-center full-height">
                      <q-card-section class="q-pr-none fit" style="box-sizing: border-box;">
                        <q-img :src="'http://image.tmdb.org/t/p/w300/' + review.poster" :ratio="3 / 4"
                          class="rounded15 fit" />
                      </q-card-section>
                    </RouterLink>
                    <q-card-section class="col-9 full-height">
                      <q-item class="fit q-pa-none">
                        <q-item-section class="column">
                          <q-item-label lines="1" class="col-4 row">
                            <span class="text-h4 text-bold col text-no-wrap"
                              style="text-overflow: ellipsis; overflow: hidden;">{{
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
        </div>
      </div>
      <div class="section">
        <div class="column window-height " style="box-sizing: border-box;">
          <p class="titles">Popular Users</p>
          <div class="row q-gutter-x-xl flex-center q-px-xl " style="height: 60%;width:100%">
            <template v-for="(popUser, i) in popUsers" :key="i">
              <div class="bg-grey col-3 arched column justify-end items-center" style="height: 34vw;">
                <!-- 1 -->
                <q-img :src="popUser.avatar" class="round" style="width: 72%;" />
                <!-- 2 -->
                <span class="text-bold text-h3 q-mt-xs">{{ popUser.username }}</span>
                <!-- 3 -->
                <div class="text-bold row">
                  <span class="q-mr-md">{{ popUser.watched }} films</span> <span>{{ popUser.reviewed }} reviews</span>
                </div>
                <!-- 4 -->
                <div class="col-4 row q-gutter-md q-pa-md flex-center" style="width:100%">
                  <div class="col flex justify-center" v-for="(review, i) in popUser.latestComments" :key="i">
                    <RouterLink :to="'/films/' + review.film" class="full-width">
                      <q-img :src="'http://image.tmdb.org/t/p/w300/' + review.poster" :ratio="3 / 4"
                        class="full-width rounded15" />
                    </RouterLink>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </full-page>
  </div>

  <div class="absolute-bottom-right bg-white" style="width:200px; height: 50px;"></div>
</template>

<script setup>

const options = {
  licenseKey: 'gplv3-license'
  // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
}

import { ref, onMounted, reactive } from 'vue'
import { api } from 'src/boot/axios'

const slide = ref(1)
const slide2 = ref(1)
const filmGroups = reactive([])
const reviewGroups = reactive([])
const popUsers = reactive([])

const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  const films = data.results.results
  for (let i = 0; i < films.length; i += 4) {
    filmGroups.push(films.slice(i, i + 4))
  }
}

const getPopReviews = async () => {
  const { data } = await api.get('reviews/pop')
  const reviews = data.results
  for (let i = 0; i < reviews.length; i += 6) {
    reviewGroups.push(reviews.slice(i, i + 6))
  }
}

const getPopUsers = async () => {
  const { data } = await api.get('users/pop')
  popUsers.push(...data.results)
}

onMounted(
  getTrendingFilms(),
  getPopReviews(),
  getPopUsers()
)
</script>

<style scoped>
.section {
  padding-top: 93px;
}

.titles {
  padding-left: 60px;
  font-family: Lilita One;
  font-size: 6rem;
  font-weight: 400;
}

.wrapper {
  display: grid;
  grid-template-columns: 30vw 30vw;
  grid-template-rows: 33% 33% 33%;
  grid-gap: 10px;
}

.arched {
  border-radius: 222px 222px 0 0;
}

/* .q-img img {
  border-radius: 15px !important;
} */
</style>
