import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', () => {
  const teamList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      teamList.value.push({
        id: 1,
        title: 'Исследователи',
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию',
        },
        icon: '',
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
        id: 2,
        title: 'Администраторы',
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию',
        },
        icon: '',
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
        id: 3,
        title: 'Гиды',
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию',
        },
        icon: '',
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
