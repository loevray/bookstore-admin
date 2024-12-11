import { I_Books } from '@/app/api/books/type';
import { BASE_URL } from '@/app/baseUrl';

export async function fetchBookList({ page = 1, title = '', author = '' }) {
  try {
    const url = new URL(`${BASE_URL}/api/books`);
    url.searchParams.append('page', page.toString());
    if (title) url.searchParams.append('title', title);
    if (author) url.searchParams.append('author', author);

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    const data = await response.json();

    if (!response.ok) return new Error('Failed to fetch book');
    return data;
  } catch (e) {
    return e;
  }
}

export async function fetchBook({ bookId }: { bookId: string }) {
  try {
    if (!bookId) return new Error('책 id가 존재하지 않습니다');

    const response = await fetch(`${BASE_URL}/api/books/${bookId}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 404) return new Error(data.message);
      return new Error('Failed to fetch book');
    }

    return data;
  } catch (e) {
    return e;
  }
}

export async function updateBook({
  bookId,
  updatedData,
}: {
  bookId: string;
  updatedData: Partial<I_Books>;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Error('Failed to update book');
    }

    return data;
  } catch (e) {
    return e;
  }
}

export async function deleteBook({ bookId }: { bookId: string }) {
  try {
    const response = await fetch(`${BASE_URL}/api/books/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok)
      return new Error(`Failed to delete book. bookId:${bookId}`);

    const data = await response.json();

    return data;
  } catch (e) {
    return e;
  }
}

export async function addBook({
  newBookData,
}: {
  newBookData: Omit<I_Books, 'id' | 'totalBooks'>;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBookData),
    });

    if (!response.ok) return new Error(`Failed to add book.`);

    const data = await response.json();

    return data;
  } catch (e) {
    return e;
  }
}
