<template>
    <div>
        <div class="sidebar">
            <menu-lateral/>
        </div>
        <div class="template">
            <RouterView/>
        </div>

    </div>
</template>
<script setup>
import {RouterView} from "vue-router";
import MenuLateral from "@/views/Template/MenuLateral.vue";
</script>

<style>
.sidebar {
    grid-row: 2;
    width: 50px;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    @apply bg-green-500
}

.template {
    padding-left: 50px;
}
</style>
