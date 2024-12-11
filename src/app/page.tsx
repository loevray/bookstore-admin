import ApiQueryWrapper from './_components/book/ApiQueryWrapper';
import BookListWrapper from './_components/book/BookListWrapper';
import BookSearchForm from './_components/book/BookSearchForm';

export default async function Home() {
  return (
    <div>
      <header>
        <BookSearchForm />
      </header>
      <main>
        <ApiQueryWrapper>
          <BookListWrapper />
        </ApiQueryWrapper>
      </main>
    </div>
  );
}
