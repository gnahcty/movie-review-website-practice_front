<template>
  <q-btn flat dense round icon="menu" aria-label="Menu" @click="tabQuery = 'a'" />

  <q-dialog :model-value="showDialog" persistent>
    <q-card>
      <q-tabs v-model="tabQuery">
        <q-tab name="a" label="AAA" />
        <q-tab name="b" label="BBB" />
      </q-tabs>
      <q-tab-panels v-model="tabQuery">
        <q-tab-panel name="a">
          <q-btn @click="tabQuery = ''">CLOSE</q-btn>
        </q-tab-panel>
        <q-tab-panel name="b">
          <q-btn @click="tabQuery = ''">CLOSE</q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useRouteQuery } from '@vueuse/router'

const tabQuery = useRouteQuery('tab', '')

const showDialog = computed(() => {
  return tabQuery.value !== ''
})
</script>
