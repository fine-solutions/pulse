<script setup>
defineProps({
  fieldType: {
    type: String,
    default: 'text',
  },
  fieldLabel: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label class="form-input">
    <span class="form-input__label card-label">{{ fieldLabel }}</span>
    <input class="form-input__field control-value" :type="fieldType">
  </label>
</template>

<style>
.form-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  margin: 0;
}

.form-input__label {
  display: block;
  width: 100%;
  margin: 0;
}

.form-input__field {
  width: 100%;
  padding: 1em 0.625em;
  margin: 0;
}
</style>
