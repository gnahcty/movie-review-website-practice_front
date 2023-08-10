<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <div class="column">
          <p class="titles">Popular This Week</p>
          <div class="row items-center" style="width:100%">
            <div class="col-1 relative">
              <div class="swiper-button-prev" id="swiper-prev" style="top: auto !important;"></div>
            </div>
            <div class="col-10">
              <swiper v-bind="swiperOptions">
                <swiperSlide v-for="(film, i) in films" :key="i">
                  <RouterLink :to="'/films/' + film.id">
                    <img :src="'http://image.tmdb.org/t/p/w300/' + film.poster_path"
                      style="aspect-ratio:3 / 4 !important;" class="rounded15 border10" />
                  </RouterLink>
                </swiperSlide>
              </swiper>
            </div>
            <div class="col-1 relative">
              <div class="swiper-button-next" id="swiper-next" style="top: auto !important;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="column full-height">
          <p class="titles col ">Popular Comments</p>
          <div class="row col-9 items-center" style="width:100%">
            <div class="col-1 relative">
              <div class="swiper-button-prev" id="swiper-grid-prev" style="top: auto !important;"></div>
            </div>
            <div class="col-10">
              <swiper v-bind="swiperOptionsGrid">
                <swiperSlide v-for="(review, i) in reviews" :key="i">
                  <q-card class="rounded15 bg-grey">
                    <q-card-section horizontal class=" row items-center">
                      <RouterLink :to="'/films/' + review.film" class="col-3 flex items-center ">
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
                </swiperSlide>
              </swiper>
            </div>
            <div class="col-1 relative">
              <div class="swiper-button-next" id="swiper-grid-next" style="top: auto !important;"></div>
            </div>
          </div>
        </div>
      </div>

    </full-page>
  </div>
</template>

<script setup>

const options = {
  licenseKey: 'gplv3-license'
  // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
}

import { onMounted, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation, Grid } from 'swiper'

const reviews = reactive([])
const popUsers = reactive([])
const films = reactive([])

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: '#swiper-prev',
    nextEl: '#swiper-next'
  },
  modules: [Navigation],
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1128: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1620: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
}

const swiperOptionsGrid = {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    prevEl: '#swiper-grid-prev',
    nextEl: '#swiper-grid-next'
  },
  grid: {
    rows: 3,
    fill: 'row'
  },
  modules: [Navigation, Grid]
  // breakpoints: {
  //   768: {
  //     slidesPerView: 2,
  //     spaceBetween: 20
  //   }
  // }
}

const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  films.push(...data.results.results)
}

const getPopReviews = async () => {
  const { data } = await api.get('reviews/pop')
  reviews.push(...data.results)
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
  padding-top: 10vh;
  overflow: hidden;
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
