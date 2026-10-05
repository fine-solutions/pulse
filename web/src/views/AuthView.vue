<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import route from '@/router';
import { useProfileStore } from '@/stores/profile';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';

const router = useRouter();

const isRegMode = ref(false);
const isLostMode = ref(false);
const isCodeMode = ref(false);
const isPassMode = ref(false);
const isAuthMode = ref(true);
const isSending = ref(false);
const buttonLabel = ref('Войти')

const mode = ref(route.currentRoute.value.name);

const code = ref('')
const email = ref('')
const defaultPassword = ref('')
const oldPassword = ref('')
const newFirstPassword = ref('')
const newSecondPassword = ref('')

const isCodeValid = ref(true)
const isEmailValid = ref(true)
const isDefaultPasswordValid = ref(true)
const isOldPasswordValid = ref(true)
const isNewFirstPasswordValid = ref(true)
const isNewSecondPasswordValid = ref(true)

const firstBlurForCodeFieldFlag = ref(false)
const firstBlurForEmailFieldFlag = ref(false)
const firstBlurForDefaultPasswordFieldFlag = ref(false)
const firstBlurForOldPasswordFieldFlag = ref(false)
const firstBlurForNewFirstPasswordFieldFlag = ref(false)
const firstBlurForNewSecondPasswordFieldFlag = ref(false)

const unsuccessfulSigningInFlag = ref(false)

const codeValidationResult = ref('')
const emailValidationResult = ref('')
const defaultPasswordValidationResult = ref('')
const oldPasswordValidationResult = ref('')
const newFirstPasswordValidationResult = ref('')
const newSecondPasswordValidationResult = ref('')

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

const profile = useProfileStore()

async function sendData() {
  isSending.value = true
  if (isAuthMode.value) {
    await signIn()
  }
  isSending.value = false
}

async function signIn() {
  const signingInSuccess = await profile.signIn(email.value, defaultPassword.value)
  if (signingInSuccess) {
    router.push({ name: 'main' })
  } else {
    unsuccessfulSigningInFlag.value = true
    firstBlurForCodeFieldFlag.value = false
    firstBlurForEmailFieldFlag.value = false
    firstBlurForDefaultPasswordFieldFlag.value = false
    firstBlurForOldPasswordFieldFlag.value = false
    firstBlurForNewFirstPasswordFieldFlag.value = false
    firstBlurForNewSecondPasswordFieldFlag.value = false
  }
}

function changeCodeValue(newValue) {
  if (validateCodeValue(newValue)) {
    code.value = newValue
    isCodeValid.value = true
    codeValidationResult.value = 'Значение верно'
  } else {
    isCodeValid.value = false
    codeValidationResult.value = 'Значение должно состоять из цифр и знака дефиса'
  }
}

function changeEmailValue(newValue) {
  if (validateEmailValue(newValue)) {
    email.value = newValue
    isEmailValid.value = true
    emailValidationResult.value = 'Значение верно'
  } else {
    isEmailValid.value = false
    emailValidationResult.value = 'Электронная почта должна соответствовать международному формату'
  }
}

function changeDefaultPassword(newValue) {
  if (validatePasswordValue(newValue)) {
    defaultPassword.value = newValue
    isDefaultPasswordValid.value = true
    defaultPasswordValidationResult.value = 'Пароль соответствует правилам'
  } else {
    isDefaultPasswordValid.value = false
    defaultPasswordValidationResult.value = 'Пароль должен быть больше восьми символов'
  }
}

function changeOldPassword(newValue) {
  if (validatePasswordValue(newValue)) {
    oldPassword.value = newValue
    isOldPasswordValid.value = true
    oldPasswordValidationResult.value = 'Пароль соответствует правилам'
  } else {
    isOldPasswordValid.value = false
    oldPasswordValidationResult.value = 'Пароль должен быть больше восьми символов'
  }
}

function changeNewFirstPassword(newValue) {
  if (validatePasswordValue(newValue)) {
    newFirstPassword.value = newValue
    isNewFirstPasswordValid.value = true
    newFirstPasswordValidationResult.value = 'Пароль соответствует правилам'
  } else {
    isNewFirstPasswordValid.value = false
    newFirstPasswordValidationResult.value = 'Пароль должен быть больше восьми символов'
  }
}

function changeNewSecondPassword(newValue) {
  if (validatePasswordValue(newValue)) {
    newSecondPassword.value = newValue
    isNewSecondPasswordValid.value = true
    newSecondPasswordValidationResult.value = 'Пароль соответствует правилам'
  } else {
    isNewSecondPasswordValid.value = false
    newSecondPasswordValidationResult.value = 'Пароль должен быть больше восьми символов'
  }
}

