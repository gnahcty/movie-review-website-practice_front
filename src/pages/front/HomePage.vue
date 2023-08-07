<template>
  <Swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :modules="modules"
    class="mySwiper " style="height:90vh">
    <swiper-slide>
      <div class="column window-height" style="box-sizing: border-box;">
        <p class="titles">Popular This Week</p>
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="black" padding arrows infinite height="65%" style="width: 100vw;">
          <q-carousel-slide :name="index + 1" v-for="(filmGroup, index) in filmGroups" :key="index"
            class="column no-wrap fit">
            <div class="row fit justify-start items-center q-gutter-md q-col-gutter no-wrap" style="padding-right: 60px;">
              <q-img v-for="(film, filmIndex) in filmGroup" fit="contain" :key="filmIndex" class=" col-3 full-height"
                :scale="3 / 4" :src="'http://image.tmdb.org/t/p/w300/' + film.poster_path" style="border-radius: 15px;" />
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
          <q-carousel-slide :name="index + 1" v-for="(reviewGroup, index) in reviewGroups" :key="index"
            class="wrapper fit flex flex-center">
            <template v-for="(review, reviewIndex) in reviewGroup" :key="reviewIndex">
              <q-card class="rounded bg-grey fit">
                <q-card-section horizontal class="fit row items-center">
                  <RouterLink :to="'/films/' + review.film" class="col-3 flex items-center full-height">
                    <q-card-section class="q-pr-none fit" style="box-sizing: border-box;">
                      <q-img :src="'http://image.tmdb.org/t/p/w300/' + review.poster" :ratio="3 / 4"
                        class="rounded fit" />
                    </q-card-section>
                  </RouterLink>
                  <q-card-section class="col-9 full-height">
                    <q-item class="fit q-pa-none">
                      <q-item-section class="column">
                        <q-item-label lines="1" class="col-4 row">
                          <span class="text-h4 text-bold col text-no-wrap"
                            style="text-overflow: ellipsis; overflow: hidden;">{{
                              review.title }}</span>
                          <span class="text-h6 q-ml-md col-3">{{ review.year }}</span>
                        </q-item-label>
                        <q-item-label lines="1" class="col-2">
                          <q-avatar size="sm"> <img :src=review.user.avatar></q-avatar>
                          <span class="q-ml-xs q-mr-sm">{{ review.user.username }}</span>
                          <q-rating v-model="review.ratings" :max="review.ratings" size="1em" icon="star_border"
                            icon-selected="star" icon-half="star_half" readonly />
                          <q-icon v-if="review.like" name="favorite" color="red" class="q-ml-sm" />
                        </q-item-label>
                        <q-item-label caption lines="3" class="col-4">{{ review.comments }}</q-item-label>
                        <q-item-label lines="1" class="col">
                          <q-icon name="favorite" class="q-mr-sm" />
                          <span class="q-mr-xs">{{ review.cmtLikes.length }}</span>likes
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </swiper-slide>
    <!-- page 2 end -->
    <swiper-slide>
      <div class="column window-height " style="box-sizing: border-box;">
        <p class="titles">Popular Users</p>
        <div class="row q-gutter-x-md flex-center full-width q-px-xl" style="height: 70%;">
          <div class="bg-grey full-height col-3 arched column flex-center">
            <!-- 1 -->
            <div class="round bg-black" style="width: 72%;">
            </div>
            <!-- 2 -->
            <span class="text-bold text-h3">username</span>
            <!-- 3 -->
            <div class="text-bold row">
              <span>1.8k films</span> <span>1.3k reviews</span>
            </div>
            <!-- 4 -->
            <div class="col-3 row col-3">
              <div class="col"><img src="https://picsum.photos/300/200/?random=10"></div>
              <div class="col"><img src="https://picsum.photos/300/200/?random=10"></div>
              <div class="col"><img src="https://picsum.photos/300/200/?random=10"></div>
            </div>
          </div>
          <div class="bg-blue full-height col-3 arched"></div>
          <div class="bg-grey full-height col-3 arched"></div>
        </div>
      </div>
    </swiper-slide>

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
const reviewGroups = reactive([])

const getTrendingFilms = async () => {
  const { data } = await api.get('/films/trending')
  const films = data.results.results
  for (let i = 0; i < films.length; i += 4) {
    filmGroups.push(films.slice(i, i + 4))
  }
}

const getPopReviews = async () => {
  const { data } = await api.get('reviews/pop')
  const reviews = data.results
  for (let i = 0; i < reviews.length; i += 6) {
    reviewGroups.push(reviews.slice(i, i + 6))
  }
}

onMounted(
  getTrendingFilms(),
  getPopReviews()
)
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
  grid-template-rows: 33% 33% 33%;
  grid-gap: 10px;
}

.round {
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.rounded {
  border-radius: 15px;
}

.arched {
  border-radius: 222px 222px 0 0;
}
</style>
