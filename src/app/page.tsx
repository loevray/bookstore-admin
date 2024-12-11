import ApiQueryWrapper from './_components/book/ApiQueryWrapper';
import BookListWrapper from './_components/book/BookListWrapper';
import BookSearchForm from './_components/book/BookSearchForm';
import FloatingButton from './_components/book/FloatingButton';

export default async function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-2 shadow-md flex items-center">
        <h1 className="text-3xl font-bold px-4">Bookstore</h1>
        <BookSearchForm />
      </header>
      <main className="container mx-auto px-4 py-8">
        <ApiQueryWrapper>
          <BookListWrapper />
        </ApiQueryWrapper>
      </main>
      <footer className="bg-blue-600 text-white py-4 text-center mt-8">
        <p>&copy; 2024 Bookstore. All rights reserved.</p>
      </footer>
      <FloatingButton />
    </div>
  );
}
