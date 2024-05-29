<template>
  <q-intersection v-for="user of props.userList" :key="user._id" transition="flip-right"
    style="height: 200px; width: 80%;" once>
    <div class="arch-wrapper bgea">
      <q-item class="row">
        <q-item-section class="col-auto" avatar>
          <router-link :to="`/profile/${user.username}/recent`">
            <img class="round q-pa-lg" style="width: 100%; max-height:25vh" :src=user.avatar>
          </router-link>
        </q-item-section>
        <q-item-section class="col-3">
          <q-item-label style="font-weight: 800;" class="title2 text-bold">{{ user.username }}</q-item-label>
          <q-item-label style="margin-top: 10px !important;" v-if="user.username !== CurrentUser.username">
            <q-btn class="text-black" :label="user.followers?.indexOf(CurrentUser._id) !== -1 ? 'followed' : 'follow'"
              :color="user.followers?.indexOf(CurrentUser._id) !== -1 ? 'light-green-14' : 'white'"
              @click="$emit('follow', user.username)" /></q-item-label>
        </q-item-section>
        <q-item-section class="col text-center">
          <q-item-label class="text-bold">{{ user.watched }}</q-item-label>
          <q-item-label>films</q-item-label>
        </q-item-section>
        <q-item-section class="col text-center">
          <q-item-label class="text-bold">{{ user.reviewed }}</q-item-label>
          <q-item-label>reviews</q-item-label>
        </q-item-section>
        <q-item-section class="col text-center">
          <q-item-label class="text-bold">{{ user.followers?.length }}</q-item-label>
          <q-item-label>followers</q-item-label>
        </q-item-section>
        <q-item-section class="col text-center">
          <q-item-label class="text-bold">{{ user.following?.length }}</q-item-label>
          <q-item-label>following</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-intersection>
</template>

<script setup>
import { useUserStore } from 'stores/user'

const CurrentUser = useUserStore()

const props = defineProps({
  userList: {
    type: Array,
    default: () => []
  }
})

defineEmits(['follow'])

</script>

<style lang="scss" scoped>
.arch-wrapper {
  border: 4px solid #000;
  border-radius: 132px 0 0 132px;
  // overflow-x: hidden;
}
</style>
