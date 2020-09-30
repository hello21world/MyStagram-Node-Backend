var MongoClient = require("mongodb").MongoClient;
const CONFIG = require("./../config");

const state = {
  db: null
};

module.exports = {
  connect: successfulConnection => {
    if (state.db) {
      successfulConnection(state.db, null);
    } else {
      MongoClient.connect(CONFIG.HOST, {
        poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then((db, err) => {
          if (err) {
            if (state.db) {
              state.db.close();
            }
            successfulConnection(null, err);
          } else {
            state.db = db.db(CONFIG.DB_NAME);
            successfulConnection(state.db, null);
          }
        })
        .catch(dberr => {
          successfulConnection(null, dberr);
        });
    }
  }
};
