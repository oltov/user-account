### Приложение Личный кабинет ученика/учителя с авторизацией.
### Возможность задавать вопросы, отвечать на них. История хранится в local storage.
### логин / пароль учителя: teacher / tdemo
### логин / пароль ученика: student / sdemo

#### Используемые инструменты:
  - vue.js (vue-cli)
  - vue-router
  - vuex
  - vuetify
  - scss

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Вопросы с ответами сохраняются в localStoredge в одном объекте 'questions'.
В хуке 'mounted' проверяется наличие объекта 'questions' в localStoredge, и загрузка в стор.
