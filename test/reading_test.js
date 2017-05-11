const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
  let joe, chong, anita, eric;
  beforeEach((done) =>{
      joe = new User({name: 'joe'});
      chong = new User({name: 'chong'});
      anita = new User({name: 'anita'});
      eric = new User({name: 'eric'});
      Promise.all([joe.save(), chong.save(), anita.save(), eric.save()])
        .then(() => done());
  });

  it('finds all users with a name of joe', (done) =>{
    User.find({name: 'joe'})
      .then((users) => {
        assert(joe._id.toString() === users[0]._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id})
      .then((user) =>{
        assert(user._id.toString() === joe._id.toString());
        done();
      })
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({name: 1}) // 1 -> asc, -1 desc
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'chong');
        assert(users[1].name === 'eric');
        done();
      });
  });
});
