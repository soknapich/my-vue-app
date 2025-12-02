<template>
    <div class="min-h-screen bg-gradient-to-br bg-gray-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label for="email">Email</label>
                    <!-- <input v-model="email" type="email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email" /> -->
                    <InputText id="email" v-model="email" size="small" aria-describedby="username-help" fluid/>
                </div>

                <div>
                    <label for="password">Password</label>
                    <Password id="password" v-model="password" size="small" toggleMask :feedback="false" fluid />
                </div>

                <button type="submit"
                    class="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Sign In
                </button>
            </form>

            <p class="text-center text-gray-600 mt-4">
                Don't have an account?
                <a href="#" class="text-green-700 hover:text-green-700 font-semibold">Sign up</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signin } from "@/apis/authentication";
import { setToken, setUserInfoCookie } from '@/services/authentication';
import { InputText, Password } from 'primevue';

const router = useRouter();
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const result = await signin({
        grant_type: 'password',
        username: email.value,
        password: password.value,
        client_id: 5,
        client_secret: 'wUV6ftjHDZHu290UMqCvlcEqNcmvdGVCwAqjr6Ml',
        scope: '*'
    });


    if (result && result.status === 200) {
        console.log(result);

        await setToken('token', result.data?.access_token)
        await setToken('refreshToken', result.data?.refresh_token);
        await setUserInfoCookie({
            id: 1,
            name: 'test'
        });

        router.push({ path: '/' });
    } else {
        alert('Login failed. Please check your credentials and try again.');
    }


}
</script>