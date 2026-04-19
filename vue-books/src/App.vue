<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBook } from './composables/useBook'
import BookForm from './components/BookForm.vue'
import type { Book } from './models/book'

const { books, loading, getBooks, createBook, updateBook, deleteBook } = useBook()

const showForm = ref(false)
const selectedBook = ref<Book | null>(null)

onMounted(() => {
  getBooks()
})

const openCreate = () => {
  selectedBook.value = null
  showForm.value = true
}

const openEdit = (book: Book) => {
  selectedBook.value = book
  showForm.value = true
}

const saveBook = async (data: Book) => {
  if (selectedBook.value?.id) {
    await updateBook(selectedBook.value.id, data)
  } else {
    await createBook(data)
  }
  showForm.value = false
}

// ✅ DELETE
const removeBook = async (id: number) => {
  if (confirm('Yakin hapus data?')) {
    await deleteBook(id)
  }
}
</script>

<template>
  <div>
    <h1>Books</h1>

    <button @click="openCreate">+ Create</button>

    <p v-if="loading">Loading...</p>

    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td>
            <button @click="openEdit(book)">Edit</button>
            <button @click="removeBook(book.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <BookForm
      :show="showForm"
      :book="selectedBook"
      @close="showForm = false"
      @save="saveBook"
    />
  </div>
</template>