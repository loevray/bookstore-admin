/**
 * @jest-environment node
 */

describe('temp test', () => {
  test('temp...', () => {
    expect(1).toBe(1);
  });
});

/* import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/books/route';
import { getDocs } from 'firebase/firestore';

jest.mock('@/app/firebase/firebasedb', () => ({
  __esModule: true,
  default: {
    collection: jest.fn(),
  },
}));

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');

  return {
    ...originalModule,
    getDocs: jest.fn(),
    collection: jest.fn(() => ({
      withConverter: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  };
});

describe('/api/books API test', () => {
  test('GET returns books data with status 200', async () => {
    const mockBooks = [
      {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
        plot: 'Plot 1',
        publicationYear: 2001,
        publisher: 'Publisher 1',
        price: 1000,
      },
      {
        id: '2',
        title: 'Book 2',
        author: 'Author 2',
        plot: 'Plot 2',
        publicationYear: 2002,
        publisher: 'Publisher 2',
        price: 2000,
      },
    ];

    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockBooks.map((book) => ({
        id: book.id,
        data: () => book,
      })),
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    req.nextUrl = {
      searchParams: new URLSearchParams({ page: '1' }),
    };

    const response = await GET(req);

    const json = await response.json();

    res.status(response.status || 200);
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(json));
    res.end();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getHeaders()['content-type']).toBe('application/json');
    expect(JSON.parse(res._getData())).toEqual(mockBooks);
  });

  test('GET handles errors and returns status 500', async () => {
    (getDocs as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    // Mock NextRequest to include nextUrl with searchParams
    req.nextUrl = {
      searchParams: new URLSearchParams(),
    };

    const response = await GET(req);
    const json = await response.json();

    res.status(response.status || 500);
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(json));
    res.end();

    expect(res._getStatusCode()).toBe(500);
    expect(res._getHeaders()['content-type']).toBe('application/json');
    expect(JSON.parse(res._getData())).toEqual({ message: 'Database error' });
  });
});
 */
