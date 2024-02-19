const express=require ('express');
const app=express();
const cors=require('cors');
const body_parser=require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const port=process.env.PORT;
const markdown=require('markdown-js');


const API=process.env.API_KEY;
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API);

// ...
app.use(cors());
app.use(body_parser.json());
async function run(question) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = question;
  try{
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const html = markdown.makeHtml(text);
   
    return html;
  }
  catch(e){
    console.log("error while responding by gemini",e);
  }

  
}

app.post("/response",async(req,res)=>{
  var response="";

  try{
    for(var i=0;i<req.body.length;i++){
      response+=`<strong>${req.body[i].role} :-</strong>`;
      const resp= await run((req.body[i].content));
      response+=resp;
      console.log(req.body[i].role,resp);
     
    }
    res.json(response);
  }
  catch(e){
    console.log("error while talking to gemini api",e);
  }
 
      
    
    
  
  
 
  
 
  
})

//run("what is object oriented programming");

app.get('/',(req,res)=>{
    res.send('welcome to voice-vision');
})




app.listen(port,()=>{
console.log("app is listening on port",port)
});