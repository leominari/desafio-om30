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
        <span>{{ paciente.CPF }}</span>
      </div>

      <div class="row-data">
        <label class="title">CNS</label>
        <span>{{ paciente.CNS }}</span>
      </div>
      <div class="row-data">
        <label class="title">Data de Nascimento</label>
        <span>{{ paciente.birthDate }}</span>
      </div>
      <div class="flex items-center">
        <span v-tooltip.left="'Editar'" @click.stop="showEditModal = true"
              class="i-mdi-pencil w-8 h-8 text-blue-900 hover:text-blue-700"/>
        <span v-tooltip.right="'Excluir'" @click.stop="showConfirmationModal = true"
              class="i-mdi-delete-forever w-8 h-8 text-red-900 hover:text-red-700"/>
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


    <modal
        v-if="showEditModal"
        @change-state="showEditModal = $event"
        :modal-state="showEditModal"
        :title="`Editando ${paciente.name}`"
        :close-click-outside="false"
        :pacienteId="paciente.id"
        @sucessoEdicao="editarPaciente"
        :component="NovoEditarPaciente"
    />

    <Modal
        v-if="showConfirmationModal"
        @change-state="showConfirmationModal = $event"
        :modal-state="showConfirmationModal"
        :title="`Exclusão de Paciente`"
        :component="ConfirmationBodyModal"
        :paciente="paciente"
        @confirmar="deletarPaciente($event)"
        @cancelar="showConfirmationModal = false"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Modal from "@/components/Modal.vue";
import PacienteInfo from "@/views/Pacientes/components/PacienteInfo.vue";
import ConfirmationBodyModal from "@/views/Pacientes/components/ConfirmationBodyModal.vue";
import NovoEditarPaciente from "@/views/Pacientes/components/NovoEditarPaciente.vue";

const props = defineProps({
  paciente: {
    type: Object,
    required: true
  }
})

const showModal = ref(false)
const showConfirmationModal = ref(false)
const showEditModal = ref(false)
const emit = defineEmits(['atualizarPacientes'])

function openModal() {
  showModal.value = true
}

function editarPaciente() {
  showEditModal.value = false
  emit('atualizarPacientes')
}

function deletarPaciente(id) {
  fetch(`api/patients/${id}`, {
    method: 'DELETE'
  })
      .then(response => {
        showConfirmationModal.value = false
        emit('atualizarPacientes')
      })
}
</script>


<style>
.row-data {
  @apply flex flex-col hover:cursor-pointer


}

.title {
  @apply text-gray-500 opacity-70 hover:cursor-pointer select-none
}
</style>
