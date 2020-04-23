<template>
  <div class="home">
    <v-card max-width="600" class="mr-auto pa-10" v-if="questIsGo">
      <v-card-title>
        <h3 class="display">Форма для вопроса преподавателю</h3>
      </v-card-title>

      <ValidationObserver v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(saveQuestion)">

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="Тема вопроса"
            mode="lazy"
          >
            <v-text-field
              label="Тема вопроса"
              :error-messages="errors"
              prepend-icon="mdi-account-circle"
              v-model="question.theme"
              type="text"
              required
            />
          </ValidationProvider>

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="текст вопроса"
            mode="lazy"
          >
            <v-textarea
              label="Текст вопроса"
              :error-messages="errors"
              prepend-icon="mdi-account-circle"
              v-model="question.text"
            />
          </ValidationProvider>

          <ValidationProvider
            rules="size:100|ext:jpeg,jpg,png,pdf"
            v-slot="{ errors, validate }"
            name="Изображение"
            vid="login"
            mode="lazy"
          >
            <v-file-input
              :error-messages="errors"
              accept=".png, .jpg, .jpeg, .pdf"
              placeholder="Выбирите файл, допустимое расширение jpeg/jpg/png/pdf, максимальный размер 100кб "
              prepend-icon="mdi-camera"
              label="Изображение"
              show-size
              @change="validate"
              ref="file"
            ></v-file-input>

          </ValidationProvider>
          <v-card-actions>
            <v-btn
              type="submit"
              color="info"
              min-width="100%"
            >
              Отправить вопрос
            </v-btn>
          </v-card-actions>

        </v-form>
      </ValidationObserver>

    </v-card>
    <v-card v-else>
      Вопрос отправлен
        <v-card-actions>
          <v-btn
            color="info"
            min-width="100%"
            @click="resetData"
          >
            Отправить еще вопрос
          </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import {
  extend,
  localize,
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json'
// eslint-disable-next-line camelcase
import { required, size, ext } from 'vee-validate/dist/rules'

localize('ru', ru)
extend('required', required)
extend('size', size)
extend('ext', ext)
extend('ext', {
  message: 'Недопустимое расширение файла'
})
extend('size', {
  message: 'Файл не должен быть больше 100кб'
})

export default {
  name: 'question-form',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    question:
      {
        theme: '',
        text: '',
        answerStatus: false,
        answerText: '',
        nameStudent: '',
        id: '',
        fileURL: ''
      },
    questIsGo: true
  }),
  computed: {
    ...mapGetters(['isAccaunt'])
  },
  methods: {
    ...mapMutations(['addQuestion']),
    saveQuestion () {
      this.readFile()
        .then(() => {
          this.question.id = Math.random()
          this.question.nameStudent = this.isAccaunt.name
          this.addQuestion(this.question)
          this.questIsGo = false
        })
        .catch(() => alert('Ошибка обработки файла, попробуйте еще раз'))
    },
    resetData () {
      this.question.theme = ''
      this.question.text = ''
      this.question.id = ''
      this.question.fileURL = ''
      this.questIsGo = true
    },
    readFile () {
      return new Promise((resolve, reject) => {
        const file = this.$refs.file.$refs.input.files[0]
        if (!file) return resolve()
        else {
          const reader = new FileReader()

          reader.readAsDataURL(file)

          reader.onload = () => {
            this.question.fileURL = reader.result
            resolve()
          }
        }
      })
    }
  }
}
</script>
