<template>
  <q-intersection v-for="user of props.userList" :key="user._id" transition="flip-right" style="height: 200px;"
    class="w100">
    <div class="arch-wrapper">
      <q-item class="row">
        <q-item-section class="col-auto" avatar>
          <router-link :to="`/profile/${user.username}/recent`">
            <img class="round q-pa-lg" style="width: 100%;" :src=user.avatar>
          </router-link>
        </q-item-section>
        <q-item-section class="col-3">
          <q-item-label style="font-weight: 800;" class="title2 text-bold">{{ user.username }}</q-item-label>
          <q-item-label style="margin-top: 10px !important;" v-if="user.username !== user.username">
            <q-btn unelevated class="text-black"
              :label="user.followers?.some(follower => follower._id === CurrentUser._id) ? 'followed' : 'follow'"
              :color="user.followers?.some(follower => follower._id === CurrentUser._id) ? 'light-green-14' : 'white'"
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

<style lang="scss" scoped></style>
