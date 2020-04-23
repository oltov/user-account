<template>
    <v-card width="400" class="pa-5 mx-auto mt-5">
      <v-card-title class="px-0">
        <h1 class="display px-0">Login</h1>
      </v-card-title>
      <ValidationObserver ref="observer" v-slot="{ passes }" slim>
        <v-form @submit.prevent="passes(logIn)">

          <ValidationProvider
            rules="required|alpha"
            v-slot="{ errors }"
            name="Имя пользователя"
            vid="login"
            mode="eager"
          >
            <v-text-field
              label="Имя пользователя"
              :error-messages="errors"
              prepend-icon="mdi-account-circle"
              v-model="login"
              required
            />
          </ValidationProvider>

          <ValidationProvider
            rules="required|alpha"
            v-slot="{ errors }"
            name="Пароль"
            vid="password"
            mode="eager"
          >
            <v-text-field
              label="Пароль"
              :error-messages="errors"
              :type="showPassword ? 'text' : 'Password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="password"
            />
          </ValidationProvider>

          <v-card-actions class="px-0 pt-6">
            <v-btn
              type="submit"
              color="info"
              min-width="100%"
            >
              Login
            </v-btn>
          </v-card-actions>

        </v-form>
      </ValidationObserver>
    </v-card>
</template>

<script>
import {
  extend,
  localize,
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'

import { required, alpha } from 'vee-validate/dist/rules'

localize('ru', ru)
extend('required', required)
extend('alpha', alpha)

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    login: '',
    password: '',
    showPassword: false
  }),
  methods: {
    // метод запускает экшен с проверкой введенных данных
    // при resolve делаем редирект, при rejecte устанавливаем ошибки на форму
    logIn () {
      this.$store.dispatch('login', {
        login: this.login,
        password: this.password
      })
        .then(() => {
          this.$router.push('/').catch(() => {})
        })
        .catch(() => this.$refs.observer.setErrors({
          login: ['пользователь с таким именем и паролем не найден'],
          password: ['пользователь с таким именем и паролем не найден']
        }))
    }
  }
}
</script>
