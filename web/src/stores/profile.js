import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const email = ref('');
  const name = ref('');
  const about = ref('');
  const complexity = ref('');
  const token = ref('');

  const settings = computed(() => {
    return {
      email: email.value,
      name: name.value,
      about: about.value,
      complexity: complexity.value,
      token: token.value,
    };
  })

  async function signIn(userEmail, userPassword) {
    if (userEmail === 'igsekor@gmail.com' && userPassword === '12345678') {
      email.value = userEmail;
      name.value = 'Весь Самделов';
      about.value = 'Никому не делигирует то, что может сделать сам, то есть ничего!';
      complexity.value = '🦜';
      token.value = 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf';
      return true;
    } else {
      return false;
    }
  }

  async function signOut() {
    setTimeout(() => {
      return true;
    }, 2000)
  }

  return { settings, signIn, signOut }
}, {
  persist: true
})
