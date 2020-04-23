<template>
<v-app>
  <div>
    <router-view v-if="$route.name === 'login'"/>
    <layout v-else>
      <router-view />
    </layout>
  </div>
  </v-app>
</template>

<script>
import layout from './layouts/main.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    layout
  },
  data: () => ({
    login: true
  }),
  computed: {
    ...mapGetters(['isAccaunt'])
  },
  methods: {
    ...mapMutations(['getQuestionsFromLocalStor'])
  },
  //  в хуке проверяем есть ли данные => передаем их в мутацию
  mounted () {
    if (localStorage.getItem('questions')) {
      const parseQuestions = JSON.parse(localStorage.getItem('questions'))
      this.getQuestionsFromLocalStor(parseQuestions)
    }
  }
}
</script>
