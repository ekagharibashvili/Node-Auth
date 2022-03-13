var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://epamuser:mVaOWrAKXpFM8iYI@cluster1-shard-00-00.vkmzy.mongodb.net:27017,cluster1-shard-00-01.vkmzy.mongodb.net:27017,cluster1-shard-00-02.vkmzy.mongodb.net:27017/users?ssl=true&replicaSet=atlas-2v7jra-shard-0&authSource=admin&retryWrites=true&w=majority"
);
