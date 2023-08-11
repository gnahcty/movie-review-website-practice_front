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
              <img src="http://image.tmdb.org/t/p/w300//iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
                style="aspect-ratio:3 / 4 !important; width: 100% !important ;" class="rounded15 border5" />
            </swiperSlide>
          </swiper>
        </div>
        <div class="col-1 relative">
          <div class="swiper-button-next" id="swiper-next"></div>
        </div>
      </div>
      <div class="titles bdb4">Lists</div>
      <template v-for="n in 3" :key="n">
        <div class="row" style="height:230px ;">
          <div class="col-12 col-md-4  h100">
            <div v-for="n in 5" :key="n" class="overlapping flex flex-center" :style="`left: ${n * 40}px`">
              <img src="http://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" class="h100 rounded15 border5">
            </div>
          </div>
          <q-item-section class="col-12 col-md-8 justify-around h100">
            <q-item-label lines="2" class="text-h3 text-bold">a very fucking long title</q-item-label>
            <q-item-label lines="1">100 films <q-icon name="favorite" />20</q-item-label>
          </q-item-section>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'

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
// console.log(swiperOptions)
</script>
<style scoped>
.titles {
  font-family: Lilita One;
  font-size: 6rem;
  font-weight: 400;
}

.overlapping {
  position: absolute;
  height: 200px;
  top: 0;
  bottom: 0;
  margin: auto;
}

.relative {
  position: relative !important;
}
</style>
