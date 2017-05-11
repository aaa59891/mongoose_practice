const assert = require('assert');
const User = require('../src/user');

describe('Updating record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: 'joe', likes: 0});
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done){
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].name === "Chong");
        assert(users.length === 1);
        done();
      })
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Chong');
    assertName(joe.save(), done);

  });

  it('A model instance can update', (done) => {
    assertName(joe.update({name: "Chong"}), done);
  });

  it("A model class can update", (done) =>{
    assertName(User.update({ name: "joe"}, {name: 'Chong'}), done);
  });

  it('A model class can update one record', (done) =>{
    assertName(User.findOneAndUpdate({name: 'joe'}, {name: 'Chong'}), done);
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {name: 'Chong'}), done);
  });

  it('A user can have their postCount incremented by 1', (done) => {
    User.update({name: 'joe'}, { $inc: {likes: 1}})
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.likes === joe.likes + 1);
        done();
      });
  });
});
