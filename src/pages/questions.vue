<template>
<div>
  <v-card
    class="mx-auto mb-5 pa-6"
    max-width="800"
    elevation="1"
    v-for="(item, index) in questionsAnswer"
    :key="index"
  >
    <v-card-subtitle class="pb-0">Вопрос студента {{ item.nameStudent }}</v-card-subtitle>

    <v-card-text class="text--primary">

      <div>{{ item.text }}</div>

    </v-card-text>
    <v-card-actions v-if="item.fileURL.length">
      <v-alert type="success" width="100%">
        <a
          color="white"
          text
          :href="item.fileURL"
          download="download"
        >
          Студент прикрепил файл, нажмите что бы скачать его
        </a>
      </v-alert>
    </v-card-actions>

    <v-card>
      <v-textarea
        v-model="item.answerText"
        outlined
        name="input-7-4"
        label="Напишите здесь свой ответ"
      >
      </v-textarea>
      <v-alert
        dense
        type="warning"
        v-show="item.answerText.length < 10"
      >
        {{ errorMassege }}
      </v-alert>
      <v-card-actions>
        <v-btn
          color="info"
          outlined
          text
          @click="writeAnswer(item)"
        >
          Ответить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>

</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'questions',
  components: {
  },
  data: () => ({
    request: '',
    errorMassege: 'Текст ответа должен быть минимум 10 символов.'
  }),
  computed: {
    ...mapGetters(['getQuestions']),
    questionsAnswer () {
      return this.getQuestions.filter(item => item.answerStatus === false)
    }
  },
  methods: {
    ...mapMutations(['addAnswer']),
    writeAnswer (item) {
      if (item.answerText.length < 10) return
      this.addAnswer(item)
    }
  }
}
</script>
