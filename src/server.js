const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("Speakx");
const coll = db.collection("Users-list");
const coll2 = db.collection("Data");
const userinfo ={};
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
let realotp = 0;
let userotp = 0;
let u_name = '';
let u_email = '';
let u_phone = '';
let u_password = '';
let u_reg ='';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to mongodb");
    } catch (err) {
        console.log("Error: " + err);
    }
}

connectToMongo().then(() => {
    
    app.post("/newUserDetail", async (req, res) => {
        console.log(req.body);  
    
        const { name, phone, email, password, reg } = req.body;
    
        if (!name || !phone || !email || !password || !reg) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
    
        try {
            async function generateRandom4DigitNumber() {
                return Math.floor(Math.random() * 9000) + 1000;
            }
            realotp = await generateRandom4DigitNumber();
            console.log(realotp);
            const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  secure :true,
  port : 465,
  auth: {
    user: 'g6056840@gmail.com', 
    pass:'ofil lewc icqp tndw'   
  }
});

let mailOptions = {
  from: 'g6056840@gmail.com',      
  to: email, 
  subject: 'SPEAKX Account Verification',             
  text: `This is a system generated email. There is no need to reply back. Your otp is: ${realotp}`, 
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
            u_name = req.body.name;
            u_phone = req.body.phone;
            u_email = req.body.email;
            u_password = req.body.password;
            u_reg = req.body.reg; 
            res.send("Otp generated");

        } catch (error) {
            console.error("Error inserting user data:", error);
            res.status(500).json({ message: "There was an error saving the user." });
        }
    });

    app.post("/otp",async (req,res)=>{
        console.log(req.body.otp);
        userotp = req.body.otp;
        if(realotp === userotp){
            const user = {
                u_name,
                u_email,
                u_phone,
                u_reg,
                u_password,
            }
            const result = await coll.insertOne(user);
            res.status(201).json({ message: "Account created successfully", user: { ...user, _id: result.insertedId } });

        }
    })

    app.post("/search", async (req, res) => {
        // console.log(req.body); 
        const { query, page = 1, limit = 10 } = req.body; 
    
        try {
            const results = await coll2.find({ title: { $regex: query, $options: 'i' } })
                .skip((page - 1) * limit) 
                .limit(limit)
                .toArray();
    
            const total = await coll2.countDocuments({ title: { $regex: query, $options: 'i' } });
    
            if (results.length === 0) {
                return res.status(404).json({ message: "No matching results found" });
            }
    
            return res.json({ results, total });
        } catch (error) {
            console.error("Error finding:", error);
            return res.status(500).json({ message: "Internal Server Error" }); 
        }
    });
     

    app.post("/signup", async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body);
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }
        
        try {
            const user = await coll.findOne({ u_name: username });

            if (!user || user.u_password !== password) {
                return res.status(401).send("Not matched");
            }
            userinfo.name = user.u_name;
            userinfo.phone =  user.u_phone;  
            userinfo.reg = user.u_reg;
            console.log(userinfo);
            return res.send("Matched");
        } catch (error) {
            console.error("Error during signup:", error);
            return res.status(500).json({ message: "Not matched" });
        }
    });

    
    app.listen(PORT, () => {
        console.log("Server is listening on port number: " + PORT);
    });
});

process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log("MongoDB connection closed");
        process.exit(0);
    } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
    }
});
