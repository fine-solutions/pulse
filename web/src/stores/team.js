import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', () => {
  const teamList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      teamList.value.push({
        title: 'Исследователи',
        image: '/images/default-team.png',
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      })
      teamList.value.push({
        title: 'Администраторы',
        image: '/images/default-team.png',
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      })
      teamList.value.push({
        title: 'Гиды',
        image: '/images/default-team.png',
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      })
      return true;
    } else {
      return false;
    }
  }

  return { teamList, load }
}, {
  persist: true
})
