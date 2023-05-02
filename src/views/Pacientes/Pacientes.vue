<template>
  <div class="pacientes">
    <div class="flex justify-center items-center">
      <div class="w-full flex justify-center items-center">
        <input v-model="busca" type="text" class="busca">
        <span class="i-mdi-magnify ml-4 pt-2 bg-green-500 text-[2em] hover:cursor-pointer"></span>
      </div>

      <div class="menu">
        <span @click="cadastrarPaciente"
              class="i-mdi-plus bg-green-500 text-[2em] hover:cursor-pointer hover:text-amber-50"></span>
      </div>

    </div>
    <div class="flex justify-center items-center">
      <PacienteRow v-for="paciente in pacientes" :key="paciente.id" :paciente="paciente"/>
    </div>

    <h2 v-if="pacientes.length === 0" class="text-green-500 font-bold text-2xl self-center">Nenhum paciente cadastrado!</h2>

    <modal
        v-if="showModal"
        @change-state="showModal = $event"
        :modal-state="showModal"
        :title="`Cadastro de Paciente`"
        :close-click-outside="false"
        :component="NovoPaciente"
        @newPatient="buscarPacientes"
    />
  </div>
</template>

<script setup>
import PacienteRow from "@/views/Pacientes/components/PacienteRow.vue";
import {onMounted, ref} from 'vue'
import Modal from "@/components/Modal.vue";
import NovoPaciente from "@/views/Pacientes/components/NovoPaciente.vue";

const pacientes = ref([])
const busca = ref('')
const showModal = ref(false)

onMounted(() => {
  buscarPacientes()
})

function buscarPacientes() {
  return fetch('api/patients')
      .then(res => res.json())
      .then(({status, data}) => {
        console.log(data)
        if (status === 200) {
          pacientes.value = data
          showModal.value = false
        }
      })
}

function cadastrarPaciente() {
  showModal.value = true
}

</script>


<style>
.pacientes {
  @apply p-10 flex flex-col gap-4
}

.busca {
  @apply border-4 w-1/2 h-10 outline-none p-2 rounded-2xl border-green-500 bg-gray-800 text-white
}

.menu {
  @apply h-10 bg-gray-700 rounded-2xl flex justify-center items-center p-2
}
</style>

