<template>
  <q-layout view="lhh lpR fFf" :style="hStyle">
    <q-header reveal class="column text-black" id="header" :style="hStyle">
      <q-toolbar class="col-2">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="row col-8 justify-center">
        <div class="col-md-8 col-12 row items-center" id="profile">
          <div class="col-12 col-md-6">
            <q-item class="row">
              <q-item-section avatar class="col-5">
                <img class="round" style="width: 100%;"
                  src="https://cdn.discordapp.com/attachments/1109403221245571167/1139384610376138752/IMG_7910.png">
              </q-item-section>

              <q-item-section>
                <q-item-label style="font-size: xx-large; font-weight: 800;">Username</q-item-label>
                <q-item-label style="margin-top: 10px !important;">
                  <q-btn color="white" label="follow" class="text-black" @click="follow()" /></q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12  col-md-6 row">
            <div class="col column text-center"> <span class="text-bold text-h6">1529</span><span>films</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">1529</span><span>films</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">1529</span><span>films</span></div>
            <div class="col column text-center"> <span class="text-bold text-h6">1529</span><span>films</span></div>
          </div>
        </div>
      </div>
      <div class="col row justify-center">
        <div class="col-md-8 col-12 row items-center">
          <q-tabs align="left" indicator-color="transparent" class="q-mt-md col-2 row window-width">
            <q-route-tab to="recent" label="recent" class="col-sm col-md-2 q-py-sm"
              style="background-color: #ffe500 ; opacity: 1 ;" />
            <q-route-tab to="likes" label="favorites" class="col-sm col-md-2 q-py-sm"
              style="background-color:#00e0ff ; opacity: 1 ;" />
          </q-tabs>
        </div>
      </div>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()

const hStyle = computed(() => {
  return `background-color: ${route.meta.bg}`
})

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
#header {
  height: 45vh;
  transition-duration: 0.5s !important;
}

#profile {
  border-bottom: 4px solid #000;
}

:deep(.q-tab__label) {
  font-size: 2rem !important;
}
</style>
