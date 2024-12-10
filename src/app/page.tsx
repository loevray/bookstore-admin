import BookList from './_components/book/BookList';
import { fetchBookList } from './lib/services/api';
import ApiQueryWrapper from './_components/book/ApiQueryLayer';
import BookListWrapper from './_components/book/BookListWrapper';

export default async function Home() {
  const initialBookData = await fetchBookList();

  return (
    <div>
      <main>
        <ApiQueryWrapper>
          <BookListWrapper />
        </ApiQueryWrapper>
      </main>
    </div>
  );
}
