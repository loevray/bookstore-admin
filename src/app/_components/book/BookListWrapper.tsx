import { fetchBookList } from '@/app/lib/services/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import BookList from './BookList';

export default async function BookListWrapper() {
  const queryClient = new QueryClient();

  const cachedBookList = queryClient.getQueryData([
    'bookList',
    { page: 1, title: '', author: '' },
  ]);

  if (!cachedBookList) {
    await queryClient.prefetchQuery({
      queryKey: ['bookList', { page: 1, title: '', author: '' }],
      queryFn: () => fetchBookList({}),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookList />
    </HydrationBoundary>
  );
}
