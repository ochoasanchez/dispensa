<script setup lang="ts">
import ChevronRightIcon from './icons/ChevronRightIcon.vue';

</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Cantidad</th>
                <!-- <th>Ver más</th> -->
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr>
                <th>1</th>
                <td>22/06/2025</td>
                <td>10 Kg</td>
                <td><ChevronRightIcon /></td>
            </tr>
            <!-- row 2 -->
            <tr>
                <th>2</th>
                <td>22/06/2025</td>
                <td>11 Kg</td>
                <td><ChevronRightIcon /></td>
            </tr>
            <!-- row 3 -->
            <tr>
                <th>3</th>
                <td>22/06/2025</td>
                <td>15 Kg</td>
                <td><ChevronRightIcon /></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>