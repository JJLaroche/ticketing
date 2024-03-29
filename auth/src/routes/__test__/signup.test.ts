import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on succesful signup', async () => {

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
});

it('returns a 400 with an invalid email', async () => {

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400)
});


it('returns a 400 with an invalid password', async () => {

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400)
});

it('returns a 400 with missing password and email', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400)
});

it('disallows sign up with same email', async () => {

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)


    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
});


it('sets a cookie after sucesfull sign up', async () => {

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

        expect(response.get("Set-Cookie")).toBeDefined()

});