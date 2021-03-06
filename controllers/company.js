var Mongo = require('mongodb')
  , MongoClient = Mongo.MongoClient
  , url = process.env.MONGODB_URI || "mongodb://localhost:27017/hiring";


var safeCreateMongoObjectID = function(idToCreate) {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if (checkForHexRegExp.test(idToCreate)) return new Mongo.ObjectID(idToCreate);
};


var mongoFind = function(criteria, projection, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("companies").find(criteria, projection).toArray(function(err, result) {
      if (err) throw err;
      callback(err, result);
      db.close();
    });
  });
};

var mongoDelete = function(criteria, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("companies").deleteOne(criteria, function(err, result) {
      if (err) throw err;
      callback(err, result);
      db.close();
    });
  });
};

var mongoInsert = function(obj, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    obj._id = new Mongo.ObjectID(obj._id);
    db.collection("companies").insertOne(obj, function(err, result) {
      callback(err, result);
      db.close();
    });
  });
};


var mongoUpdate = function(criteria, newvalues, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("companies").updateOne(criteria, newvalues, function(err, result) {
      if (err) throw err;
      callback(err, result);
      db.close();
    });
  });
};


var getAllCompanies = function(request, response) {
  mongoFind({}, {"name": 1, "homepage_url": 1}, function(err, result) {
    response.json(result);
  });
};


var getCompanyById = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId) {
    mongoFind({"_id": companyId}, {}, function(err, result) {
      if (result[0]) {
        response.json(result[0]);
      } else {
        response.sendStatus(404);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


var getProductsByCompanyId = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId) {
    mongoFind({"_id": companyId}, {"products.name": 1}, function(err, result) {
      if (result[0]) {
        response.json(result[0].products);
      } else {
        response.sendStatus(404);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


var getMembersByCompanyId = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("companies").aggregate(
        [
          {$match: {_id: companyId}},
          {$unwind: "$relationships" },
          {$group: {
            _id: {is_past: "$relationships.is_past"},
            relationships: {
              $push: {
                title: "$relationships.title",
                person: {
                  first_name: "$relationships.person.first_name",
                  last_name: "$relationships.person.last_name",
                }
              }
            }
          }},
          {$match: { "_id.is_past": false}}
        ]
      ).toArray(function(err, result) {
        if (err) throw err;
        if (result[0]) {
          response.json(result[0].relationships);
        } else {
          response.sendStatus(404);
        }
        db.close();
      });
    });
  } else {
    response.sendStatus(400);
  }
};


var deleteCompanyById = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId) {
    mongoDelete({"_id": companyId}, function(err, result) {
      if (result.deletedCount == 1) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


var createCompany = function(request, response) {
  var body = request.body;
  if (safeCreateMongoObjectID(body._id) && body._id && body.products
        && body.relationships) {
    mongoInsert(body, function(err, result) {
      if (!err) {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


var updateCompanyById = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId && !Array.isArray(request.body) && !request.body._id) {
    mongoUpdate({"_id": companyId}, request.body, function(err, result) {
      if (result.modifiedCount == 1) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


var addProductToCompanyById = function(request, response) {
  var companyId = safeCreateMongoObjectID(request.params.id);
  if (companyId && !Array.isArray(request.body) && Object.keys(request.body).length > 0) {
    mongoUpdate({"_id": companyId}, {"$addToSet": {"products": request.body}},
     function(err, result) {
      if (result.modifiedCount == 1) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  } else {
    response.sendStatus(400);
  }
};


module.exports = {
  getAllCompanies,
  getCompanyById,
  getProductsByCompanyId,
  getMembersByCompanyId,
  deleteCompanyById,
  createCompany,
  updateCompanyById,
  addProductToCompanyById
}
