import axios from 'axios'
import type { Book } from '../types/book'

// ⚠️ pakai 127.0.0.1 biar stabil
const API_URL = 'http://127.0.0.1:8000/api/books'

// ✅ GET
export const getBooks = async (): Promise<Book[]> => {
  try {
    const res = await axios.get(API_URL)
    return res.data.data
  } catch (error) {
    console.error('Gagal ambil data:', error)
    alert('Gagal ambil data')
    return []
  }
}

// ✅ CREATE
export const createBook = async (data: Book) => {
  try {
    await axios.post(API_URL, {
      title: data.title,
      author: data.author,
      year: data.year,
      description: data.description
    })
  } catch (error) {
    console.error('Gagal tambah:', error)
    alert('Gagal tambah data')
  }
}

// ✅ UPDATE
export const updateBook = async (id: number, data: Book) => {
  try {
    await axios.put(`${API_URL}/${id}`, data)
  } catch (error) {
    console.error('Gagal update:', error)
    alert('Gagal update data')
  }
}

// ✅ DELETE
export const deleteBook = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Gagal hapus:', error)
    alert('Gagal hapus data')
  }
}