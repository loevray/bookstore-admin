import { fetchBookList } from '@/app/lib/services/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import BookList from './BookList';

export default async function BookListWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookList'],
    queryFn: fetchBookList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookList />
    </HydrationBoundary>
  );
}
