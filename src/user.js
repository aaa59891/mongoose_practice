const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  // if use '=>' this will be this whole dom,
  // only use function can access the User instance.
  return this.posts.length;
});

UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({_id: {$in: this.blogPosts}})
  .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
