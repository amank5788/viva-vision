const express=require ('express');
const app=express();
const port=2300;
const OpenAI=require ("openai");

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();



app.get('/',(req,res)=>{
    res.send('hello');
})




app.listen(port,()=>{
console.log("app is listening on port",port)
});