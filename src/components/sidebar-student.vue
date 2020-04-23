<template>
  <v-card
    height="400"
    width="350"
    left="true"
    class="blue lighten-2"
  >
    <v-navigation-drawer width="350" class="blue lighten-2" permanent>
      <v-list-item >
        <v-list-item-content >
          <v-list-item-title class="title">
            Сидоров И.И.
          </v-list-item-title>
          <v-list-item-subtitle>
            студент
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="">
          <v-btn
            color="blue darken-1"
            block
            @click="out"
          >
            Выйти
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      items: [
        { title: 'Задать вопрос преподавателю', icon: 'mdi-view-dashboard', path: '/question-form' },
        { title: 'История ответов на вопросы', icon: 'mdi-image', path: '/history-issues' }
      ]
    }
  },
  methods: {
    ...mapMutations(['userIsOut']),
    out () {
      this.userIsOut()
      this.$router.replace('/login').catch(() => {})
    }
  }
}
</script>
