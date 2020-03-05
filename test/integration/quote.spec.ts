
import app from '../../src/index';
import * as dbHandler from './../dbHandler';

describe('Quotes API', () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clear());
  afterAll(async () => await dbHandler.close());

  const quoteData = {
    text: 'My biggest weakness is my sensitivity. I am too sensitive a person.',
    author: 'Mike Tyson'
  }

  it('Get base route should return status 404', async done => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    const expected = JSON.stringify({
      message: 'Route GET:/ not found',
      error: 'Not Found',
      statusCode: 404,
    });

    expect(response.statusCode).toBe(404);
    expect(response.payload).toEqual(expected);
    done();
  });

  // it('Post cars should return new car obj with status 200', async done => {
  // 	//Arrange & Act
  // 	const response = await app.inject({
  // 		method: 'POST',
  // 		payload: carRequest,
  // 		url: '/api/cars',
  // 	});

  // 	const payload = JSON.parse(response.payload);

  // 	//Assert
  // 	expect(response.statusCode).toBe(200);
  // 	expect(payload._id).not.toBeNull();
  // 	done();
  // });
});


