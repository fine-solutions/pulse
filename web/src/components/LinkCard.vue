<script setup>
const props = defineProps({
  linkTitle: {
    type: String,
    require: true,
  },
  linkIcon: {
    type: String,
    default: '',
  },
  linkImage: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <article class="link-card">
    <div class="link-card__icon-wrapper">
      <p class="link-card__icon" v-if="props.linkIcon !== ''">{{ props.linkIcon }}</p>
      <img class="link-card__icon" v-if="props.linkImage !== ''" :src="props.linkImage" alt="">
    </div>
    <h3 class="link-card__title card-label">{{ props.linkTitle }}</h3>
  </article>
</template>

<style>
.link-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 65px;
}

.link-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 69px;
  background-color: var(--panel-bg);
}

.link-card__icon {
  display: block;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 28px;
}

.link-card__title {
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin: 0;
}
</style>
