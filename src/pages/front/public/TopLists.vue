<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <div class="column q-gutter-md">
          <p class="titles">Popular This Week</p>
          <div class="row items-center" style="height:70vh; width:100vw">
            <div class="col-1 position-relative">
              <div class="swiper-button-prev" id="swiper-prev" style="top: auto !important;"></div>
            </div>
            <div class="col-10">
              <swiper v-bind="swiperOptions" @swiper="getSwiperRef">
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
          <p class="titles">Popular Comments</p>
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
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import { Navigation } from 'swiper'

const reviewGroups = reactive([])
const popUsers = reactive([])
const films = reactive([])

const swiperRef = ref(null)

const getSwiperRef = (swiperInstance) => {
  swiperRef.value = swiperInstance
}

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
    992: {
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
