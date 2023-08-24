<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section" id="frontPage">
        <div class="w100 h100 relative">
          <!-- 右上眼球 -->
          <img v-intersection="onIntersection" id="topEye"
            src="https://cdn.discordapp.com/attachments/1109403221245571167/1142730115348959344/IMG_7940.png"
            style="position: absolute; top: 0; right: 0; width:calc(18vw + 184.3px) ;">
          <!-- 左下眼球 -->
          <img src="https://cdn.discordapp.com/attachments/1109403221245571167/1142730114640130119/IMG_7939.png"
            id="btmEye" style="position: absolute; bottom: 0; left: 0; width: calc(19vw + 184.3px);">
          <img src="https://cdn.discordapp.com/attachments/1109403221245571167/1142741333119873055/IMG_7943.png"
            id="logo1" class="logo"
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: calc(32vw + 208.9px);">
          <img src="https://cdn.discordapp.com/attachments/1109403221245571167/1142741333480587387/IMG_7944.png"
            id="logo2" class="logo"
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: calc(32vw + 208.9px);">
          <img src="https://cdn.discordapp.com/attachments/1109403221245571167/1142741333740630056/IMG_7945.png"
            id="logo3" class="logo"
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: calc(32vw + 208.9px);">
        </div>
      </div>
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
                    <q-img :src="'https://image.tmdb.org/t/p/w300/' + film.poster_path" class="rounded15 border10 ratio"
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
          <div class="titles col-auto" style="box-sizing: border-box;">Popular Comments</div>
          <div class="col q-mb-md flex flex-center">
            <ReviewCarousel :reviewGroups="reviewGroups" :reviewGroups2="reviewGroups2" @like="likecmt">
            </ReviewCarousel>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="column" style="height: 90vh;">
          <div class="titles col-auto">Popular Users</div>
          <div class="row q-gutter-x-xl flex-center q-px-lg-xl col w100 gt-sm">
            <template v-for="(popUser, i) in popUsers" :key="i">
              <UserArch v-bind="popUser" class="col-3 "></UserArch>
            </template>
          </div>
          <div class="column q-gutter-y-xl flex-center col w100 lt-md q-pb-md">
            <template v-for="(popUser, i) in popUsers" :key="i">
              <SideArch v-bind="popUser"></SideArch>
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
  licenseKey: 'gplv3-license'
  // onLeave: (origin, destination, direction, trigger) => {
  //   emit('fullpage-scroll', destination.index)
  // }
  // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
}

import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useGeneralStore } from 'stores/general.js'
import { api, apiAuth } from 'src/boot/axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { gsap } from 'gsap'
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Autoplay, Navigation } from 'swiper'
import ReviewCarousel from 'src/components/ReviewCarousel.vue'
import UserArch from 'src/components/UserArch.vue'
import SideArch from 'src/components/SideArch.vue'

const state = useGeneralStore()
const reviewGroups = reactive([])
const reviewGroups2 = reactive([])
const popUsers = reactive([])
const films = reactive([])

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 1500,
    disableOnInteraction: true
  },
  loop: true,
  navigation: {
    prevEl: '#swiper-prev',
    nextEl: '#swiper-next'
  },
  modules: [Autoplay, Navigation],
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
const fullpage = ref(null)
const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  films.push(...data.results.results)
}

const getPopReviews = async () => {
  const { data } = await api.get('reviews/pop')
  const reviews = data.results
  reviewGroups.length = 0
  reviewGroups2.length = 0
  for (let i = 0; i < reviews.length; i += 6) {
    reviewGroups.push(reviews.slice(i, i + 6))
  }
  for (let i = 0; i < reviews.length; i += 3) {
    reviewGroups2.push(reviews.slice(i, i + 3))
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
const onIntersection = (entry) => {
  if (entry.isIntersecting) {
    emit('fullpage-scroll', 0)
  } else {
    emit('fullpage-scroll', 1)
  }
}

onMounted(async () => {
  await getTrendingFilms()
  await getPopReviews()
  await getPopUsers()
  state.isLoading = false
  if (state.isFirstEntry === true) {
    const tl = gsap.timeline({
      defaults: {
        duration: 1
      }
    })

    tl.from('#topEye', { x: document.querySelector('#topEye').width }, '+=2')
      .from('#btmEye', { x: -(document.querySelector('#btmEye').width) })
      .from('#logo1', { display: 'none', duration: 0.2 })
      .from('#logo2', { display: 'none', duration: 0.2 })
      .from('#logo3', { display: 'none', duration: 0.2 })
      .then(setTimeout(() => { fullpage.value.api.moveTo(2) }, 5000))
      .then(state.isFirstEntry = false)
  }
})

onUnmounted(() => {
  emit('fullpage-scroll', 1)
})
</script>

<style scoped>
#frontPage {
  /* background: #ffe500 url(https://cdn.discordapp.com/attachments/1109403221245571167/1142722955583959090/IMG_7938.png) no-repeat center center / cover; */
  width: 100%;
  background-color: #ffe500;
  display: block !important;
  padding-top: none;
}

#frontPage>div {
  height: 100% !important;
  width: 100% !important;
}

.section+.section {
  padding-top: 10vh;
  overflow: hidden;
}

/* .logo {
  display: none;
} */

.titles {
  padding-left: 60px;
}

.arched {
  border-radius: 222px 222px 0 0;
  height: 34vw;
  border: 4px solid #000;
}

.h100 {
  height: 100% !important;
}
</style>
