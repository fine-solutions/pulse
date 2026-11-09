import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTargetStore = defineStore('target', () => {
  const targetList = ref([]);

  async function load(userToken) {
    if (userToken === 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
      targetList.value.push({
        id: 1,
        project: 1,
        title: 'Получить данные',
        icon: '🔬',
        status: {
          label: 'Все',
          color: 'black',
        },
        teams: [1, 2, 3],
        tasks: [1, 2, 3, 4, 5],
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
