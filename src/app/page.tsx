import ApiQueryWrapper from './_components/book/ApiQueryLayer';
import BookListWrapper from './_components/book/BookListWrapper';

export default async function Home() {
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
