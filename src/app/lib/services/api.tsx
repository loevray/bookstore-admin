import { I_Books } from '@/app/api/books/route';

export async function fetchBookList(): Promise<I_Books[]> {
  try {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
