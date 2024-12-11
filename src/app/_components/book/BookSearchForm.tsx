'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  searchBy: z.enum(['title', 'author']),
  searchTerm: z
    .string()
    .min(1, '검색어를 입력하세요.')
    .trim()
    .max(50, '검색어는 50글자 이하로 입력해 주세요.')
    .refine(
      (value) => value.trim() !== '',
      '검색어는 공백만으로 구성될 수 없습니다.',
    ),
});

type SearchFormData = z.infer<typeof schema>;

export default function BookSearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    params.set(data.searchBy, data.searchTerm.trim().slice(0, 50));
    router.push(`?page=1&${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 py-2 bg-blue-100 rounded-md shadow-md flex items-center space-x-4 text-black"
    >
      <div className="flex items-center space-x-2">
        <label htmlFor="searchBy" className="text-gray-700">
          Search by
        </label>
        <select
          id="searchBy"
          {...register('searchBy')}
          className="p-1 border rounded-md"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>
      <div className="flex items-center space-x-2 relative">
        <label htmlFor="searchTerm" className="text-gray-700">
          Search Term
        </label>
        <div className="relative">
          <input
            id="searchTerm"
            {...register('searchTerm')}
            className="p-1 border rounded-md"
          />
          {errors.searchTerm && (
            <span className="text-red-500 text-xs absolute top-full text-nowrap right-1/2 translate-x-[50%]">
              {errors.searchTerm.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
