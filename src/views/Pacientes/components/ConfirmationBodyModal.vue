<template>
  <h3>Deseja mesmo excluir o paciente {{ paciente.name }}?</h3>

  <div class="flex justify-end gap-2 mt-2">
    <button class="footer-button bg-red-700" @click="cancelar">Cancelar</button>
    <button class="footer-button bg-green-500" @click="confirmar">Confirmar</button>
  </div>

</template>

<script setup>

const props = defineProps(['paciente'])
const emit = defineEmits(['cancelar', 'confirmar'])
function cancelar (){
  emit('cancelar')
}

function confirmar (){
  emit('confirmar', props.paciente.id)
}
</script>


<style scoped>
.footer-button {
  @apply p-2 rounded text-white
}
</style>
