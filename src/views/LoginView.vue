<template>
    <div class="min-h-screen bg-gradient-to-br bg-gray-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Email or Username</label>
                    <div class="p-inputgroup">
                        <InputText v-model="username" fluid  size="small" placeholder="Enter your email or username" />
                    </div>
                </div>
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Password</label>
                    <Password v-model="password" toggleMask feedback="false" fluid size="small" placeholder="Enter your password" />
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 w-full">
                        Sign In
                    </button>   
                </div>
            </form>
        </div>
    </div>

    <LoadingDialog v-model="showLoading" title="Signing in..." />
    <AlertDialog v-model="showAlert" yesButtonColor="bg-red-600" header="Error"
        title="Login failed. wrong email or password!" :show-cancel="true" />

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signin } from "@/apis/authentication";
import { setToken, setUserInfoCookie } from '@/services/authentication';
import LoadingDialog from '@/components/LoadingDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';

const showLoading = ref(false);
const showAlert = ref(false);
const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
    showLoading.value = true;
    const result = await signin({
        username: username.value,
        password: password.value,
        concept: 'BOQ'
    });
    if (result && result.status === 200) {
        await setToken('token', result.data?.access_token)
        await setToken('refreshToken', result.data?.refresh_token);
        router.push({ path: '/' });
    } else {
        showAlert.value = true;
        //alert('Login failed. Please check your credentials and try again.');
    }
    showLoading.value = false;
}
</script>