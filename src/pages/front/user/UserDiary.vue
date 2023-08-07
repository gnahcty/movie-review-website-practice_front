<template>
  <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
    control-color="black" padding arrows infinite height="80vh" style="width: 80vw;" class="self-center">
    <q-carousel-slide :name="1" class="wrapper fit flex flex-center">
      <template v-for="n in 6" :key="n">
        <q-item clickable v-ripple class="fit">
          <q-item-section avatar>
            <q-img src="https://picsum.photos/500/300" :ratio="3 / 4" class="full-height  " style="border-radius: 5px;" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>
      </template>

    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from 'vue'

const slide2 = ref(1)

</script>

<style lang="scss" scoped>
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
