<template>
  <Swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :modules="modules"
    class="mySwiper window-height">
    <swiper-slide>
      <p class="titles">Popular This Week</p>
      <swiper :slidesPerView="4" :navigation="true" :spaceBetween="24" :pagination="{
        clickable: true,
      }" :modules="modules" class="mySwiper q-pa-xl" style="height: 410px; ">
        <template v-for="n in 10" :key="n">
          <swiper-slide>
            <q-card class="my-card" style="width: 275px;">
              <img src="https://cdn.quasar.dev/img/mountains.jpg">
              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </q-card-section>
            </q-card>
          </swiper-slide>

        </template>

      </swiper>
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>

  </Swiper>
</template>

<script setup>
// import { ref } from 'vue'
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/vue'
register()
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/mousewheel'
import 'swiper/css/navigation'
import { Mousewheel, Pagination, Navigation } from 'swiper/modules'
const modules = [Mousewheel, Pagination, Navigation]
// const slide = ref('style')
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
</style>

<style scoped>
.titles {
  font-family: Lilita One;
  font-size: 6rem;
  font-weight: 400;
}
</style>
