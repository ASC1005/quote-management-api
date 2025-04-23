import request from 'supertest';
import { app } from '../app.js';
import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

describe('Product API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/v1/product/create', () => {
    it('should create a new product', async () => {
      const res = await request(app)
        .post('/api/v1/product/create')
        .send({
          name: 'Test Product',
          price: 100,
          description: 'Test Description',
          image: 'test.jpg'
        });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('name', 'Test Product');
    });
  });

  describe('GET /api/v1/product/all', () => {
    it('should get all products', async () => {
      const res = await request(app)
        .get('/api/v1/product/all');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });
});