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
        <div class="column " style="height: 90vh;">
          <div class="titles col-2" style="box-sizing: border-box;">Popular Comments</div>
          <div class="col-10 flex flex-center">
            <ReviewCarousel :reviewGroups="reviewGroups" style="overflow: hidden;" class="h100" @like="likecmt">
            </ReviewCarousel>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="column" style="height: 90vh;">
          <div class="titles col-2">Popular Users</div>
          <div class="row q-gutter-x-xl flex-center q-px-xl col-10 w100">
            <template v-for="(popUser, i) in popUsers" :key="i">
              <UserArch v-bind="popUser"></UserArch>
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
import { api, apiAuth } from 'src/boot/axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'
import ReviewCarousel from 'src/components/ReviewCarousel.vue'
import UserArch from 'src/components/UserArch.vue'

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
  reviewGroups.length = 0
  for (let i = 0; i < reviews.length; i += 6) {
    reviewGroups.push(reviews.slice(i, i + 6))
  }
}

const getPopUsers = async () => {
  const { data } = await api.get('users/pop')
  popUsers.push(...data.top3)
}

const likecmt = async (id) => {
  await apiAuth.post('reviews/like', { cmtID: id })
  getPopReviews()
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
