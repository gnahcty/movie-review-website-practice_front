<template>
    <q-card class="my-card" flat bordered>
      <q-img :ratio="3/4" src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-top-right" style="background: transparent; padding: 0;">
          <q-btn flat round color="grey" icon="add" id="add" class="absolute-top-right"/>
        </div>
      </q-img>
      <q-card-actions align="left">
        <q-btn flat round color="green" icon="visibility"/>
        <span style="color: green;">00</span>
        <q-btn flat round color="yellow" icon="segment"/>
        <span style="color: goldenrod;">00</span>
        <q-btn flat round color="red" icon="favorite"/>
        <span style="color: red;">00</span>
      </q-card-actions>
    </q-card>
</template>

<script setup>
// import { api } from '../../../boot/axios'
// import { ref } from 'vue'

// const name = ref(null)

// const onSubmit = async () => {
//   try {
//     const title = name.value
//     const { data } = await api.get(`/films/search/:${title}`)
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// }

</script>
<style>
.my-card{
  width:200px;
  border: none;
}
span{
  margin-right: 5px;
  margin-right: 0px;
}
#add:hover{
  color: white;
}
</style>
