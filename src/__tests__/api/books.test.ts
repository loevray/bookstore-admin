/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/books/route';
import {  getDocs } from 'firebase/firestore';

jest.mock('@/app/firebase/firebasedb', () => ({
  __esModule: true,
  default: {
    collection: jest.fn()
  }
}));

jest.mock('firebase/firestore', () => { 
  const originalModule = jest.requireActual('firebase/firestore'); 
  
  return { ...originalModule,   
    getDocs: jest.fn(),
    collection: jest.fn(() => ({
      withConverter: jest.fn(() => ({
        get: jest.fn()
      }))
    })), }; 
});


describe('/api/books API test', () => {
  test('GET returns books data with status 200', async () => {
    const mockBooks = [
      { id: '1', title: 'Book 1', author: 'Author 1', plot: 'Plot 1', publicationYear: 2001, publisher: 'Publisher 1', price: 1000 },
      { id: '2', title: 'Book 2', author: 'Author 2', plot: 'Plot 2', publicationYear: 2002, publisher: 'Publisher 2', price: 2000 },
    ];
    
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockBooks.map(book => ({
        id: book.id,
        data: () => book
      }))
    });

    const { res } = createMocks({
      method: 'GET',
    });

    const response = await GET();
    
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

    const { res } = createMocks({
      method: 'GET',
    });

    const response = await GET();
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
