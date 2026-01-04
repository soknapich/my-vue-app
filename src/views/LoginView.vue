<template>
    <div class="min-h-screen bg-gradient-to-br bg-gray-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Email or Username</label>
                    <InputGroup>
                        <InputText type="username" size="small" v-model="username" placeholder="Enter your email or username"
                            class="w-full" />
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>

                    </InputGroup>

                </div>
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Password</label>
                    <InputGroup>
                        <InputText :type="showPassword ? 'text' : 'password'" size="small" v-model="password" placeholder="Enter your password"
                            class="w-full" />
                        <InputGroupAddon>
                            <Button type="button" size="small" :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"  severity="secondary" @click="togglePassword" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Button type="submit" size="small" label="Sign In" class="w-full p-mb-4" />
            </form>

            <p class="text-center text-gray-600 mt-4">
                Don't have an account?
                <a href="#" class="text-green-700 hover:text-green-700 font-semibold">Sign up</a>
            </p>
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
import AlertDialog from '../components/AlertDialog.vue';
import { Button, InputGroup, InputGroupAddon, InputText } from 'primevue';

const showLoading = ref(false);
const showAlert = ref(false);
const showPassword = ref(false);

const router = useRouter();
const username = ref('');
const password = ref('');

const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

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
        await setUserInfoCookie(result.data?.user);

        router.push({ path: '/' });
    } else {
        showAlert.value = true;
        //alert('Login failed. Please check your credentials and try again.');
    }
    showLoading.value = false;


}
</script>