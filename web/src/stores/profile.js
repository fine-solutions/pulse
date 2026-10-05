import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const email = ref('user@example.com')
  const name = ref('Имя Фамилия')
  const about = ref('Информация для раздела «О себе»')
  const complexity = ref('*')
  const token = ref('')

  const settings = computed(() => {
    return {
      email: email.value,
      name: name.value,
      about: about.value,
      complexity: complexity.value,
      token: token.value,
    }
  })

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function signIn(userEmail, userPassword) {
    await sleep(2000)
    if (userEmail === 'ves@samdelov.com' && userPassword === '123456qwerty') {
      email.value = userEmail
      name.value = 'Весь Самделов'
      about.value = 'Никому не делигирует то, что может сделать сам, то есть ничего!'
      complexity.value = '🦜'
      token.value = 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf'
      return true
    } else {
      console.log('Ошибка: неправильно указаны почта или пароль')
      email.value = ''
      name.value = ''
      about.value = ''
      complexity.value = ''
      token.value = ''
      return false
    }
  }

  async function signOut() {
    setTimeout(() => {
      return true
    }, 2000)
  }

  return { settings, signIn, signOut }
})
