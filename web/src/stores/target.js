import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTargetStore = defineStore('target', () => {
  const targetList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      targetList.value.push({
        id: 1,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию',
        },
        title: 'Получить данные',
        icon: '🔬',
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

  return { targetList, load }
}, {
  persist: true
})
