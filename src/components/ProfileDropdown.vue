<template>
    <button
    class="flex items-center align-middle rounded-lg p-3 hover:bg-gray-100 focus:shadow-outline-purple focus:outline-none"
    @click="toggleProfileMenu"
    aria-label="Account"
    aria-haspopup="true"
    >
        <img
        class="object-cover w-8 h-8 rounded-full"
        src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
        alt=""
        aria-hidden="true"
        />
        <span class="font-bold text-base ms-1 p-1">yeonseok</span>
        <svg class="w-4 h-4 ms-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    </button>

    <Transition
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        v-click-outside="toggleProfileMenu"
    >
        <ul
        v-if="isProfileMenuOpen"
        class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
        aria-label="submenu"
        >
        <li class="flex">
            <!-- <router-link 
            to=""
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            > -->
            <!-- <OutlinePersonIcon class="w-4 h-4 mr-3" aria-hidden="true" /> -->
            <span>프로필</span>
            <!-- </router-link> -->
        </li>
        <li class="flex">
            <a
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="#"
            >
            <!-- <OutlineCogIcon class="w-4 h-4 mr-3" aria-hidden="true" /> -->
            <span>설정</span>
            </a>
        </li>
        <li class="flex">
            <a
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="#"
            @click="handleSignOut"
            >
            <!-- <OutlineLogoutIcon class="w-4 h-4 mr-3" aria-hidden="true" /> -->
            <span>로그아웃</span>
            </a>
        </li>
        </ul>
    </Transition>
</template>
<script setup>
import {ref} from 'vue'

const isNotificationsMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

function toggleProfileMenu() {
    isProfileMenuOpen.value = !isProfileMenuOpen.value
    isNotificationsMenuOpen.value = false
}
</script>