function validateCodeValue(newValue) {
  const pattern = /[0-9]{3}-[0-9]{3}/
  return pattern.test(newValue)
}

function validateEmailValue(newValue) {
  const pattern = /[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}/
  return pattern.test(newValue)
}

function validatePasswordValue(newValue) {
  const pattern = /.{8,}/
  return pattern.test(newValue)
}

function codeFieldBlur() {
  if (!firstBlurForCodeFieldFlag.value && !isCodeValid.value) {
    firstBlurForCodeFieldFlag.value = true
  }
}

function emailFieldBlur() {
  if (!firstBlurForEmailFieldFlag.value && !isEmailValid.value) {
    firstBlurForEmailFieldFlag.value = true
  }
}

function defaultPasswordFieldBlur() {
  if (!firstBlurForDefaultPasswordFieldFlag.value && !isDefaultPasswordValid.value) {
    firstBlurForDefaultPasswordFieldFlag.value = true
  }
}

function oldPasswordFieldBlur() {
  if (!firstBlurForOldPasswordFieldFlag.value && !isOldPasswordValid.value) {
    firstBlurForOldPasswordFieldFlag.value = true
  }
}

function newFirstPasswordFieldBlur() {
  if (!firstBlurForNewFirstPasswordFieldFlag.value && !isNewFirstPasswordValid.value) {
    firstBlurForNewFirstPasswordFieldFlag.value = true
  }
}

function newSecondPasswordFieldBlur() {
  if (!firstBlurForNewSecondPasswordFieldFlag.value && !isNewSecondPasswordValid.value) {
    firstBlurForNewSecondPasswordFieldFlag.value = true
  }
}
</script>

<template>
  <main class="auth-view">
    <div class="auth-view__wrapper" v-if="isCodeMode">
      <FormInput class="auth-view__field" field-label="Код" field-placeholder="000-000" @on-change="changeCodeValue" @on-blur="codeFieldBlur" @on-enter="sendData" />
      <p :class="isCodeValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForCodeFieldFlag">{{ codeValidationResult }}</p>
    </div>
    <div class="auth-view__wrapper" v-if="isAuthMode || isLostMode || isRegMode">
      <FormInput class="auth-view__field" field-label="Электронная почта" field-type="email" field-placeholder="user@example.com" @on-change="changeEmailValue" @on-blur="emailFieldBlur" @on-enter="sendData" />
      <p :class="isEmailValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForEmailFieldFlag">{{ emailValidationResult }}</p>
    </div>
    <div class="auth-view__wrapper" v-if="isAuthMode || isRegMode">
      <FormInput class="auth-view__field" field-label="Пароль" field-type="password" field-placeholder="············" @on-change="changeDefaultPassword" @on-blur="defaultPasswordFieldBlur" @on-enter="sendData" />
      <p :class="isDefaultPasswordValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForDefaultPasswordFieldFlag">{{ defaultPasswordValidationResult }}</p>
      <p class="auth-view__wrong-hint" v-if="unsuccessfulSigningInFlag">Неверный пароль</p>
    </div>
    <div class="auth-view__wrapper" v-if="isPassMode">
      <FormInput class="auth-view__field" field-label="Старый пароль" field-type="password" field-placeholder="············" @on-change="changeOldPassword" @on-blur="oldPasswordFieldBlur" @on-enter="sendData" />
      <p :class="isOldPasswordValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForOldPasswordFieldFlag">{{ oldPasswordValidationResult }}</p>
    </div>
    <div class="auth-view__wrapper" v-if="isPassMode">
      <FormInput class="auth-view__field" field-label="Новый пароль" field-type="password" field-placeholder="············" @on-change="changeNewFirstPassword" @on-blur="newFirstPasswordFieldBlur" @on-enter="sendData" />
      <p :class="isNewFirstPasswordValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForNewFirstPasswordFieldFlag">{{ newFirstPasswordValidationResult }}</p>
    </div>
    <div class="auth-view__wrapper" v-if="isPassMode">
      <FormInput class="auth-view__field" field-label="Новый пароль" field-type="password" field-placeholder="············" @on-change="changeNewSecondPassword" @on-blur="newSecondPasswordFieldBlur" @on-enter="sendData" />
      <p :class="isNewSecondPasswordValid ? 'auth-view__success-hint' : 'auth-view__wrong-hint'" v-if="firstBlurForNewSecondPasswordFieldFlag">{{ newSecondPasswordValidationResult }}</p>
    </div>
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

.auth-view__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--control-gap);
  width: 100%;
}

.auth-view__success-hint {
  margin: 0;
  color: var(--success-hint);
}

.auth-view__wrong-hint {
  margin: 0;
  color: var(--wrong-hint);
}
</style>
