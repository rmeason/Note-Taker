const dbData = require("../db/db.json");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(dbData);
  });

  app.post("/api/notes", function(req, res) {

    if (dbData.length < 5) {
      dbData.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

  app.delete("/api/notes/:id", function(req, res) {

    dbData.length = 0;

    res.json({ ok: true });
  });
};
