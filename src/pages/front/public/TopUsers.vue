<template>
  <div class="row flex-center" style="overflow-x: clip;">
    <div class="col-12 col-md-8">
      <div class="titles">Top Users</div>
      <div class="row q-gutter-lg">
        <template v-for="user in top3" :key="user.username">
          <UserArch v-bind="user" class="col"></UserArch>
        </template>
      </div>
      <div class="q-pt-md flex justify-center w100 q-gutter-y-lg">
        <UserList :userList="top20" @follow="follow"></UserList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import UserList from 'src/components/UserList.vue'
import UserArch from 'src/components/UserArch.vue'

const top3 = reactive([])
const top20 = reactive([])

const follow = async (username) => {
  await apiAuth.post('users/follow', { username })
  getPopUsers()
}
const getPopUsers = async () => {
  const { data } = await api.get('users/pop')
  top3.splice(0, top3.length, ...data.top3)
  top20.splice(0, top20.length, ...data.top20)
}

onMounted(() => {
  getPopUsers()
})
</script>

<style scoped>
.arched {
  border-radius: 222px 222px 0 0;
  height: 33vw;
  border: 4px solid #000;
}
</style>
