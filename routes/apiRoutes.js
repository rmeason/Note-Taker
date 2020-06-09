let dbData = require("../db/db");

const fs = require("fs");
const util = require("util");
const writeFIleAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(dbData);
  });

  app.post("/api/notes", function(req, res) {

    var newNote =req.body;

    var lastId = dbData[dbData.length -1]["id"];
    var newId = lastId + 1;
    newNote["id"] = newId;

    console.log("Req.body:", req.body);
    dbData.push(newNote);

    writeFIleAsync("./db/db.json", JSON.stringify(dbData)).then(function(){
      console.log("db.json updated");
    });

    res.json(newNote);

  });

  app.delete("/api/notes/:id", function(req, res) {

    console.log("Req.params:", req.params);
    let chosenId = parseInt(req.params.id);
    console.log(chosenId);

    for (let i = 0; i < dbData.length; i++) {
      if (chosenId === dbData[i].id) {
          // delete noteContents[i];
          dbData.splice(i,1);
          
          let noteJSON = JSON.stringify(dbData, null, 2);

          writeFileAsync("./db/db.json", noteJSON).then(function() {
          console.log ("Chosen note has been deleted!");
      });                 
      }
  }
  res.json(dbData);

  });
};
