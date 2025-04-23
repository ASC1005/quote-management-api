import request from 'supertest';
import { app } from '../app.js';
import { Quote } from '../models/quote.model.js';
import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Quote API', () => {
  let authToken;
  let productId;

  beforeEach(async () => {
    // Clean up before each test
    await Quote.deleteMany({});
    await Product.deleteMany({});
    await mongoose.model('User').deleteMany({});
    
    // Register user
    const registerRes = await request(app)
      .post('/api/v1/user/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    // Login
    const loginRes = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });
    
    authToken = loginRes.body.data.accessToken;

    // Create a test product
    const product = await Product.create({
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      image: 'test.jpg'
    });
    productId = product._id;
  });

  describe('POST /api/v1/quote/create', () => {
    it('should create a new quote', async () => {
      const res = await request(app)
        .post('/api/v1/quote/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          items: [{
            product: productId,
            quantity: 2
          }]
        });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('total');
      expect(res.body.data.items).toHaveLength(1);
    });
  });

  describe('GET /api/v1/quote', () => {
    it('should get all quotes for user', async () => {
      const res = await request(app)
        .get('/api/v1/quote')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });
});

describe('User API', () => {
  beforeEach(async () => {
    // Clean up users before each test
    await mongoose.model('User').deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/user/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });
    expect(res.status).toBe(201);
  });

  it('should login an existing user', async () => {
    // First register
    await request(app)
      .post('/api/v1/user/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    // Then try to login
    const res = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });
    expect(res.status).toBe(200);
  });
});