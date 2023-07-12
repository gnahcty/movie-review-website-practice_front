<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input flat
        v-model="name"
        label="search"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script setup>
import { api } from '../../../boot/axios'
import { ref } from 'vue'

const name = ref(null)

const onSubmit = async () => {
  try {
    console.log(name.value)
    const { data } = await api.get('/films/', { params: { name: name.value } })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const onReset = () => {
  name.value = null
}

</script>
