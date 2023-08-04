<template>
  <Swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :modules="modules"
    class="mySwiper window-height">
    <swiper-slide>
      <div class="column window-height" style="box-sizing: border-box;">
        <p class="titles">Popular This Week</p>
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="black" padding arrows infinite height="70%" style="width: 100vw;">
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
    <swiper-slide>

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
</style>
