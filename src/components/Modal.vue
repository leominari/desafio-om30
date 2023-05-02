<template>
    <div>
        <teleport to="body">
            <div v-if="showModal">
                <div class="modal-overlay" @click="closeOverlayModal"></div>
                <div class="modal corpo-modal">
                    <div class="flex justify-between mb-2 items-center gap-2">
                        <h2 class="text-2xl">{{ title }}</h2>
                        <span @click="showModal = false" class="i-mdi-close-thick text-2xl hover:cursor-pointer text-red-700"></span>
                    </div>
                    <div class="w-full h-full">
                        <component :is="component" v-bind="$attrs"/>
                    </div>

                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from "vue";

const props = defineProps({
    modalState: {
        type: Boolean
    },
    title: {
        type: String,
        default: 'Modal Title'
    },
    component: {
    },
    closeClickOutside: {
        type: Boolean,
        default: true,
    }
})
const showModal = ref(false)
const emit = defineEmits(['changeState'])
watch(showModal, (newValue, oldValue) => {
    emit('changeState', newValue)
})

onMounted(() => {
    showModal.value = props.modalState
})

watch(() => props.modalState, (newValue, oldValue) => {
    console.log(props.modalState)
    showModal.value = newValue
})

function closeOverlayModal(){
    if(!props.closeClickOutside) return
    showModal.value = false
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.corpo-modal {
    @apply bg-amber-50 rounded p-4
}
</style>
