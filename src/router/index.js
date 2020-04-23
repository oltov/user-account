import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import login from '../pages/login.vue'
import questions from '../pages/questions.vue'
import main from '../layouts/main.vue'
import listQuestion from '../pages/history-issues.vue'
import questionForm from '../pages/question-form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/history-issues',
    name: 'history-issues',
    component: listQuestion,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/questions',
    name: 'questions',
    component: questions,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/question-form',
    name: 'question-form',
    component: questionForm,
    meta: {
      requiresAuth: true
    }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// хук для проверки на авторизацию пользователя
// если ее нет, то редирект на страницу входа
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAccaunt.success) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
