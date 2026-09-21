<script setup>
import router from '@/router';

const props = defineProps({
  buttonText: {
    type: String,
    default: 'Button',
  },
  buttonRoute: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isLink: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits([
  'click-action'
])

function onAction() {
  if (props.isLink) {
    router.push(props.buttonRoute)
  } else {
    emit('click-action')
  }
}
</script>

<template>
  <button
    :class="{
      'form-button': !isLink,
      'form-button form-button--link': isLink,
    }"
    :disabled="isDisabled"
    @click="onAction()"
  >
    <span class="form-button__label control-caption">{{ buttonText }}</span>
  </button>
</template>

<style>
.form-button {
  appearance: none;
  border: none;
  margin: 0;
  padding: 1em 0.625em;
  width: 100%;
  cursor: pointer;
  background-color: var(--default-control);
}

.form-button--link {
  background-color: transparent;
}

.form-button:hover,
.form-button:active,
.form-button:focus-visible {
  background-color: var(--active-control);
}

.form-button--link:hover,
.form-button--link:active,
.form-button--link:focus-visible {
  background-color: transparent;
}

.form-button:disabled {
  background-color: var(--disable-control);
}

.form-button__label {
  display: block;
  width: 100%;
  margin: 0;
  color: var(--button-text);
}

.form-button--link > .form-button__label {
  color: var(--label-blue);
}

.form-button:disabled > .form-button__label {
  color: var(--disable-text);
}

.form-button--link:hover,
.form-button--link:active,
.form-button--link:focus-visible {
  opacity: 0.25;
}
</style>
