<template>
  <!-- 283*420 -->
  <!-- FIXME: like*2時不會響應 -->
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <div class="column">
          <div class="listTitles col-auto">Popular This Week</div>
          <ListSwiper :list="pop" @like="likeList" class="col"></ListSwiper>
        </div>
      </div>
      <div class="section ">
        <div class="column">
          <div class="listTitles ">Newly Added</div>
          <ListSwiper :list="newList" @like="likeList" class="col"></ListSwiper>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script setup>

const options = {
  licenseKey: 'gplv3-license'
}

import { onMounted, reactive } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import ListSwiper from 'src/components/ListSwiper.vue'

const pop = reactive([])
const newList = reactive([])

const getPopLists = async () => {
  const { data } = await api.get('/lists/pop')
  pop.splice(0, pop.length, ...data.results)
}
const getNewLists = async () => {
  const { data } = await api.get('/lists/new')
  newList.splice(0, newList.length, ...data.results)
}

const likeList = async (id) => {
  await apiAuth.post('/lists/like', { id })
  getPopLists()
  getNewLists()
}
onMounted(() => {
  getPopLists()
  getNewLists()
}
)
</script>

<style scoped>
.section {
  padding-top: 10vh;
  overflow: hidden;
}

.listTitles {
  box-sizing: border-box;
  margin-left: 60px;
  font-family: Lilita One;
  font-size: min(max(6.7vw, 40px), 122px);
  font-weight: 400;
}
</style>
