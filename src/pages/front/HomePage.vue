<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section ">
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
                    <q-img :src="'http://image.tmdb.org/t/p/w300/' + film.poster_path" class="rounded15 border10 ratio"
                      style="width: 80%;">
                      <q-tooltip anchor="center middle" self="top middle">{{ film.title }}
                      </q-tooltip>
                    </q-img>
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
        <div class="column ">
          <p class="titles col-2">Popular Comments</p>
          <ReviewCarousel :reviewGroups="reviewGroups" class="col-10">
          </ReviewCarousel>
        </div>
      </div>
      <div class="section">
        <div class="column">
          <p class="titles">Popular Users</p>
          <div class="row q-gutter-x-xl flex-center q-px-xl " style="height: 60%;width:100%">
            <template v-for="(popUser, i) in popUsers" :key="i">
              <div class="col-3 arched column justify-end items-center bgea"
                style="height: 34vw; border: 4px solid #000;">
                <!-- 1 -->
                <router-link :to="`/profile/${popUser.username}/recent`" style="width: 70%;">
                  <q-img :src="popUser.avatar" class="round" style="border: 3px solid #000;" />
                </router-link>
                <!-- 2 -->
                <router-link :to="`/profile/${popUser.username}/recent`" class="text-center" style="width: 70%;">
                  <span class="text-bold text-h3 q-mt-xs">{{ popUser.username }}</span>
                </router-link>
                <!-- 3 -->
                <div class="text-bold row">
                  <span class="q-mr-md">{{ popUser.watched }} films</span> <span>{{ popUser.reviewed }} reviews</span>
                </div>
                <!-- 4 -->
                <div class="gt-sm col-4 row q-gutter-md q-pa-md flex-center" style="width:100%">
                  <div class="col flex justify-center" v-for="(review, i) in popUser.latestComments" :key="i">
                    <RouterLink :to="'/films/' + review.film" class="full-width">
                      <q-img :src="'http://image.tmdb.org/t/p/w300/' + review.poster" class="ratio full-width rounded15"
                        style="border: 3px solid #000;">
                        <q-tooltip anchor="center middle" self="top middle">{{ review.title }} </q-tooltip>
                      </q-img>
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
</template>

<script setup>
const emit = defineEmits(['fullpage-scroll'])
const options = {
  licenseKey: 'gplv3-license',
  onLeave: (origin, destination, direction, trigger) => {
    emit('fullpage-scroll', destination.index)
  }
  // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
}

import { onMounted, reactive, onUnmounted } from 'vue'
import { api } from 'src/boot/axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'
import ReviewCarousel from 'src/components/ReviewCarousel.vue'

const reviewGroups = reactive([])
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

const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  films.push(...data.results.results)
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

onUnmounted(() => {
  emit('fullpage-scroll', 0)
})
</script>

<style scoped>
.section {
  padding-top: 10vh;
  overflow: hidden;
}

.titles {
  padding-left: 60px;
}

.arched {
  border-radius: 222px 222px 0 0;
}

.h100 {
  height: 100% !important;
}
</style>
