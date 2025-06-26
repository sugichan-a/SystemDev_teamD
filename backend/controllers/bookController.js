import { Book } from '../models';

export async function listBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
}

export async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
}

export async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const updated = await Book.update(req.body, { where: { id } });
    res.json({ message: 'Book updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
}

export async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
}
