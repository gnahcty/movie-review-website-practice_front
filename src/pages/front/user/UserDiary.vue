<template>
  <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" swipeable animated
    control-color="black" padding arrows infinite height="80vh" style="width: 80vw;" class="self-center">
    <q-carousel-slide :name="1" class="wrapper fit flex flex-center">
      <template v-for="n in 6" :key="n">
        <q-card class="cmt bg-blue fit q-pa-sm">
          <q-card-section horizontal class="fit row items-center">
            <q-card-section class="col-3 items-center">
              <q-img src="https://picsum.photos/500/300" :ratio="3 / 4" style="border-radius: 15px;" />
            </q-card-section>

            <q-card-section>
              lorem
            </q-card-section>
          </q-card-section>
        </q-card>
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
