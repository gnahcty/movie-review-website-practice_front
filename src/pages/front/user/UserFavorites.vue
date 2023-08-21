<template>
  <div padding style="background-color: #00e0ff;" class="row justify-center q-pt-xl">
    <div class="col-8">
      <!-- liked films start -->
      <div class="titles">Liked Films</div>
      <div class="row items-center w100">
        <div class="col-1 relative">
          <div class="swiper-button-prev" id="swiper-films-prev"></div>
        </div>
        <div class="col-10">
          <swiper v-bind="swiperOptionsFilms">
            <swiperSlide v-for="(film) in likedFilms" :key="film._id">
              <RouterLink :to="'/films/' + film._id">
                <q-img :src="`https://image.tmdb.org/t/p/w300/${film.poster}`" style=" box-sizing: border-box;"
                  class="rounded15 border5 ratio w100">
                  <q-tooltip anchor="center middle" self="top middle">
                    {{ film.title }}
                  </q-tooltip>
                </q-img>
              </RouterLink>
            </swiperSlide>
          </swiper>
        </div>
        <div class="col-1 relative">
          <div class="swiper-button-next" id="swiper-films-next"></div>
        </div>
      </div>
      <div class="titles bdb4 ">Lists</div>
      <div class="row items-center" style="width:100%">
        <div class="col-1 relative">
          <div class="swiper-button-prev" id="swiper-lists-prev" style="top: auto !important;"></div>
        </div>
        <div class="col-10">
          <swiper v-bind="swiperOptionsLists">
            <swiperSlide v-for="(list, i) in likedLists" :key="i" class="column">
              <div class="col-8">
                <RouterLink :to="`/list/${list._id}`">
                  <CardStack :cards="list.films" :cardWidth="150" :stackWidth="'100%'" :cardHeight="210" :maxCards="4"
                    :paddingX="10">
                    <template v-slot:card="{ card }">
                      <img v-if="card.poster" :src="`https://image.tmdb.org/t/p/w300/${card.poster}`"
                        class="h100  rounded15 border5">
                      <div v-else class="h100 w100 bg-grey rounded15" style="border: 5px solid grey;"></div>
                    </template>
                  </CardStack>
                </RouterLink>

              </div>
              <q-item-section class="col-4 justify-around q-pl-md-md">
                <q-item-label lines="2" class="title3 lilita">{{ list.name }}</q-item-label>
                <q-item-label lines="1" class="row q-px-md">
                  <span class="col-auto ">
                    <router-link :to="`/profile/${list.user.username}/recent`" class="flex items-center">
                      <img :src=list.user.avatar class="round " style="width: 50px;">
                      <span class="text-h6 q-pl-md">{{ list.user.username }}</span>
                    </router-link>

                  </span>

                  <span class="col flex justify-end items-center">
                    <q-btn flat round icon="favorite" :color="list.likes.indexOf(currentUser._id) > -1 ? 'red' : 'black'"
                      @click=" likeList(list._id)" />
                    <span>{{ list.likes.length }}</span>
                  </span>
                </q-item-label>
              </q-item-section>
            </swiperSlide>
          </swiper>
        </div>
        <div class="col-1 relative">
          <div class="swiper-button-next" id="swiper-lists-next" style="top: auto !important;"></div>
        </div>
      </div>
      <div class="titles bdb4">Comments</div>
      <div class="column ">
        <div v-for="cmt in likedReviews" :key="cmt._id" class="col q-pa-md">
          <FilmReview v-bind="cmt"></FilmReview>
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
import { api, apiAuth } from 'src/boot/axios'
import { useUserStore } from 'stores/user'
import CardStack from 'components/CardStack.vue'
import FilmReview from 'src/components/FilmReview.vue'

const currentUser = useUserStore()
const route = useRoute()
const likedFilms = reactive([])
const likedReviews = reactive([])
const likedLists = reactive([])

const swiperOptionsFilms = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: '#swiper-films-prev',
    nextEl: '#swiper-films-next'
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
const swiperOptionsLists = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: '#swiper-lists-prev',
    nextEl: '#swiper-lists-next'
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
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
}
const likeList = async (id) => {
  await apiAuth.post('/lists/like', { id })
  getFav()
}
const getFav = async () => {
  const { data } = await api.get('/profile/likes/' + route.params.username)
  likedFilms.splice(0, likedFilms.length, ...data.result.films)
  likedReviews.splice(0, likedReviews.length, ...data.result.cmts)
  likedLists.splice(0, likedLists.length, ...data.result.likedLists)
}
onMounted(() => {
  getFav()
})
</script>

<style scoped>
.relative {
  position: relative !important;
}
</style>
