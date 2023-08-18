<template>
  <q-dialog :model-value="loginModal" persistent>
    <q-card style="width: 400px;">
      <q-tabs v-model="tab" class="bg-grey-2 text-grey-7" active-color="black" indicator-color="black" align="justify">
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <!-- 登入頁面 -->
        <q-tab-panel name="login" class="q-px-xl flex-center">
          <q-form @submit="loginSubmit">
            <div class="row">
              <q-input label="Username" v-model="form.username"
                :rules="[rules.isString, rules.required, rules.min4, rules.max10]" lazy-rules class="col">
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password"
                :rules="[rules.isString, rules.required, rules.min4, rules.max20]" lazy-rules>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="row q-gutter-md flex-center">
              <q-btn outline label="cancel" color="grey" type="reset" class="q-mt-md" @click="tab = ''" />
              <q-btn outline label="submit" type="submit" class="q-mt-md" />
            </div>
          </q-form>
        </q-tab-panel>
        <!-- 註冊頁面  -->
        <q-tab-panel name="register" class="q-px-xl flex-center">
          <q-form @submit="regSubmit">
            <div class="row">
              <q-input label="Username" v-model="form.username"
                :rules="[rules.isString, rules.required, rules.min4, rules.max10]" lazy-rules class="col">
              </q-input>
            </div>
            <div class="row">
              <q-input type="email" label="email" class="col" v-model="form.email"
                :rules="[rules.isString, rules.required, rules.isEmail]" lazy-rules>
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password"
                :rules="[rules.isString, rules.required, rules.min4, rules.max20]" lazy-rules>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Confirm Password" class="col"
                v-model="form.confirmPassword" :rules="[rules.required, rules.confirmPassword]" reactive-rules>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="row q-gutter-md flex-center">
              <q-btn outline label="cancel" color="grey" type="reset" class="q-mt-md" @click="tab = ''" />
              <q-btn outline label="submit" type="submit" class="q-mt-md" />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import validator from 'validator'
import { useRouteQuery } from '@vueuse/router'
import { useUserStore } from 'stores/user.js'
import { api } from 'boot/axios.js'

const $q = useQuasar()

const isPwd = ref(true)
const currentUser = useUserStore()
const router = useRouter()
const route = useRoute()
const tab = useRouteQuery('tab', '')
const loginModal = computed(() => {
  return tab.value !== ''
})

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  isString: val => typeof val === 'string' || 'invalid',
  required: val => !!val || 'required',
  min4: val => val.length >= 4 || 'at least 4 characters',
  max10: val => val.length <= 10 || 'at most 10 characters',
  max20: val => val.length <= 20 || 'at most 20 characters',
  isEmail: val => validator.isEmail(val) || 'not a valid email',
  confirmPassword: val => val === form.password || 'passwords do not match'
}

const regSubmit = async (e) => {
  try {
    await api.post('/users', {
      username: form.username,
      email: form.email,
      password: form.password,
      avatar: `https://source.boringavatars.com/beam/120/${form.username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`
    })
    loginModal.value = false
    $q.notify({
      type: 'success',
      message: 'Success!'
    })
  } catch (error) {
    $q.notify({
      type: 'warnings',
      message: 'Something went wrong'
    })
  }
}

const loginSubmit = async (e) => {
  try {
    const { data } = await api.post('/users/login', {
      username: form.username,
      password: form.password
    })

    currentUser.login({
      token: data.result.token,
      username: data.result.username,
      email: data.result.email,
      admin: data.result.admin,
      avatar: data.result.avatar,
      following: data.result.following,
      followers: data.result.followers,
      watchList: data.result.watchList
    })
    $q.notify({
      type: 'success',
      message: 'Success!'
    })
    loginModal.value = false
    // FIXME: Write operation failed: computed value is readonly
    router.push(route.path)
  } catch (error) {
    $q.notify({
      type: 'warnings',
      message: error.response.data.message
    })
  }
}
</script>
