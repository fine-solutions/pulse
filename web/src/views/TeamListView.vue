<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { useTeamStore } from '@/stores/team';

const MODE = Object.freeze({
  LIST: 'list',
  CARD: 'card',
});

const chapterModes = ref({
  team: MODE.LIST,
})

import LinkCard from '@/components/LinkCard.vue';
import LinkItem from '@/components/LinkItem.vue';
import FormInput from '@/components/FormInput.vue';

const profile = useProfileStore();
const team = useTeamStore();

const searchTerm = ref('');

const teamList = computed(() => team.teamList.filter((p) => {
  if (searchTerm.value === '') {
    return true
  }
  return p.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    || p.status.label.toLowerCase().includes(searchTerm.value.toLowerCase())
}))

const chapterList = computed(() => {
  return [
    {
      title: 'Команды',
      items: teamList.value,
      objectKey: 'team',
    }
  ]
})

const router = useRouter();

function search(value) {
  searchTerm.value = value
}

onMounted(() => {
  if (profile.token === '') {
    router.push({ name: 'splash' });
  }
})
</script>

<template>
  <main class="main">
    <FormInput class="main__search" :field-label="Поиск" :field-type="text" field-placeholder="Поиск..." @on-change="search"/>
    <section class="main__section" v-for="(chapter, chapterIndex) in chapterList" :key="chapterIndex">
      <div class="main__header-wrapper">
        <h2 class="main__header-title header">{{ chapter.title }}</h2>
        <button class="main__header-button"  v-if="chapterModes[chapter.objectKey] === MODE.CARD" @click="chapterModes[chapter.objectKey] = MODE.LIST">
          <img class="main__header-button-icon" src="/icons/list.svg" alt="">
        </button>
        <button class="main__header-button" v-else-if="chapterModes[chapter.objectKey] === MODE.LIST" @click="chapterModes[chapter.objectKey] = MODE.CARD">
          <img class="main__header-button-icon" src="/icons/cards.svg" alt="">
        </button>
      </div>
      <div class="main__card-wrapper" v-if="chapterModes[chapter.objectKey] === MODE.CARD">
        <LinkCard class="main__card" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-target="{ name: `${ chapter.objectKey }WithId`, params: { id: item.id } }" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
      <div class="main__item-wrapper" v-if="chapterModes[chapter.objectKey] === MODE.LIST">
        <LinkItem class="main__item" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-target="{ name: `${ chapter.objectKey }WithId`, params: { id: item.id } }" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 0px var(--content-paddings);
}

.main__search {
  margin: var(--content-paddings) 0px;
}

.main__header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}

.main__header-title {
  margin: 0;
}

.main__header-button {
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0;
  padding: 0;
}

.main__header-button-icon {}

.main__item-wrapper {
  width: 100%;
}

.main__card-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.main__section {
  width: calc(100vw - 2 * var(--content-paddings));
}
</style>
