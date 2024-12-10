/**
 * @jest-environment node
 */

import {GET} from '@/app/api/books/route'
import BOOKS from '@/mocks/books';

describe('/api/books API test', () => {
  test('return 200 status and correct data', async () => {
    
    const response = await GET();

    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(data).toEqual(BOOKS);
  });

});
