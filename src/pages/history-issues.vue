<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item, i) in questionsAnswer"
      :key="i"
    >
      <v-expansion-panel-header>{{ 'Студент ' + item.nameStudent + '. Вопрос: ' + item.text }}</v-expansion-panel-header>
      <v-expansion-panel-content>
          <b>Ответ: </b>{{ item.answerText }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'history-issues',
  computed: {
    ...mapGetters(['getQuestions']),
    questionsAnswer () {
      return this.getQuestions.filter(item => item.answerStatus === true)
    }
  }
}
</script>
