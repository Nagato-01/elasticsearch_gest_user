/* eslint-env mocha */

import request from 'supertest';  
import app from '../src/index.js';  
import db from '../src/database.js';  

describe('Users API', () => {
  beforeEach((done) => {
    db.run('DELETE FROM users', done);  
  });

  it('should create a new user', (done) => {
    request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(200)  
      .expect('Content-Type', /json/)  
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('name', 'John Doe');
        expect(res.body).to.have.property('email', 'john@example.com');
        done();
      });
  });

  it('should retrieve the user list', (done) => {
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Jane Doe', 'jane@example.com'], (err) => {
      if (err) return done(err);

      request(app)
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          // Vérifier que la réponse contient l'utilisateur ajouté
          expect(res.body).to.be.an('array').that.is.not.empty;
          expect(res.body[0]).to.include({ name: 'Jane Doe', email: 'jane@example.com' });
          done();
        });
    });
  });

  // Ajoutez plus de tests pour d'autres opérations CRUD
});
