<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section ">
        <p class="listTitles">Popular This Week</p>
        <div class="row items-center" style="width:100%">
          <div class="col-1 relative">
            <div class="swiper-button-prev" id="swiper-pop-prev" style="top: auto !important;"></div>
          </div>
          <div class="col-10">
            <swiper v-bind="swiperOptionsPop">
              <swiperSlide v-for="(list, i) in pop" :key="i" class="column">
                <div class="col-8">
                  <RouterLink :to="`/list/${list._id}`">
                    <CardStack :cards="list.films" :cardWidth="283" :stackWidth="'100%'" :cardHeight="420" :maxCards="4"
                      :paddingX="10">
                      <template v-slot:card="{ card }">
                        <img v-if="card.poster" :src="`http://image.tmdb.org/t/p/w300/${card.poster}`"
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
                      <q-btn flat round icon="favorite"
                        :color="list.likes.indexOf(currentUser._id) > -1 ? 'red' : 'black'"
                        @click=" likeList(list._id)" />
                      <span>{{
                        list.likes.length }}</span>
                    </span>
                  </q-item-label>
                </q-item-section>
              </swiperSlide>
            </swiper>
          </div>
          <div class="col-1 relative">
            <div class="swiper-button-next" id="swiper-pop-next" style="top: auto !important;"></div>
          </div>
        </div>
      </div>
      <div class="section ">
        <p class="listTitles ">Newly Added</p>
        <div class=" row items-center" style="width:100%">
          <div class="col-1 relative">
            <div class="swiper-button-prev" id="swiper-new-prev" style="top: auto !important;"></div>
          </div>
          <div class="col-10">
            <swiper v-bind="swiperOptionsNew">
              <swiperSlide v-for="(list, i) in newList" :key="i" class="column">
                <div class="col-8">
                  <RouterLink :to="`/list/${list._id}`">
                    <CardStack :cards="list.films" :cardWidth="283" :stackWidth="'100%'" :cardHeight="420" :maxCards="4"
                      :paddingX="10">
                      <template v-slot:card="{ card }">
                        <img v-if="card.poster" :src="`http://image.tmdb.org/t/p/w300/${card.poster}`"
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
                      <q-btn flat round icon="favorite"
                        :color="list.likes.indexOf(currentUser._id) > -1 ? 'red' : 'black'"
                        @click=" likeList(list._id)" />
                      <span>{{ list.likes.length }}</span>
                    </span>
                  </q-item-label>
                </q-item-section>
              </swiperSlide>
            </swiper>
          </div>
          <div class="col-1 relative">
            <div class="swiper-button-next" id="swiper-new-next" style="top: auto !important;"></div>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script setup>

const options = {
  licenseKey: 'gplv3-license'
}

import { onMounted, reactive } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import CardStack from 'src/components/CardStack.vue'
import { useUserStore } from 'stores/user.js'

const currentUser = useUserStore()

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'

const swiperOptionsPop = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: '#swiper-pop-prev',
    nextEl: '#swiper-pop-next'
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
const swiperOptionsNew = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: '#swiper-new-prev',
    nextEl: '#swiper-new-next'
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

const pop = reactive([])
const newList = reactive([])
const getPopLists = async () => {
  const { data } = await api.get('/lists/pop')
  pop.push(...data.results)
}
const getNewLists = async () => {
  const { data } = await api.get('/lists/new')
  newList.push(...data.results)
}

const likeList = async (id) => {
  await apiAuth.post('/lists/like', { id })
  getPopLists()
  getNewLists()
}
onMounted(() => {
  getPopLists()
  getNewLists()
}
)
</script>

<style scoped>
.section {
  padding-top: 10vh;
  overflow: hidden;
}

.listTitles {
  padding-left: 60px;
  font-family: Lilita One;
  font-size: min(max(8.5vw, 40px), 122px);
  font-weight: 400;
}
</style>
