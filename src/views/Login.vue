<template>
    <section class="flex justify-center items-center w-full h-full">


        <div class="block bg-white shadow-lg rounded-lg">
            <div class="md:p-12 md:mx-6 ">
                <div>
                    <h4 class="text-3xl font-semibold mt-1 mb-5 pb-1">Entrar</h4>
                </div>
                <form class="flex flex-col gap-4">
                    <div class="flex gap-1 flex-col">
                        <input
                                class="p-1 border-2 rounded border-gray-600"
                                placeholder="Usuário"
                                type="text"
                                v-model="user.username"
                        >
                        <input
                                class="p-1 border-2 rounded border-gray-600"
                                placeholder="Senha"
                                type="password"
                                v-model="user.password"
                        >
                    </div>

                    <button
                            class="bg-gray-600 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            @click="sendLogin()"

                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>

    </section>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";

import {ref} from 'vue'
import TokenService from "@/utils/token-service";

const router = useRouter()
const user = ref({
    username: '',
    password: ''
})

function sendLogin() {
    fetch("/api/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.value),
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.status === 200) {
                TokenService.setToken(response.data.token)
                router.push({name: 'Dashboard'})
            }

        })

}

</script>

<style scoped>
h1 {
    color: #002E5D;
    margin-top: 70%;
}

</style>
