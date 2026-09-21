<script setup>
import route from '@/router';
import { ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';

const isRegMode = ref(false);
const isLostMode = ref(false);
const isCodeMode = ref(false);
const isPassMode = ref(false);
const isAuthMode = ref(true);
const isSending = ref(false);
const buttonLabel = ref('Войти')

const mode = ref(route.currentRoute.value.name);

switch (mode.value) {
case 'reg':
  isRegMode.value = true;
  isLostMode.value = false;
  isAuthMode.value = false;
  isCodeMode.value = false;
  isPassMode.value = false;
  buttonLabel.value = 'Зарегистрироваться';
  break
case 'lost':
  isRegMode.value = false;
  isLostMode.value = true;
  isAuthMode.value = false;
  isCodeMode.value = false;
  isPassMode.value = false;
  buttonLabel.value = 'Запросить код';
  break
case 'code':
  isRegMode.value = false;
  isLostMode.value = false;
  isAuthMode.value = false;
  isCodeMode.value = true;
  isPassMode.value = false;
  buttonLabel.value = 'Проверить';
  break
case 'pass':
  isRegMode.value = false;
  isLostMode.value = false;
  isAuthMode.value = false;
  isCodeMode.value = false;
  isPassMode.value = true;
  buttonLabel.value = 'Сохранить';
  break
default:
  isRegMode.value = false
  isLostMode.value = false
  isAuthMode.value = true
  isCodeMode.value = false;
  isPassMode.value = false;
}

function sendData() {
  isSending.value = true
}
</script>

<template>
  <main class="auth-view">
    <FormInput class="auth-view__field" v-if="isCodeMode" field-label="Код" field-placeholder="000-000" />
    <FormInput class="auth-view__field" v-if="isAuthMode || isLostMode || isRegMode" field-label="Электронная почта" field-type="email" field-placeholder="user@example.com" />
    <FormInput class="auth-view__field" v-if="isAuthMode || isRegMode" field-label="Пароль" field-type="password" field-placeholder="············" />
    <FormInput class="auth-view__field" v-if="isPassMode" field-label="Старый пароль" field-type="password" field-placeholder="············" />
    <FormInput class="auth-view__field" v-if="isPassMode" field-label="Новый пароль" field-type="password" field-placeholder="············" />
    <FormInput class="auth-view__field" v-if="isPassMode" field-label="Новый пароль" field-type="password" field-placeholder="············" />
    <FormButton class="auth-view__button" :button-text="buttonLabel" :is-processing="isSending" @click-action="sendData" />
    <FormButton class="auth-view__button" v-if="isAuthMode" button-text="Регистрация" :button-route="{ name: 'reg' }" :is-link="true" />
    <FormButton class="auth-view__button" v-if="isAuthMode" button-text="Забыли пароль" :button-route="{ name: 'lost' }" :is-link="true" />
  </main>
</template>

<style scoped>
.auth-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--control-gap);
  width: calc(100vw - 0.625em);
  max-width: 227px;
}
</style>
