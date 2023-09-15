var express = require('express');
var cors=require('cors');
var mysql = require('mysql2');
var server = express();
var bodyParser = require('body-parser');
server.use(bodyParser.json());

server.use(cors({
  methods:['GET','POST','PUT','DELETE']
}));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbsmschool"

})

server.listen(8080, function check(err) {
    if (err) throw err;
    console.log("Started")
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Successfuly connected !")
});

//create records

server.post("/api/student/add", (req, res) => {
  let details = {
      stname: req.body.stname,
      course: req.body.course,
      fee: req.body.fee,
  };

  var sql = "SELECT MAX(id) as max_id FROM student"; // Find the maximum ID currently in use
  db.query(sql, (error, results) => {
      if (error) {
          res.send({ status: false, message: error });
      } else {
          const newId = parseInt(results[0].max_id) + 1; // Convert the max_id value to a number and increment to generate a new ID
          details.id = newId; // Add the new ID to the details object

          sql = "INSERT INTO student SET ?";
          db.query(sql, details, (error) => {
              if (error) {
                  res.send({ status: false, message: error});
              } else {
                  res.send({ status: true, message: "Student created successfully" });
              }
          });
      }
  });
});


// Get records

server.get("/api/student", (req, res) => {
    let sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

//Update the records

server.put("/api/student/update/:id", (req, res) => {
    let sql =
      "UPDATE student SET stname='" + req.body.stname +"', course='" + req.body.course +"',fee='" +req.body.fee +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send({ status: true, message: "Student Updated successfully" });
      }
    });
  });

  // delete records

  server.delete("/api/student/delete/:id", (req,res) =>{
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    db.query(sql,(error) =>{
      if(error){
          res.send({status:false, message:error});
      }else{
        res.send({status:true, message:"Deleted successfuly"});
      }
    });

  });

  //search by name

  server.get("/api/student/:id",(req,res)=>{

    const studentId=req.params.id;
    let sql="SELECT * FROM student WHERE id =" + studentId + "";
    
    db.query(sql,(err,result)=>{
      if(err){
          res.send({status:false,message:err});

      }else{
          res.send({status:true,data:result})
      }
    })
  })

  