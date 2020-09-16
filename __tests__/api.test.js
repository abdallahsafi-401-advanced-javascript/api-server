const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Store API', () => {
  //---------- TEST CATEGORIES ------------
  it('can post() a category item', async () => {
    const category = { name: 'cars', description: 'nice cars' };
    const data = await mockRequest.post('/api/v1/categories').send(category);
    const record = data.body;
    Object.keys(category).forEach((key) => {
      expect(record[key]).toEqual(category[key]);
    });
  });

  it('can get() a category item by id', async () => {
    const category = { name: 'cars', description: 'perfect cars' };
    const data = await mockRequest.post('/api/v1/categories').send(category);
    const record = data.body;
    const categoryRet = await mockRequest.get(
      `/api/v1/categories/${record._id}`,
    );

    const categoryItem = categoryRet.body;
    Object.keys(category).forEach((key) => {
      expect(categoryItem[key]).toEqual(category[key]);
    });
  });

  it('can get() all categories ', async () => {
    const category1 = { name: 'cars', description: 'perfect cars' };
    const category2 = { name: 'pins', description: 'perfect pins' };
    const catList = [category1, category2];
    await mockRequest.post('/api/v1/categories').send(category1);
    await mockRequest.post('/api/v1/categories').send(category2);
    // const record = data.body;
    const categoriesRet = await mockRequest.get('/api/v1/categories');
    const categoriesItem = categoriesRet.body.results;
    categoriesItem.forEach((key) => {
      expect(categoriesItem[key]).toEqual(catList[key]);
    });
  });

  it('can update() a category item', async () => {
    const category = { name: 'cars', description: 'perfect cars' };
    const tobeUpdate = { name: 'cars', description: 'Good cars' };
    const data = await mockRequest.post('/api/v1/categories').send(category);
    const record = data.body;
    await mockRequest.put(`/api/v1/categories/${record._id}`).send(tobeUpdate);
    const categoryRet = await mockRequest.get(
      `/api/v1/categories/${record._id}`,
    );
    const categoryItem = categoryRet.body;
    Object.keys(tobeUpdate).forEach((key) => {
      expect(categoryItem[key]).toEqual(tobeUpdate[key]);
    });
  });

  it('can delete() a category item', async () => {
    const category = { name: 'cars', description: 'perfect cars' };
    const data = await mockRequest.post('/api/v1/categories').send(category);
    const record = data.body;
    const categoryDeleted = await mockRequest.delete(
      `/api/v1/categories/${record._id}`,
    );
    const categoryItem = categoryDeleted.body;
    Object.keys(category).forEach((key) => {
      expect(categoryItem[key]).toEqual(category[key]);
    });
  });

  //---------- TEST PRODUCTS ------------

  it('can post() a product item', async () => {
    const product = {
      name: 'kia',
      category: 'cars',
      description: 'classic cars',
      price: 1.99,
      inStock: 0,
    };
    const data = await mockRequest.post('/api/v1/products').send(product);
    const record = data.body;
    Object.keys(product).forEach((key) => {
      expect(record[key]).toEqual(product[key]);
    });
  });

  it('can get() a product item by ID', async () => {
    const product = {
      name: 'kia',
      category: 'cars',
      description: 'classic cars',
      price: 1.99,
      inStock: 0,
    };
    const data = await mockRequest.post('/api/v1/products').send(product);
    const record = data.body;
    const productRet = await mockRequest.get(
      `/api/v1/products/${record._id}`,
    );
  
    const productItem = productRet.body;
    Object.keys(product).forEach((key) => {
      expect(productItem[key]).toEqual(product[key]);
    });
  });

  it('can get() all products ', async () => {
    const product1 = {  name: 'kia', category: 'cars', description: 'classic cars', price: 1.99,inStock: 0 };
    const product2 = {  name: 'bmw', category: 'cars', description: 'sport cars', price: 1.99,inStock: 0 };
    const productList = [product1, product2];
    await mockRequest.post('/api/v1/products').send(product1);
    await mockRequest.post('/api/v1/products').send(product2);
    // const record = data.body;
    const productsRet = await mockRequest.get('/api/v1/products');
    const productsItem = productsRet.body.results;
    productsItem.forEach((key) => {
      expect(productsItem[key]).toEqual(productList[key]);
    });
  });

  it('can update() a product item', async () => {
    const product = {
      name: 'kia',
      category: 'cars',
      description: 'classic cars',
      price: 1.99,
      inStock: 0,
    };
    const tobeUpdate = {
      name: 'bmw',
      category: 'cars',
      description: 'sport cars',
      price: 1.99,
      inStock: 0,
    };
    const data = await mockRequest.post('/api/v1/products').send(product);
    const record = data.body;
    await mockRequest.put(`/api/v1/products/${record._id}`).send(tobeUpdate);
    const productRet = await mockRequest.get(
      `/api/v1/products/${record._id}`,
    );
    const productItem = productRet.body;
    Object.keys(tobeUpdate).forEach((key) => {
      expect(productItem[key]).toEqual(tobeUpdate[key]);
    });
  });

  it('can delete() a product item', async () => {
    const category = {
      name: 'kia',
      category: 'cars',
      description: 'classic cars',
      price: 1.99,
      inStock: 0,
    };
    const data = await mockRequest.post('/api/v1/products').send(category);
    const record = data.body;
    const productDeleted = await mockRequest.delete(
      `/api/v1/products/${record._id}`,
    );
    const productItem = productDeleted.body;
    Object.keys(category).forEach((key) => {
      expect(productItem[key]).toEqual(category[key]);
    });
  });

  it('should respond with 404 for not found routes', ()=>{
    return mockRequest.get('/notFound').then(result=>{
      expect(result.status).toBe(404);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('should respond with 500 for bad routes', ()=>{
    return mockRequest.get('/api/v1/bad').then(result=>{
      expect(result.status).toBe(500);
    }).catch(err=> {
      console.log(err);
    });
  });
});
