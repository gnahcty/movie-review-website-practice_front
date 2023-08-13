<template>
  <CardStack :cards="cards" :stackWidth="'70%'" :cardWidth="280">
    <template v-slot:card="{ card }">
      <div style="width: 100%; height: 100%;" :style="{ background: card.background }"></div>
    </template>
  </CardStack>
</template>

<script setup>
import CardStack from 'components/CardStack.vue'
const cards = [
  { background: '#00659d' },
  { background: '#00abbc' },
  { background: '#e2c58a' },
  { background: '#fc8890' },
  { background: '#b35d7f' }
]
</script>

<style lang="scss" scoped></style>
