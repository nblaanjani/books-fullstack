import { useEffect, useState } from 'react'
import type { Book } from '../types/book'

interface Props {
  show: boolean
  book: Book | null
  onClose: () => void
  onSave: (data: Book) => void
}

export default function BookForm({ show, book, onClose, onSave }: Props) {
  const [form, setForm] = useState<Book>({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    description: ''
  })

  useEffect(() => {
    if (book) {
      setForm(book)
    } else {
      setForm({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        description: ''
      })
    }
  }, [book])

  if (!show) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#00000088' }}>
      <div style={{ background: 'white', padding: 20, margin: '100px auto', width: 300 }}>
        <h3>{book ? 'Edit Book' : 'Create Book'}</h3>

        <input
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        /><br /><br />

        <input
          value={form.author}
          placeholder="Author"
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        /><br /><br />

        <input
          type="number"
          value={form.year}
          placeholder="Year"
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
        /><br /><br />

        <input
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        /><br /><br />

        <button onClick={() => onSave(form)}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}