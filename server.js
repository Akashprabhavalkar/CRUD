var mysql = require("mysql");
var express = require("express");
var cookie = require("cookie-parser");
var multer = require("multer");
var fs = require("fs");
const bodyParser = require("body-parser");



var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

var index = fs.readFileSync("index.html");


app.listen(8081, function () 
{
    console.log("server running at http://localhost:8081");
})


app.get("/", function (req, res) 
{
    let header = fs.readFileSync("header.html");
    let footer = fs.readFileSync("footer.html");

    // res.send("welcome");
    fs.readFile("index.html", function (err, data) {
        res.send(header.toString() + data.toString() + footer.toString());
    })
})
app.get("/create", function (req, res) 
{
    let header = fs.readFileSync("header.html");
    let footer = fs.readFileSync("footer.html");

    // res.send("welcome");
    fs.readFile("create.html", function (err, data) {
        res.send(header.toString() + data.toString() + footer.toString());
    })
})


app.post("/save", function (req, res) 
{
    let body = req.body;
    let id = body.data.id;
    let name = body.data.name;
    let email = body.data.email;
    let mob_no = body.data.mob_no;
    let city = body.data.city;
    var con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "node crud"
        })
    con.connect(function (err) 
    {
        if (err) 
        {
            console.log(err);
        }
        var query;
        if (id == 0) 
        {
            query = "insert into users(name,email,mob_no,city)values('" + name + "','" + email + "','" + mob_no + "','" + city + "')";
        }
        else
         {
            query = "update users set name='" + name + "',email='" + email + "',mob_no='" + mob_no + "',city='" + city + "'where  id = " + id;
         }

         con.query(query, function (err, result) 
         {
             console.log("inserted")
             res.send({ data:{status:"success"} });
         })

    })

})



app.post("/delete", function (req, res) 
{
    let body = req.body;
    let id = body.data.id;

    var con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "node crud"
        })


    con.connect(function (err) 
    {
        if (err) 
        {
            console.log(err);
        }

        var query;

        query = "delete from users where id =" + id;

        con.query(query, function (err, result) 
        {
            console.log("inserted")
            res.send({ data:{status:"success"} });
        })
    })

})




app.post("/get", function (req, res) 
 {
    let body = req.body;
    let id = body.data.id;

    var con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "node crud"
        })
    con.connect(function (err) 
    {
        if (err)
         {
            console.log(err);
         }
        var query;
        if (id == 0) 
        {
            query = "select * from users";
        }
        else 
        {
            query = "select * from users where  id = " + id;
        }
        con.query(query, function (err, result) 
        {
            console.log("inserted")
            res.send({ data: result });
        })

    })
})



