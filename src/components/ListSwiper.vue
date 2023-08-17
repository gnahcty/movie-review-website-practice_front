<template>
  <div class="row items-center h100 w100">
    <div class="col-1 relative">
      <div class="swiper-button-prev" id="swiper-prev" style="top: auto !important;"></div>
    </div>
    <div class="col-10">
      <swiper v-bind="props.swiperOptions">
        <swiperSlide v-for="(list, i) in props.list" :key="i" class="column">
          <div class="col-8">
            <RouterLink :to="`/list/${list._id}`">
              <CardStack :cards="list.films" :cardWidth="props.cardStackOptions.cardWidth"
                :stackWidth="props.cardStackOptions.stackWidth" :cardHeight="props.cardStackOptions.cardHeight"
                :maxCards="props.cardStackOptions.maxCards" :paddingX="props.cardStackOptions.paddingX">
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
                <q-btn flat round icon="favorite" :color="list.likes.indexOf(currentUser._id) > -1 ? 'red' : 'black'"
                  @click="$emit('like', list._id)" />
                <span>{{ list.likes.length }}</span>
              </span>
            </q-item-label>
          </q-item-section>
        </swiperSlide>
      </swiper>
    </div>
    <div class="col-1 relative">
      <div class="swiper-button-next" id="swiper-next" style="top: auto !important;"></div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import CardStack from 'src/components/CardStack.vue'
import { useUserStore } from 'stores/user.js'

const currentUser = useUserStore()
defineEmits(['like'])

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/grid'
import { Navigation } from 'swiper'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  swiperOptions: {
    type: Object,
    default: () => ({
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
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    })
  },
  cardStackOptions: {
    type: Object,
    default: () => ({
      cardWidth: 233,
      stackWidth: '100%',
      cardHeight: 345,
      maxCards: 4,
      paddingX: 10
    })
  }
})

</script>
