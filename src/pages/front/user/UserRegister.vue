<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
        <q-card style="width: 500px;">
          <q-tabs
            v-model="tab"
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify"
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated >
            <q-tab-panel name="login" class="q-px-xl flex-center">
              <q-form
                @submit="onSubmit"
              >
            <div class="row">
              <q-input label="Username" v-model="form.username" :rules="[rules.isString, rules.required, rules.min4, rules.max10]"  lazy-rules class="col">
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password" :rules="[rules.isString, rules.required, rules.min4, rules.max20]"  lazy-rules>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row flex-center">
              <q-btn outline label="submit" type="submit" class="q-mt-md"/>
            </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="register" class="q-px-xl flex-center" >
              <q-form
                @submit="onSubmit"
              >
            <div class="row">
              <q-input label="Username" v-model="form.username" :rules="[rules.isString, rules.required, rules.min4, rules.max10]"  lazy-rules class="col">
              </q-input>
            </div>
            <div class="row">
              <q-input type="email" label="email" class="col" v-model="form.email" :rules="[rules.isString, rules.required, rules.isEmail]"  lazy-rules>
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Password" class="col" v-model="form.password" :rules="[rules.isString, rules.required, rules.min4, rules.max20]"  lazy-rules>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row">
              <q-input :type="isPwd ? 'password' : 'text'" label="Confirm Password" class="col" v-model="form.confirmPassword" :rules="[rules.required, rules.confirmPassword]" reactive-rules>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row flex-center">
              <q-btn outline label="submit" type="submit" class="q-mt-md"/>
            </div>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import validator from 'validator'
import { api } from 'boot/axios.js'

const $q = useQuasar()
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const tab = ref('login')
const isPwd = ref(true)
const rules = {
  isString: val => typeof val === 'string' || 'invalid',
  required: val => !!val || 'required',
  min4: val => val.length >= 4 || 'at least 4 characters',
  max10: val => val.length <= 10 || 'at most 10 characters',
  max20: val => val.length <= 20 || 'at most 20 characters',
  isEmail: val => validator.isEmail(val) || 'not a valid email',
  confirmPassword: val => val === form.password || 'passwords do not match'
}

const onSubmit = async (e) => {
  try {
    await api.post('/users', {
      username: form.username,
      email: form.email,
      password: form.password
    })
    $q.notify({
      position: 'top-right',
      color: 'green-4',
      textColor: 'white',
      icon: 'done',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'Success!'
    })
  } catch (error) {
    $q.notify({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }
      ],
      message: 'error'
    })
  }
}
</script>

<style scoped>
.q-notification{
  opacity: 0.7;
  width: 20rem;
}
.q-notifications__list--top {
    top: 7rem !important;
}

.q-notification__message{
  padding-left: 25px;
}
</style>
