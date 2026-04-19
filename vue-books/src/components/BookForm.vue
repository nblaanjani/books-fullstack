<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Book } from '../models/book'

const props = defineProps<{
  show: boolean
  book: Book | null
}>()

const emit = defineEmits(['close', 'save'])

const form = ref<Book>({
  title: '',
  author: '',
  year: new Date().getFullYear(),
  description: ''
})

watch(() => props.book, (val) => {
  if (val) {
    form.value = { ...val }
  } else {
    resetForm()
  }
})

const resetForm = () => {
  form.value = {
    title: '',
    author: '',
    year: new Date().getFullYear(),
    description: ''
  }
}

const submit = () => {
  emit('save', form.value)
  resetForm()
}
</script>

<template>
  <div v-if="show" style="position:fixed; inset:0; background:#00000088;">
    <div style="background:white;padding:20px;margin:100px auto;width:300px;">
      <h3>{{ book ? 'Edit Book' : 'Create Book' }}</h3>

      <input v-model="form.title" placeholder="Title" /><br /><br />
      <input v-model="form.author" placeholder="Author" /><br /><br />
      <input v-model.number="form.year" type="number" placeholder="Year" /><br /><br />
      <input v-model="form.description" placeholder="Description" /><br /><br />

      <button @click="submit">Save</button>
      <button @click="resetForm(); emit('close')">Cancel</button>
    </div>
  </div>
</template>