import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', () => {
  const teamList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      teamList.value.push({
        id: 1,
        title: 'Исследователи',
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
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
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
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
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
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
        id: 4,
        title: 'Разработчики',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
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
        id: 5,
        title: 'Дизайнеры',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
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
        id: 6,
        title: 'Тестировщики',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
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
