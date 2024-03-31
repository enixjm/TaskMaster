<template>
    <div class="p-4 sm:ml-64">
        <ul class="p-4">
            <li class="flex items-center p-1 border-b border-gray-300">
                <span class="text-lg font-bold">Todo</span>
            </li>
            <li v-for="task in tasks" :key="task" class="flex items-center p-3 border-b border-gray-300">
                <div class="flex items-center w-full">
                    <button v-if="task.is_completed" @click="updateTask(task.id, task.is_completed)" class="mr-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <button v-else @click="updateTask(task.id, task.is_completed)" class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <span>{{ task.title }}</span>
                </div>
                <div class="flex items-center justify-end w-3/5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="slateblue" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    <span class="ml-1 mr-2">{{ task.deadline.substring(0,10) }}</span>
                    <button @click="deleteTask(task.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </li>
            <li>
                <div v-if="isEnabledTaskEditor" class="p-2 rounded-lg border mt-2">
                    <input class="p-2 w-full outline-none" type="text" placeholder="작업 이름" v-model="taskTitle">
                    <input class="h-2 p-2 mb-3 w-full outline-none" type="text" placeholder="태그" v-model="taskTag">
                    <div class="flex items-center border-t pt-2 justify-between">
                        <Datepicker class="w-2/5 m-1 text-center border rounded-md hover:bg-gray-100" v-model="date"></Datepicker>
                        <div>
                        <button class="mx-2 px-2 py-1 border rounded-md hover:bg-gray-100" @click="disableTaskEditor">취소</button>
                        <button class="px-2 py-1 border rounded-md hover:bg-gray-100" @click="createTask">작업 추가</button>
                        </div>  
                    </div>
                </div>
                <button v-else class="flex items-center p-2" @click="isEnabledTaskEditor = true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span class="p-2 text-gray-400">작업 추가</span>
                </button>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import Datepicker from 'vue3-datepicker';

const tasks = ref([])
const isEnabledTaskEditor = ref(false)
const date = ref(new Date())

let taskTitle = null
let taskTag = null

onMounted(readTodos)

const url = process.env.VUE_APP_API_URL

function readTodos() {
    axios.get(url+'/api/read').then((res) => {
        tasks.value = res.data
    }) 
}

function disableTaskEditor() {
    isEnabledTaskEditor.value = false
    taskTitle = null
    taskTag = null
}

function createTask() {
    try {
        const req = {
            headers: { "Content-Type": `application/json`},
            user_id: 'user1',
            title: taskTitle,
            tag: taskTag,
            deadline: date.value,
            isCompleted: false,
            isImportant: false,
        }
        axios.post(url+'/api/create', req)
            .then(() => {
                readTodos()
            }
        )
        disableTaskEditor()
    } catch (error) {
        console.log('Task field is incomplated')
    }
}
function updateTask(id, isCompleted) {
    const req = {
        id: id,
        isCompleted: !isCompleted
    }
    axios.put(url+'/api/update', req)
        .then(() => {
            readTodos()
        }
    )
}
function deleteTask(id) {
    axios.delete(url+'/api/delete'+'/'+id)
        .then(() => {
            readTodos()
        }
    )
}
</script>