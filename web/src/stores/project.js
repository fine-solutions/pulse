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
          label: 'Путешествия',
          color: 'violet',
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
          label: 'Работа',
          color: 'black',
        },
        progress: {
          done: 7,
          all: 12,
        },
      })
      projectList.value.push({
        id: 3,
        title: 'Обучение игре на гитаре',
        icon: '🎸',
        status: {
          label: 'Обучение',
          color: 'green',
        },
        progress: {
          done: 3,
          all: 12,
        },
      })
      projectList.value.push({
        id: 4,
        title: 'Поездка в Костёнки',
        icon: '🦣',
        status: {
          label: 'Путешествия',
          color: 'violet',
        },
        progress: {
          done: 7,
          all: 12,
        },
      })
      projectList.value.push({
        id: 5,
        title: 'Система развёртывания для приложения «Пульс»',
        icon: '🛠️',
        status: {
          label: 'Работа',
          color: 'black',
        },
        progress: {
          done: 3,
          all: 12,
        },
      })
      projectList.value.push({
        id: 6,
        title: 'Генеративные нейросети',
        icon: '🧠',
        status: {
          label: 'Обучение',
          color: 'green',
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
