<template>
  <Swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :modules="modules"
    class="mySwiper window-height">
    <swiper-slide>
      <div class="column window-height" style="box-sizing: border-box;">
        <p class="titles">Popular This Week</p>
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="black" padding arrows infinite height="65%" style="width: 100vw;">
          <q-carousel-slide :name="index + 1" v-for="(filmGroup, index) in filmGroups" :key="index"
            class="column no-wrap fit">
            <div class="row fit justify-start items-center q-gutter-md q-col-gutter no-wrap" style="padding-right: 60px;">
              <q-img v-for="(film, filmIndex) in filmGroup" fit="contain" :key="filmIndex"
                class="rounded-borders col-3 full-height" scale="3/4"
                :src="'http://image.tmdb.org/t/p/w300/' + film.poster_path" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <!-- page 1 end -->
    </swiper-slide>

    <!-- page 2 start -->
    <swiper-slide>
      <div class="column window-height" style="box-sizing: border-box;">
        <p class="titles">Popular Comments</p>
        <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="black" padding arrows infinite height="65%" style="width: 80vw;" class="self-center">
          <q-carousel-slide :name="1" class="wrapper fit flex flex-center">
            <template v-for="n in 6" :key="n">
              <div class="cmt bg-blue row fit q-pa-md">
                <q-img src="https://picsum.photos/500/300" :ratio="3 / 4" class="full-height col-3 "
                  style="border-radius: 15px;" />
              </div>
            </template>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
              <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>

  </Swiper>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/vue'
register()
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/mousewheel'
import 'swiper/css/navigation'
import { Mousewheel, Pagination, Navigation } from 'swiper/modules'
import { api } from 'src/boot/axios'
const modules = [Mousewheel, Pagination, Navigation]

const slide = ref(1)
const slide2 = ref(1)
const filmGroups = reactive([])

const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  const films = data.results.results
  for (let i = 0; i < films.length; i += 4) {
    filmGroups.push(films.slice(i, i + 4))
  }
}

onMounted(getTrendingFilms)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
</style>

<style scoped>
.titles {
  padding-left: 60px;
  font-family: Lilita One;
  font-size: 6rem;
  font-weight: 400;
}

.wrapper {
  display: grid;
  grid-template-columns: 30vw 30vw;
  grid-template-rows: 33.3% 33.3% 33.3%;
  grid-gap: 5px;
}

.cmt {
  border-radius: 15px;
}
</style>
