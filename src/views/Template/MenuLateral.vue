<template>
    <div class="bg-menu-light h-full justify-between flex flex-col p-2 items-center">
        <div class="flex flex-col space-y-4">
            <button
                    class="menu-lateral p-2 rounded"
                    :class="iconClass('/dashboard') ? 'active' : false"
                    v-tooltip.right="'Dashboard'"
                    @click="goTo('/dashboard')"
            >
                <span class="i-fa6-regular-chart-bar menu-lateral_icons"
                      :class="iconClass('/dashboard') ? 'bg-white' : false"></span>
            </button>

            <button
                class="menu-lateral p-2 rounded"
                :class="iconClass('/pacientes') ? 'active' : false"
                v-tooltip.right="'Gerenciamento de Pacientes'"
                @click="goTo('/pacientes')"
            >
                <span class="i-fa6-regular-address-book menu-lateral_icons"
                      :class="iconClass('/pacientes') ? 'bg-white' : false"></span>
            </button>
        </div>
        <div class="flex flex-col space-y-4">
            <VDropdown positioningDisabled>
                <button class="bg-gray-200 w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center">
                    <UserPhoto class="w-[1.4rem] h-[1.4rem]"/>
                </button>

                <template #popper>
                    <div class="fixed bottom-5 left-2 ml-14">
                        <div class="bg-white rounded p-1">
                            <div
                                    class="block m-1 rounded p-4 py-2 font-medium text-sm leading-5 text-gray-700 hover:bg-gray-100 cursor-pointer transition ease-in-out duration-100 hover:text-gray-900 hover:rounded hover:m-1 gap-x-2 flex mb-2 hover:mb-2"
                                    v-close-popper
                                    @click="logOff"
                            >
                                Sair
                            </div>
                        </div>
                    </div>
                </template>
            </VDropdown>
        </div>
    </div>
</template>

<script setup>
// import Template from "@/modules/Template/Template.vue";
// import UserPhoto from "@/modules/User/UserPhoto.vue";
import {useRouter} from 'vue-router'
import TokenService from "@/utils/token-service";

const router = useRouter()

const iconClass = (path) => router.currentRoute.value.path === path

const logOff = () => {
    TokenService.removeToken()
    router.push({name: 'Login'})
}
const goTo = (path) => {
    router.push(path)
}
</script>

<style scoped>
body .v-popper__popper {
    right: 0 !important;
}

.active {
    @apply bg-gray-800
}


</style>
