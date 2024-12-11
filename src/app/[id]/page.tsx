import ApiQueryWrapper from '../_components/book/ApiQueryWrapper';
import BookDetail from './BookDetail';

export default function BookDetailPage() {
  return (
    <main>
      <ApiQueryWrapper>
        <BookDetail />
      </ApiQueryWrapper>
    </main>
  );
}
