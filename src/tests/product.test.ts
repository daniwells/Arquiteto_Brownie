import { getLatestProducts, getProdutBySlug } from '../lib/actions/product.actions';

test('response must have the same attributes', async () => {
  const response = await getProdutBySlug('classico_classico');
  console.log({...response?.content})
  expect({
    ...response?.content,
    price: response?.content?.price.toString(),
  }).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    slug: expect.any(String),
    images: [
      expect.any(String),
      expect.any(String)
    ],
    description: expect.any(String),
    price: expect.any(String),
  });
});



test("response can't be false", async () => {
  const response = await getLatestProducts();
  await expect(response).toBeDefined();
});
