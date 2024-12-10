import { Suspense } from 'react';
import BookList from './_components/book/BookList';
import getBookList from './lib/services/getBookList';
import ApiQueryWrapper from './_components/book/ApiQueryLayer';

export default async function Home() {
  const initialBookData = await getBookList();

  return (
    <div>
      <main>
        <ApiQueryWrapper>
          <BookList initialBookData={initialBookData} />
        </ApiQueryWrapper>
      </main>
    </div>
  );
}
