var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var userFile = __dirname + "/" + "users.json";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var user = {
  "user4" : {
    "name" : "tina",
    "profession" : "architect",
    "id": 4
  }
}

function readDataFromFile(file){
  try {
    var data = fs.readFileSync(file, 'utf8');
    return data;
  } catch(e) {
    console.log('Error when reading file:', e.stack);
    return "";
  }
}

function saveDataToFile(file, data){
  try {
    fs.writeFileSync(file, data);
  } catch(e) {
    console.log('Error when writing file:', e.stack);
  }
}

function getAllUser(){
  return readDataFromFile(userFile);
}

function addUser(userInfo){
  // Get existing users
  var data = readDataFromFile(userFile);
  // Convert string to json
  data = JSON.parse( data );
  // Add new user info to current list
  data["user4"] = userInfo;
  // Parse data from json to string and save to file
  saveDataToFile(userFile, JSON.stringify(data));
  return readDataFromFile(userFile);
}

function modifyUser(id, newInfo){
  // Get existing users
  var data = readDataFromFile(userFile);
  // Convert string to json
  data = JSON.parse( data );
  // Get user info by id
  var userInfo = data["user" + id];
  // Check and update data
  if(typeof newInfo.id != "undefined"){
    userInfo.id = newInfo.id;
  }
  if(typeof newInfo.name != "undefined"){
    userInfo.name = newInfo.name;
  }
  if(typeof newInfo.profession != "undefined"){
    userInfo.profession = newInfo.profession;
  }
  // Set back to data json
  data["user" + id] = userInfo;
  // Parse data from json to string and save to file
  saveDataToFile(userFile, JSON.stringify(data));
  return readDataFromFile(userFile);
}

function deleteUser(id){
  // Get existing users
  var data = readDataFromFile(userFile);
  // Convert string to json
  data = JSON.parse( data );
  // Delete user info by id
  delete data["user" + id];
  // Parse data from json to string and save to file
  saveDataToFile(userFile, JSON.stringify(data));
  return readDataFromFile(userFile);
}

app.get('/getAllUser', function (req, res) {
  res.write(getAllUser());
  res.end();
})

app.post('/addUser', function (req, res) {
  res.write(addUser(req.body.userInfo));
  res.end();
})

app.put('/modifyUser', function (req, res) {
  res.write(modifyUser(req.body.id, req.body.userInfo));
  res.end();
})

app.delete('/deleteUser', function (req, res) {
  res.write(deleteUser(req.body.id));
  res.end();
})


var server = app.listen(8081, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);

})
