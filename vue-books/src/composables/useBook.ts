import axios from 'axios'
import { ref } from 'vue'
import type { Book } from '../models/book'

const API_URL = 'http://127.0.0.1:8000/api/books'

export function useBook() {
  const books = ref<Book[]>([])
  const loading = ref(false)

  const getBooks = async () => {
    try {
      loading.value = true
      const res = await axios.get(API_URL)
      books.value = res.data.data
    } catch (error) {
      console.error(error)
      alert('Gagal ambil data')
    } finally {
      loading.value = false
    }
  }

  const createBook = async (data: Book) => {
    await axios.post(API_URL, {
      title: data.title,
      author: data.author,
      year: data.year,
      description: data.description
    })
    await getBooks()
  }

  const updateBook = async (id: number, data: Book) => {
    await axios.put(`${API_URL}/${id}`, data)
    await getBooks()
  }

  const deleteBook = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`)
    await getBooks()
  }

  return {
    books,
    loading,
    getBooks,
    createBook,
    updateBook,
    deleteBook
  }
}