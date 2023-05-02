<template>
    <div @click="openModal"
         v-tooltip="'Clique para visualizar'"
         class="container hover:cursor-pointer gap-4 bg-amber-50 rounded p-2 hover:shadow-md hover:shadow-green-500">
        <div class="grid grid-cols-6 gap-4">
            <div class="row-data">
                <label class="title">Código</label>
                <span>{{ paciente.id }}</span>
            </div>
            <div class="row-data">
                <label class="title">Nome</label>
                <span>{{ paciente.name }}</span>
            </div>

            <div class="row-data">
                <label class="title">CPF</label>
                <span>{{ paciente.cpf }}</span>
            </div>

            <div class="row-data">
                <label class="title">CNS</label>
                <span>{{ paciente.cns }}</span>
            </div>
            <div class="row-data">
                <label class="title">Data de Nascimento</label>
                <span>{{ paciente.birthDate }}</span>
            </div>
            <div class="flex items-center">
                <span v-tooltip.left="'Editar'" @click.stop="editarPaciente" class="i-mdi-pencil w-8 h-8 text-blue-900 hover:text-blue-700"/>
                <span v-tooltip.right="'Excluir'" @click.stop="deletarPaciente" class="i-mdi-delete-forever w-8 h-8 text-red-900 hover:text-red-700"/>
            </div>

        </div>

        <Modal
                v-if="showModal"
                @change-state="showModal = $event"
                :modal-state="showModal"
                :title="`${paciente.id} - ${paciente.name}`"
                :component="PacienteInfo"
                :pacienteId="paciente.id"
        />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Modal from "@/components/Modal.vue";
import PacienteInfo from "@/views/Pacientes/components/PacienteInfo.vue";

const props = defineProps({
    paciente: {
        type: Object,
        required: true
    }
})

const showModal = ref(false)

function openModal() {
    showModal.value = true
}
function editarPaciente(){
    console.log('editarPaciente')
}

function deletarPaciente(){
    console.log('apagarPaciente')
}

onMounted(() => {
    console.log(props.paciente)
})
</script>


<style>
.row-data {
    @apply flex flex-col hover:cursor-pointer


}

.title {
    @apply text-gray-500 opacity-70 hover:cursor-pointer select-none
}
</style>
