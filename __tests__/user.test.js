import request from 'supertest';
import { app } from '../app.js';
import { User } from '../models/user.model.js';
import mongoose from 'mongoose';

describe('User API', () => {
  let authToken;
  
  beforeEach(async () => {
    // Clean up before each test
    await User.deleteMany({});
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/user/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('email', 'test@test.com');
  });

  it('should login an existing user', async () => {
    // First create the user
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
    expect(res.body.data).toHaveProperty('accessToken');
  });
});