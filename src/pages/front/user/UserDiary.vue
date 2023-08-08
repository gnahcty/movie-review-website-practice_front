<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 90vh">

      <template v-slot:before>
        <div class="fit bg-grey q-pa-xl flex flex-center column q-gutter-y-md">
          <img class="col-8" src="https://picsum.photos/300/400/?random=10">
          <q-rating v-model="ratingModel" size="50px" icon="star" />
          <div class="flex flex-center q-gutter-x-lg">
            <q-icon name="print" size="70px" />
            <q-icon name="print" size="70px" />
            <q-icon name="print" size="70px" />
          </div>
          <q-btn color="primary" label="Review" style="width: 12vw; aspect-ratio: 7/2;" />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
            assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

    </q-splitter>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const splitterModel = ref(36)
const ratingModel = 5
</script>
