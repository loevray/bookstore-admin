import { I_Books } from '@/app/api/books/type';

export async function fetchBookList(): Promise<I_Books[]> {
  try {
    const response = await fetch('http://localhost:3000/api/books', {
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
