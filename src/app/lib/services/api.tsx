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
