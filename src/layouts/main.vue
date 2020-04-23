<template>
<v-container fluid class="d-flex">
    <sidebarTeacher v-if="isAccaunt.status === 'tiacher'" />
    <sidebarStudent v-else-if="isAccaunt.status === 'student'" />
    <v-container class="pa-0">
      <slot />
    </v-container>
</v-container>
</template>

<script>
import sidebarTeacher from '../components/sidebar-teacher.vue'
import sidebarStudent from '../components/sidebar-student.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    sidebarTeacher,
    sidebarStudent
  },
  computed: {
    ...mapGetters(['isAccaunt'])
  }
}
</script>
