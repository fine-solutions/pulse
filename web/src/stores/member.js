import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', () => {
  const memberList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      memberList.value.push({
        id: 1,
        title: 'Весь Самделов',
        description: 'Никому не делегирует то, что может сделать сам, то есть ничего!',
        image: '/images/default-member.png',
        projects: [1],
        targets: [1],
        tasks: [1, 2, 3, 4, 5],
        status: {
          label: 'Работа',
          color: 'black',
        },
        progress: {
          done: 3,
          all: 12,
        },
      })

      return true
    } else {
      return false;
    }
  }

  return { memberList, load }
}, {
  persist: true
})
