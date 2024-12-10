import { fetchBookList } from '@/app/lib/services/api';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BookList from './BookList';

export default async function BookListWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookList'],
    queryFn: fetchBookList,
  });

  return (
    <HydrationBoundary>
      <BookList />
    </HydrationBoundary>
  );
}
