import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const taskList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      taskList.value.push({
        title: 'Сбор данных по климату за год',
        number: 4,
        expire: 1715904000,
        project: 'Экспедиция в Патагонию',
        uiMatrix: 2,
        complexity: {
          value: 5,
          dim: '🦜',
        },
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      })
      taskList.value.push({
        title: 'Получить разрешение на сбор образцов эндемичных растений',
        number: 7,
        expire: null,
        project: 'Экспедиция в Патагонию',
        uiMatrix: 4,
        complexity: {
          value: 7,
          dim: '🦜',
        },
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      })
      taskList.value.push({
        title: 'Оплатить дорогу до Патагонии участникам экспедиции',
        number: 8,
        expire: null,
        project: 'Экспедиция в Патагонию',
        uiMatrix: 1,
        complexity: null,
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      })
      taskList.value.push({
        title: 'Найти фотографа',
        number: 12,
        expire: 1717372800,
        project: 'Экспедиция в Патагонию',
        uiMatrix: 3,
        complexity: 5,
        status: {
          label: 'Бэклог',
          color: 'black',
        },
      })
      return true;
    } else {
      return false;
    }
  }

  return { taskList, load }
}, {
  persist: true
})
