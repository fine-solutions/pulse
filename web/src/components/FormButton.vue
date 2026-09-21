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
  },
  isProcessing: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits([
  'click-action'
])

async function onAction() {
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
      'form-button': !isLink && !isProcessing,
      'form-button form-button--link': isLink,
      'form-button form-button--processing': isProcessing,
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
  outline: none;
}

.form-button--link {
  padding: 0.34375em 0.625em;
  background-color: transparent;
}

.form-button--processing {
  --line-step: 25%;
  --line-opacity: 0.15;
  background-size: 3em 3em;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, var(--line-opacity)) var(--line-step),
    transparent var(--line-step),
    transparent calc(var(--line-step) * 2),
    rgba(255, 255, 255, var(--line-opacity)) calc(var(--line-step) * 2),
    rgba(255, 255, 255, var(--line-opacity)) calc(var(--line-step) * 3),
    transparent calc(var(--line-step) * 3),
    transparent
  );

  animation: move-stripes 1s linear infinite;
  transition: width 0.4s ease;
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

.form-button--processing:hover,
.form-button--processing:active,
.form-button--processing:focus-visible {
  --line-opacity: 0.35;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, var(--line-opacity)) var(--line-step),
    transparent var(--line-step),
    transparent calc(var(--line-step) * 2),
    rgba(255, 255, 255, var(--line-opacity)) calc(var(--line-step) * 2),
    rgba(255, 255, 255, var(--line-opacity)) calc(var(--line-step) * 3),
    transparent calc(var(--line-step) * 3),
    transparent
  );
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

.form-button--link:hover > .form-button__label,
.form-button--link:active > .form-button__label,
.form-button--link:focus-visible > .form-button__label {
  text-decoration: underline;
}

@keyframes move-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 3em 0; /* Matches the background-size width for a seamless loop */
  }
}
</style>
