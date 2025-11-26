<template>
    <div class="min-h-screen bg-gradient-to-br bg-gray-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Email</label>
                    <input v-model="email" type="email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email" />
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Password</label>
                    <input v-model="password" type="password" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password" />
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

const router = useRouter();
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const result = await signin({
        email: email.value,
        password: password.value
    });

    
    if (result && result.status === 200) {
        await setToken('token', result.data?.token)
        await setToken('refreshToken', result.data?.refreshToken);
        await setUserInfoCookie(result.data?.user);

        router.push({ path: '/' });
    }else{
        alert('Login failed. Please check your credentials and try again.');
    }


}
</script>