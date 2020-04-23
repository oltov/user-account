import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accounts:
      [
        {
          login: 'student',
          password: 'sdemo',
          success: true,
          status: 'student',
          name: 'Сидоров А.Ц.'
        },
        {
          login: 'teacher',
          password: 'tdemo',
          success: true,
          status: 'tiacher',
          name: 'Никколо Макиавелли'
        }
      ],
    isActiveUser: {},
    questions: [
      {
        theme: 'Кино',
        text: 'В какой последовательности смотреть звездные войны?',
        answerStatus: true,
        answerText: 'Смотреть нужно в хронологическом порядке, по дате выхода на экраны',
        nameStudent: 'Сидоров А.Ц.',
        id: 7845524,
        fileURL: ''

      },
      {
        theme: 'Похудение',
        text: 'Сколько кексов можно съесть после 23:00?',
        answerStatus: false,
        answerText: '',
        nameStudent: 'Сидоров А.Ц.',
        id: 12214,
        fileURL: ''
      }
    ]
  },
  mutations: {
    userIsOut (state) {
      state.isActiveUser = {}
    },
    addAnswer (state, data) {
      state.questions.forEach((item) => {
        if (item.id === data.id) {
          item.answerText = data.answerText
          item.answerStatus = true
        }
      })
      localStorage.setItem('questions', JSON.stringify(state.questions))
    },
    setActiveUser (state, user) {
      state.isActiveUser = { ...user }
    },
    addQuestion (state, data) {
      const item = { ...data }
      state.questions.push(item)
      localStorage.setItem('questions', JSON.stringify(state.questions))
    },
    getQuestionsFromLocalStor (state, data) {
      data.forEach((localItem) => {
        const itemIsReal = state.questions.find(item => item.id === localItem.id)
        if (!itemIsReal) state.questions.push(localItem)
      })
    }
  },
  getters: {
    getQuestions (state) {
      return state.questions
    },
    isAccaunt (state) {
      return state.isActiveUser
    },
    accountsInfo (state) {
      return state.accounts
    }
  },
  actions: {
    login ({ state, commit }, { login, password }) {
      return new Promise((resolve, reject) => {
        state.accounts.forEach(item => {
          if (item.login === login &&
            item.password === password) {
            commit('setActiveUser', item)
            resolve()
          }
        })
      })
    }
  },
  modules: {
  }
})
