<template>
  <div>
  {{ paciente}}
  </div>
</template>

<script setup>
const props = defineProps({
    paciente: {
        type: Object,
        required: true
    }
})
</script>
