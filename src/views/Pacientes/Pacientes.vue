<template>
    <div class="pacientes">
        <PacienteRow v-for="paciente in pacientes" :paciente="paciente"/>
    </div>
</template>

<script setup>
import PacienteRow from "@/views/Pacientes/components/PacienteRow.vue";
import {ref} from 'vue'

const pacientes = ref([])



</script>


<style>
.pacientes {
    @apply p-10
}
</style>

