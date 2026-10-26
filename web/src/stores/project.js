import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', () => {
  const projectList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      projectList.value.push({
        id: 1,
        title: 'Экспедиция в Патагонию',
        icon: '⛵️',
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 3,
          all: 12,
        },
      })
      projectList.value.push({
        id: 2,
        title: 'Приложение «Пульс»',
        icon: '🚧',
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 7,
          all: 12,
        },
      })
      return true;
    } else {
      return false;
    }
  }

  return { projectList, load }
}, {
  persist: true
})
