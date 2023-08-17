<template>
  <div class="q-pa-md flex justify-center">
    <div style="max-width: 90%; width: 80vw;">
      <UserList :userList="top20" @follow="follow"></UserList>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
// import { useUserStore } from 'stores/user'
import UserList from 'src/components/UserList.vue'

// const user = useUserStore()
const top3 = reactive([])
const top20 = reactive([])

const follow = async (username) => {
  await apiAuth.post('users/follow', { username })
  getPopUsers()
}
const getPopUsers = async () => {
  const { data } = await api.get('users/pop')
  top3.push(...data.top3)
  top20.push(...data.top20)
}

onMounted(() => {
  getPopUsers()
})
</script>

<style lang="sass" scoped>

</style>
