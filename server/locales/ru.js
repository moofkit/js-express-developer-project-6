// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      edit: {
        success: 'Данные успешно изменены',
        error: 'Введены некорректные данные',
        accessDenied: 'Нельзя изменять данные другого пользователя',
        delete: {
          success: 'Пользователь успешно удален',
          error: 'Ошибка удаления пользователя',
        }
      },
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        firstname: 'Имя',
        lastname: 'Фамилия',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          change: 'Данные пользователя',
          submit: 'Сохранить',
          delete: 'Удалить пользователя',
        },
        table: {
          edit: 'Изменить',
        }
      },
      welcome: {
        index: {
          hello: 'Привет от Wedwyn',
        },
      },
    },
  },
};
