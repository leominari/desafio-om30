<template>
    <div class="flex flex-col items-center">
        <div class="flex flex-col items-center gap-2">
            <CircularPhoto v-if="state.photo" :base64="state.photo"/>
            <div @click="openPhotoSelection" class="input-foto" >
            <span>
                Clique aqui para selecionar sua foto de perfil
            </span>

            </div>
            <input @change="setPhoto" ref="photo" class="hidden" type="file" accept=".jpg, .jpeg, .png">
        </div>

        <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
            <div class="flex flex-row p-4 gap-6 justify-around">
                <div class="flex flex-col gap-2">
                    <h3 class="text-[18px] self-center">Informações Pessoais</h3>
                    <div class="input-custom">
                        <label class="input-label" for="name">Nome Completo</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="name"
                                v-model="state.name"
                        >
                    </div>

                    <div class="input-custom">
                        <label class="input-label" for="motherName">Nome Completo da Mãe</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="motherName"
                                v-model="state.motherName"
                        >
                    </div>


                    <div class="input-custom">
                        <label class="input-label" for="birthDate">Data de Nascimento</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="birthDate"
                                v-maska
                                data-maska="##/##/####"
                                v-model="state.birthDate"
                        >
                    </div>

                    <div class="input-custom">
                        <label class="input-label" for="name">CPF</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="CPF"
                                v-maska
                                data-maska="###.###.###-##"
                                v-model="state.CPF"
                        >
                    </div>

                    <div class="input-custom">
                        <label class="input-label" for="name">CNS</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="CNS"
                                v-maska
                                data-maska="### #### #### ####"
                                v-model="state.CNS"
                        >
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-[18px] self-center">Endereço</h3>
                    <div class="input-custom">
                        <label class="input-label" for="cep">CEP</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="cep"
                                v-maska
                                data-maska="#####-###"
                                v-model.lazy="state.address.CEP"
                        >
                    </div>
                    <div class="input-custom">
                        <label class="input-label" for="logradouro">Logradouro</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="logradouro"
                                v-model="state.address.address"
                        >
                    </div>
                    <div class="input-custom">
                        <label class="input-label" for="numero">Número</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="numero"
                                v-model="state.address.number"
                        >
                    </div>
                    <div class="input-custom">
                        <label class="input-label" for="bairro">Bairro</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="bairro"
                                v-model="state.address.neighborhood"
                        >
                    </div>
                    <div class="input-custom">
                        <label class="input-label" for="cidade">Cidade</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="cidade"
                                v-model="state.address.city"
                        >
                    </div>
                    <div class="input-custom">
                        <label class="input-label" for="name">UF</label>
                        <input
                                class="border-2 border-green-500 rounded-md px-1 active:border-green-500"
                                type="text"
                                id="UF"
                                v-model="state.address.state"
                        >
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
          <span
                  v-if="v$.$errors"
                  v-for="error in v$.$errors"
                  class="text-[14px] text-red-700"
          > - {{ error.$message }}
          </span>
            </div>

            <button class="p-2 bg-green-500 rounded text-white" type="submit">{{
                pacienteId ? 'Salvar' : 'Cadastrar'
                }}
            </button>
        </form>
    </div>
</template>

<script setup>
import {reactive, watch, onMounted, ref} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
import {vMaska} from "maska"
import {useBirthDateValidation, useCnsValidation, useCpfValidation} from '@/utils/validators'
import CircularPhoto from "@/components/CircularPhoto.vue";

const photo = ref('')
const state = reactive({
    photo: '',
    name: '',
    motherName: '',
    birthDate: '',
    CPF: '',
    CNS: '',
    address: {
        address: '',
        number: '',
        state: '',
        city: '',
        neighborhood: '',
        CEP: '',
    }
})
const rules = {
    name: {
        required: helpers.withMessage('Nome Completo não pode ser vazio.', required)
    },
    motherName: {
        required: helpers.withMessage('Nome Completo da Mãe não pode ser vazio.', required)
    },
    birthDate: {
        required: helpers.withMessage('Data de Nascimento não pode ser vazio.', required),
        useCnsValidation: helpers.withMessage('Data de Nascimento inválida.', useBirthDateValidation),
    },
    CPF: {
        required: helpers.withMessage('CPF não pode ser vazio.', required),
        useCpfValidation: helpers.withMessage('CPF Inválido', useCpfValidation),
    },
    CNS: {
        required: helpers.withMessage('CNS não pode ser vazio.', required),
        useCnsValidation: helpers.withMessage('CNS Inválido.', useCnsValidation),
    },
    address: {
        address: {
            required: helpers.withMessage('Logradouro não pode ser vazio.', required),
        },
        number: {
            required: helpers.withMessage('Número não pode ser vazio.', required)
        },
        state: {
            required: helpers.withMessage('UF não pode ser vazio.', required)
        },
        city: {
            required: helpers.withMessage('Cidade não pode ser vazio.', required)
        },
        neighborhood: {
            required: helpers.withMessage('Bairro não pode ser vazio.', required)
        },
        CEP: {
            required: helpers.withMessage('CEP não pode ser vazio.', required)
        },
    }
}

const v$ = useVuelidate(rules, state)
const emit = defineEmits(['newPatient', 'sucessoEdicao'])
const props = defineProps(['pacienteId'])

onMounted(() => {

    if (props.pacienteId) {
        fetch(`api/patients/${props.pacienteId}`)
            .then(res => res.json())
            .then(({status, data}) => {

                state.name = data.name;
                state.motherName = data.motherName;
                state.birthDate = data.birthDate;
                state.CPF = data.CPF;
                state.CNS = data.CNS;

                state.address.address = data.address.CNS;
                state.address.number = data.address.number;
                state.address.state = data.address.state;
                state.address.city = data.address.city;
                state.address.neighborhood = data.address.neighborhood;
                state.address.CEP = data.address.CEP;
                state.photo = data.photo

            })
    }
})

async function handleSubmit() {
    let validate = await v$.value.$validate()

    if (validate) {

        if (props.pacienteId) {
            fetch(`api/patients/${props.pacienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            })
                .then((res) => res.json())
                .then(response => {
                    if (response.status === 200) {
                        emit('sucessoEdicao')
                    }
                })

            return
        }


        fetch("api/patients",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            })
            .then((res) => res.json())
            .then((response) => {
                if (response.status === 200) {
                    emit('newPatient')
                }
            })
    }
}

function fetchCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(res => res.json())
        .then(addressData => {
            state.address.address = addressData.logradouro
            state.address.state = addressData.uf
            state.address.city = addressData.localidade
            state.address.neighborhood = addressData.bairro
        })
}

function openPhotoSelection(){
    photo.value.click()
}

function setPhoto({target}){
    let targetPhoto = target.files[0]
    const reader = new FileReader();

    reader.onload = () => {
        const base64Image = reader.result;
        state.photo = base64Image
    };

    reader.readAsDataURL(targetPhoto);
}

watch(() => state.address.CEP,
    (newValue) => {
        fetchCEP(newValue)
    }
)

</script>


<style scoped>
.input-custom {
    @apply flex flex-col
}

.input-label {
    @apply text-xs text-gray-700
}

.input-foto {
    @apply bg-green-300 p-3 rounded text-gray-700 cursor-pointer select-none
}
</style>
