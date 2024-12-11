import { I_Books } from '@/app/api/books/type';

export async function fetchBookList({
  page = 1,
  title = '',
  author = '',
}): Promise<I_Books[]> {
  try {
    const url = new URL('http://localhost:3000/api/books');
    url.searchParams.append('page', page.toString());
    if (title) url.searchParams.append('title', title);
    if (author) url.searchParams.append('author', author);

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchBook({
  bookId,
}: {
  bookId: string;
}): Promise<I_Books> {
  try {
    if (!bookId) throw new Error('책 id가 존재하지 않습니다');
    const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data);

    return data;
  } catch (e) {
    throw e;
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
    const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
}
