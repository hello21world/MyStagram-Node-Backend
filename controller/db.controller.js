const db = require("../db/connect");

module.exports = {
  get: (collectionName, query, p) => {
    const projection = p ? p : { _id: 0 };
    const $exist = true;
    let n = 10000;
    return new Promise((resolve) => {
      db.connect((dbo, dberr) => {
        if (!dberr) {
          dbo
            .collection(collectionName)
            .find(query, { projection, $exist })
            .sort({ _id: -1 })
            .limit(n)
            .toArray((err, result) => {
              if (err) resolve(err);
              else resolve(result);
            });
        } else {
          resolve(dberr);
        }
      });
    }).then((d) => {
      return d;
    });
  },

  findOne: (collectionName, query, p) => {
    const $exist = true;
    return new Promise((resolve) => {
      db.connect((dbo, dberr) => {
        if (!dberr) {
          dbo
            .collection(collectionName)
            .findOne(query, { p, $exist }, (err, result) => {
              if (err) resolve(err);
              else resolve(result);
            });
        } else {
          resolve(dberr);
        }
      });
    }).then((d) => {
      return d;
    });
  },

  insertOne: (collectionName, data) => {
    return new Promise((resolve) => {
      db.connect((dbo, dberr) => {
        if (!dberr) {
          dbo.collection(collectionName).insertOne(data, (err, result) => {
            if (err) resolve(err);
            else resolve(result);
          });
        } else {
          resolve(dberr);
        }
      });
    }).then((d) => {
      return d;
    });
  },
};
