<template>
  <swiper-container :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper-container>
</template>

<script setup>
import { register } from 'swiper/element/bundle'
import { SwiperContainer, SwiperSlide } from 'swiper/vue'
// import { Mousewheel, Pagination } from 'swiper/modules';

register()

</script>
