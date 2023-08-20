<template>
  <div padding class="row justify-center q-pt-xl">
    <div class="col-12 col-md-10 col-lg-8 row">
      <div class=" col-12 col-md-8 q-px-md">
        <div class="titles bdb4">{{ list.name }}</div>
        <div class="row">
          <div class="col-6 col-md-4 col-lg-3 q-pa-md flex flex-center" v-for="(film) in list.films" :key="film.id">
            <router-link :to="'/films/' + film.id">
              <img :src="'http://image.tmdb.org/t/p/w300/' + film.poster" class="w100 rounded15 border5">
            </router-link>
          </div>
        </div>

      </div>
      <div class=" col-12 col-md-4 q-pa-xl">
        <div class="row w100 justify-start items-center">
          <div class="col-5">
            <router-link :to="`/profile/${list.user?.username}/recent`">
              <img :src=list.user?.avatar class="w100">
            </router-link>
          </div>
          <div class="col-auto title3 q-ml-sm text-bold text-center">{{ list.user?.username }}</div>
        </div>
        <div class="q-my-md q-pl-lg q-pb-md flex w100 justify-between items-center bdb4">
          <span class="text-h6">{{ list.films?.length }} films</span>
          <span><q-btn flat round icon="favorite" @click="loginTryCatch(() => like(list._id))"
              :color="list.likes?.indexOf(currentUser._id) === -1 ? 'black' : 'red'" />
            {{ list.likes?.length }}</span>
        </div>
        <div v-if="list.description" class="q-pa-lg text-h5 text-bold">{{ list.description }}</div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api, apiAuth } from 'src/boot/axios'
import { useLogin } from 'src/utils/checkLogin'
import { useUserStore } from 'src/stores/user'

const currentUser = useUserStore()
const { loginTryCatch } = useLogin()
const route = useRoute()
const list = reactive({})
const getDetails = async () => {
  const { data } = await api.get(`lists/${route.params.id}`)
  Object.assign(list, data.results)
}
const like = async (id) => {
  await apiAuth.post('lists/like', { id })
  getDetails()
}
onMounted(getDetails)
</script>

<style lang="scss" scoped></style>
