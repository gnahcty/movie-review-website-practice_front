<template>
  <div class="row items-center h100 w100 lt-md">
    <div class="col-1 relative">
      <div class="swiper-button-prev swiper-prev" id="swiper-prev" style="top: auto !important;"></div>
    </div>
    <div class="col-10">
      <swiper v-bind="swiperOptions">
        <swiperSlide v-for="n in 12" :key="n" class="column">
          <div class="col bg-grey">{{ n }}</div>
        </swiperSlide>
      </swiper>
    </div>
    <div class="col-1 relative">
      <div class="swiper-button-next swiper-next" id="swiper-next" style="top: auto !important;"></div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation, Grid } from 'swiper'

const swiperOptions = {
  spaceBetween: 10,
  grid: {
    rows: 3,
    fill: 'row'
  },
  navigation: {
    prevEl: '.swiper-prev',
    nextEl: '.swiper-next'
  },
  modules: [Navigation, Grid]
}

</script>

<style lang="scss" scoped></style>
