'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { I_Books } from '@/app/api/books/type';
import { addBook } from '@/app/lib/services/api';
import { useRouter } from 'next/navigation';

const bookSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(40, { message: 'Title must be 40 characters or less' }),
  author: z
    .string()
    .min(1, { message: 'Author is required' })
    .max(40, { message: 'Author must be 40 characters or less' }),
  plot: z
    .string()
    .min(1, { message: 'Plot is required' })
    .max(100, { message: 'Plot must be 100 characters or less' }),
  publicationYear: z
    .number()
    .int()
    .positive({ message: '기원 전 책은 아직...' })
    .max(new Date().getFullYear(), {
      message: '미래에서 오셨군요!',
    }),
  publisher: z
    .string()
    .min(1, { message: 'Publisher is required' })
    .max(20, { message: 'Publisher must be 20 characters or less' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  amount: z
    .number()
    .int()
    .positive({ message: 'Amount must be a positive integer' })
    .max(9999, { message: 'Amount cannot exceed 9999' }),
});

type BookFormData = z.infer<typeof bookSchema>;

const addBookFormFields: Array<{
  name: keyof BookFormData;
  label: string;
  type: string;
}> = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'publicationYear', label: 'Publication Year', type: 'number' },
  { name: 'publisher', label: 'Publisher', type: 'text' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'amount', label: 'Amount', type: 'number' },
];

export default function AddBookForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (newBookData: Omit<I_Books, 'id' | 'totalBooks'>) =>
      addBook({ newBookData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booklist'] });
      router.push('/');
    },
  });

  const onSubmit = (data: BookFormData) => {
    console.log(data);
    mutate(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl relative"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addBookFormFields.map(({ name, label, type }) => (
          <div key={name} className="relative">
            <label htmlFor={name} className="block text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={name}
              type={type}
              {...register(name, { valueAsNumber: type === 'number' })}
              className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors[name] && (
              <p className="absolute text-red-500 text-xs mt-1 bottom-0 translate-y-full left-1">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label htmlFor="plot" className="block text-gray-700 mb-1">
          Plot
        </label>
        <textarea
          id="plot"
          {...register('plot')}
          rows={5}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        {errors.plot && (
          <p className="text-red-500 mt-1">{errors.plot.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition mt-6"
      >
        Add Book
      </button>
      <button
        type="button"
        className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </form>
  );
}
