<template>
  <div padding style="background-color: #ffe500;" class="row justify-center q-pt-xl">
    <div class="col-8">
      <div class="titles">New Logs</div>
      <div class="row items-center w100">
        <div class="col-1 relative">
          <div class="swiper-button-prev" id="swiper-prev"></div>
        </div>
        <div class="col-10">
          <swiper v-bind="swiperOptions">
            <swiperSlide v-for="(review) in reviews" :key="review._id">
              <RouterLink :to="'/films/' + review.film">
                <q-img :src="`http://image.tmdb.org/t/p/w300/${review.poster}`" style=" box-sizing: border-box;"
                  class="rounded15 border5 ratio w100">
                  <q-tooltip anchor="center middle" self="top middle">
                    {{ review.title }}
                  </q-tooltip>
                </q-img>
              </RouterLink>
            </swiperSlide>
          </swiper>
        </div>
        <div class="col-1 relative">
          <div class="swiper-button-next" id="swiper-next"></div>
        </div>
      </div>
      <div class="titles bdb4 ">Lists</div>
      <div class="bdb4">
        <template v-for="(list) in lists" :key="list._id">
          <div class="row q-py-md">
            <div class="col-12 col-md-4" style="height:240px ;">
              <CardStack :cards="list.films" :cardWidth="137" :stackWidth="'100%'" :cardHeight="200" :maxCards="5"
                :paddingX="10">
                <template v-slot:card="{ card }">
                  <img v-if="card.poster" :src="`http://image.tmdb.org/t/p/w300/${card.poster}`"
                    class="h100  rounded15 border5">
                  <div v-else class="h100 w100 bg-grey rounded15" style="border: 5px solid grey;"></div>
                </template>
              </CardStack>
            </div>
            <q-item-section class="col-12 col-md-8 justify-around q-pl-md-md">
              <q-item-label lines="2" class="title3 text-bold">{{ list.name }}</q-item-label>
              <q-item-label lines="1" class="flex items-center">{{ list.films?.length }} films
                <q-btn flat round icon="favorite" />{{ list.likes.length }}</q-item-label>
            </q-item-section>
          </div>
        </template>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-6 q-pa-md">
          <div class="bdb4 flex justify-between items-end"><span class="titles">Watchlist</span> <span
              class="text-h6 q-mb-lg">{{ watchlist.length }}</span></div>
          <CardStack :cards="watchlist" :stackWidth="'100%'" :cardWidth="137" :cardHeight="200" :paddingX="20"
            :maxCards="8">
            <template v-slot:card="{ card }">
              <img v-if="card.poster" :src="`http://image.tmdb.org/t/p/w300/${card.poster}`"
                class="h100 rounded15 border5">
              <div v-else class="h100 w100 bg-grey rounded15" style="border: 5px solid grey;"></div>
            </template>
          </CardStack>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <div class="bdb4 flex justify-between items-end"><span class="titles">Following</span> <span
              class="text-h6 q-mb-lg">{{ profile.following?.length }}</span></div>
          <div class="row q-pt-md">
            <img v-for="(user) in profile.following" :key="user" class="round col-2"
              src="https://cdn.discordapp.com/attachments/1109403221245571167/1139384610376138752/IMG_7910.png">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { api } from 'src/boot/axios'
// import { useUserStore } from 'stores/user'
import CardStack from 'components/CardStack.vue'

// const user = useUserStore()
const route = useRoute()
const profile = reactive({})
const watchlist = reactive([])
const reviews = reactive([])
const lists = reactive([])

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

const getRecent = async () => {
  const { data } = await api.get('/profile/recent/' + route.params.username)
  Object.assign(profile, data.result.profile)
  watchlist.push(...data.result.watchlist)
  reviews.push(...data.result.userReviews)
  lists.push(...data.result.userLists)
}
onMounted(() => {
  getRecent()
})
</script>

<style scoped>
.relative {
  position: relative !important;
}
</style>
