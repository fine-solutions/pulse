<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits([
  'onChange',
  'onBlur',
  'onEnter',
])

defineProps({
  fieldType: {
    type: String,
    default: 'text',
  },
  fieldLabel: {
    type: String,
    default: '',
  },
  fieldPlaceholder: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  }
})

const fieldValue = ref('')

watch(
  () => fieldValue.value,
  (to) => {
    emit('onChange', to)
  }
)

function lostFocus() {
  emit('onBlur')
}

function pressKey(event) {
  if (event.key === 'Enter') {
    emit('onEnter')
  }
}
</script>

<template>
  <label class="form-input">
    <span class="form-input__label card-label">{{ fieldLabel }}</span>
    <input class="form-input__field control-value" v-model="fieldValue" :type="fieldType" :placeholder="fieldPlaceholder" :disabled="isDisabled" @blur="lostFocus" @keypress="pressKey">
  </label>
</template>

<style>
.form-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
}

.form-input__label {
  display: block;
  width: 100%;
  margin: 0;
}

.form-input__field {
  box-sizing: border-box;
  width: 100%;
  padding: 1em 0.625em;
  margin: 0;
  border-radius: 0;
  border: 1px solid var(--default-control);
  outline: none;
}

.form-input:has(.form-input__field:disabled) > .form-input__label {
  color: var(--disable-text);
}

.form-input__field::placeholder {
  color: var(--placeholder-text);
}

.form-input__field:hover,
.form-input__field:active,
.form-input__field:focus-visible {
  border-color: var(--active-control);
}

.form-input__field:disabled {
  color: var(--disable-text);
  border-color: var(--disable-control);
  cursor: not-allowed;
}
</style>
