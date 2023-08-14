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
            <swiperSlide v-for="n in 30" :key="n">
              <img src="http://image.tmdb.org/t/p/w300//iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" style=" box-sizing: border-box;"
                class="rounded15 border5 ratio w100" />
            </swiperSlide>
          </swiper>
        </div>
        <div class="col-1 relative">
          <div class="swiper-button-next" id="swiper-next"></div>
        </div>
      </div>
      <div class="titles bdb4 ">Lists</div>
      <div class="bdb4">
        <template v-for="n in 3" :key="n">
          <div class="row q-py-md">
            <div class="col-12 col-md-4" style="height:240px ;">
              <!-- <div v-for="n in 5" :key="n" class=" overlapping"
                :style="`padding-left:calc( ${(n - 1)}vw + ${(n - 1) * 15}px);`">
                <img src="http://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" class="h100  rounded15 border5"
                  :style="`z-index:${n}`">
              </div> -->
              <CardStack :cards="cards1" :cardWidth="137" :stackWidth="'100%'" :cardHeight="200" :maxCards="5"
                :paddingX="10">
                <template v-slot:card>
                  <img src="http://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
                    class="h100  rounded15 border5">
                </template>
              </CardStack>
            </div>
            <q-item-section class="col-12 col-md-8 justify-around q-pl-md-md">
              <q-item-label lines="2" class="title3">a very fucking long title</q-item-label>
              <q-item-label lines="1">100 films <q-icon name="favorite" class="q-ml-sm" />20</q-item-label>
            </q-item-section>
          </div>
        </template>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-6 q-pa-md">
          <div class="bdb4 flex justify-between items-end"><span class="titles">Watchlist</span> <span
              class="text-h6 q-mb-lg">100</span></div>
          <CardStack :cards="cards1" :stackWidth="'100%'" :cardWidth="137" :cardHeight="200" :paddingX="20" :maxCards="8">
            <template v-slot:card>
              <img src="http://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" class="h100  rounded15 border5">
            </template>
          </CardStack>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <div class="bdb4 flex justify-between items-end"><span class="titles">Following</span> <span
              class="text-h6 q-mb-lg">100</span></div>
          <div class="row q-pt-md">
            <img v-for="n in 6" :key="n" class="round col-2"
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
import CardStack from 'components/CardStack.vue'

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

const cards1 = [
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 },
  { a: 1 }
]
// console.log(swiperOptions)
</script>
<style scoped>
/* .overlapping {
  position: absolute;
  height: 200px;
}

.ov-container {
  overflow: hidden;
  display: flex;
  align-items: center;
} */

.relative {
  position: relative !important;
}
</style>
