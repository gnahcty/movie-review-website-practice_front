<template>
  <div class="stack_wrapper" ref="containerRef">
    <div class="stack_stack" :style="{
      height: `${cardHeight + paddingY * 2}px`,
      width: containerWidth,
    }">
      <div class="stack_card" v-for="(card, index) in stack" :key="index" :style="{
        display: card.display,
        top: `${card.yPos}px`,
        width: `${card.width}px`,
        height: `${card.height}px`,
        zIndex: card.zIndex,
        transform: `translate(${card.xPos}px, 0)`
      }">
        <slot v-bind:card="card" name="card"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { debounce } from 'src/utils/debounce'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  cardWidth: {
    type: Number,
    default: () => 300
  },
  cardHeight: {
    type: Number,
    default: () => 400
  },
  stackWidth: {
    type: [Number, String],
    default: () => null
  },
  maxCards: {
    type: Number,
    default: () => 10
  },
  paddingX: {
    type: Number,
    default: () => 20
  },
  paddingY: {
    type: Number,
    default: () => 20
  }
})

const stack = reactive([])

const containerRef = ref(null)
const responsiveWidth = ref(0)

function init () {
  stack.push(...props.cards.map((card, index) => {
    return {
      ...card,
      display: index < _maxCards.value ? 'block' : 'none',
      xPos: props.paddingX + xOffset.value * index,
      yPos: props.paddingY,
      width: props.cardWidth,
      height: props.cardHeight,
      zIndex: index
    }
  }))
}

// _maxCards = props.maxCards || props.cards.length
const _maxCards = computed(() =>
  props.cards.length > props.maxCards ? props.maxCards : props.cards.length
)

// container寬度，預設為卡片寬度+px*2，可設px或%數
const containerWidth = computed(() => {
  if (!props.stackWidth) {
    return `${props.cardWidth + props.paddingX * 2}px`
  } else if (typeof props.stackWidth === 'number') {
    return `${props.stackWidth}px`
  }
  return props.stackWidth
})

// 預設為卡片寬度+px*2，可設px，若設定為%數，就設為container的內寬度
const _stackWidth = computed(() => {
  if (!props.stackWidth) {
    return props.cardWidth + props.paddingX * 2
  } else if (typeof props.stackWidth === 'number') {
    return props.stackWidth
  }
  return responsiveWidth.value || containerRef.value.clientWidth
})

// x位移量
const xOffset = computed(() =>
  (_stackWidth.value - props.paddingX * 2 - props.cardWidth) / (_maxCards.value - 1)
)

// 視窗resize時，以container的內寬度更新responsiveWidth
const handleResize = debounce(() => {
  responsiveWidth.value = containerRef.value.clientWidth
  nextTick(() => {
    for (const i in stack) {
      stack[i].xPos = props.paddingX + xOffset.value * i
    }
  })
}, 250)

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.stack_wrapper {
  position: relative;
}

.stack_stack {
  position: relative;
  overflow: hidden;
  margin: auto;
}

.stack_card {
  position: absolute;
  transform-origin: 0 50%;
}
</style>
