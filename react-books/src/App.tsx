import { useEffect, useState } from 'react'
import { getBooks, createBook, updateBook, deleteBook } from './services/bookService'
import type { Book } from './types/book'
import BookForm from './components/BookForm'

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      console.error(error)
      alert('Gagal mengambil data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const openCreate = () => {
    setSelectedBook(null)
    setShowForm(true)
  }

  const openEdit = (book: Book) => {
    setSelectedBook(book)
    setShowForm(true)
  }

  const saveBook = async (data: Book) => {
    try {
      if (selectedBook?.id) {
        await updateBook(selectedBook.id, data)
      } else {
        await createBook(data)
      }
      setShowForm(false)
      fetchBooks()
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan data')
    }
  }

  // ✅ DELETE
  const removeBook = async (id: number) => {
    if (confirm('Yakin hapus data?')) {
      try {
        await deleteBook(id)
        fetchBooks()
      } catch (error) {
        console.error(error)
        alert('Gagal menghapus data')
      }
    }
  }

  return (
    <div>
      <h1>Books</h1>

      <button onClick={openCreate}>+ Create</button>

      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 && <p>Data kosong</p>}

      {!loading && books.length > 0 && (
        <table border={1} cellPadding={8}>
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
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>
                  <button onClick={() => openEdit(b)}>Edit</button>
                  <button onClick={() => removeBook(b.id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <BookForm
        show={showForm}
        book={selectedBook}
        onClose={() => setShowForm(false)}
        onSave={saveBook}
      />
    </div>
  )
}

export default App