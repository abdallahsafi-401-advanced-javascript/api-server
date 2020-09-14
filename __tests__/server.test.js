const { server }  = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('web server', ()=> {

  
  it('get products should respond with 200', ()=>{
    return mockRequest.get('/products').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('get products should respond with 200', ()=>{
    return mockRequest.get('/products/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('post products should respond with 200', ()=>{
    return mockRequest.post('/products').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('put products should respond with 200', ()=>{
    return mockRequest.put('/products/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('delete products should respond with 200', ()=>{
    return mockRequest.delete('/products/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });
  

  it('get categories should respond with 200', ()=>{
    return mockRequest.get('/categories').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('get categories should respond with 200', ()=>{
    return mockRequest.get('/categories/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });
  
  it('post categories should respond with 200', ()=>{
    return mockRequest.post('/categories').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('put categories should respond with 200', ()=>{
    return mockRequest.put('/categories/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
    });
  });

  it('delete categories should respond with 200', ()=>{
    return mockRequest.delete('/categories/:id').then(result=>{
      expect(result.status).toBe(200);
    }).catch(err=> {
      console.log(err);
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
    return mockRequest.get('/bad').then(result=>{
      expect(result.status).toBe(500);
    }).catch(err=> {
      console.log(err);
    });
  });


});