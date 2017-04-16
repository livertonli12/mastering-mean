var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User'
  }
});

//Post.find().populate('author').exec(function(err, posts){
//  ...
//});

mongoose.model('Post', PostSchema);
