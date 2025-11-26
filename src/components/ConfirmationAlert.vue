<template>
    <!-- Logout Confirmation Modal -->
    <div v-if="modelValue" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-80">
            <h2 class="text-lg font-semibold mb-4 text-gray-800">Confirm</h2>
            <p class="text-sm text-gray-600 mb-4">{{ confirmationQuestion }}</p>
            <div class="flex justify-end space-x-3">
                <button @click="$emit('update:modelValue', false)" class="px-4 py-2 text-sm rounded bg-gray-200">
                    {{ cancelLabel }}
                </button>
                <button @click="onConfirm" class="px-4 py-2 text-sm rounded text-white" :class="confirmationButtonColor">
                    {{ confirmationLabel }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    confirmationLabel: {
        type: String,
        default: 'Yes'
    },
    confirmationButtonColor: {
        type: String,
        default: 'bg-red-600'
    },
    cancelLabel: {
        type: String,
        default: 'No'
    },
    confirmationQuestion: {
        type: String,
        default: 'Are you sure?'
    },
    onConfirm: {
        type: Function as PropType<() => void>,
        required: true
    }
});
</script>