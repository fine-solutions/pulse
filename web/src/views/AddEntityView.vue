<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProfileStore } from '@/stores/profile';
import { useProjectStore } from '@/stores/project';

import FormButton from '@/components/FormButton.vue';
import FormInput from '@/components/FormInput.vue';

const route = useRoute();
const router = useRouter();

const profile = useProfileStore();
const project = useProjectStore();

const headerTitle = ref('');
const isProcessing = ref(false);
const fieldList = ref([]);
const fieldValues = ref({});

switch (route.params.entity) {
  case 'project':
    headerTitle.value = 'Новый проект';
    fieldList.value = [
      {
        type: 'text',
        label: 'Логотип проекта',
        placeholder: '',
        name: 'icon',
      },
      {
        type: 'text',
        label: 'Название проекта',
        placeholder: '',
        name: 'title',
      },
      {
        type: 'text',
        label: 'Описание проекта',
        placeholder: '',
        name: 'description',
      },
      {
        type: 'datalist',
        label: 'Статус проекта',
        placeholder: '',
        name: 'status',
      },
    ];
    break;
  default:
    break;
}

async function saveEntity() {
  isProcessing.value = true;
  let entityId;
  switch (route.params.entity) {
    case 'project':
      entityId = await project.create(profile.token, fieldValues.value);
      if (entityId > 0) {
        router.push({ name: 'projectWithId', params: { id: entityId } });
      }
      break;
    default:
      break;
  }
  isProcessing.value = false;
}

function changeValue(fieldName, newValue) {
  fieldValues.value[fieldName] = newValue;
}
</script>

<template>
  <main class="main">
    <h1 class="main__header">{{ headerTitle }}</h1>
    <template v-for="(field, fieldIndex) in fieldList" :key="fieldIndex">
      <FormInput class="main__field" :field-label="field.label" :field-type="field.type" :field-placeholder="field.placeholder" @on-change="(newValue) => changeValue(field.name, newValue)" />
    </template>
    <FormButton button-text="Создать" :is-processing="isProcessing" @click-action="saveEntity" />
  </main>
</template>
