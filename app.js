
const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")

const app=express()
const port=process.env.PORT||3000;

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
    
})

app.post("/",function(req,res){
    const city=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?appid=9b651fea0d3aab68d26a941d16316d3f&q="+city+"&units=metric"
    
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const image=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+image+"@2x.png"
            res.write("<h1>the temperature in "+city+" is "+temp+" degrees Celsius</h1>")
            res.write("<h3>the weather is currently "+weatherDescription+"</h3>")
            res.write("<img src="+imageUrl+">")
            res.send();
        });
        
    });
})


app.listen(port,function(){
    console.log("server started")
})
console.log("hello")
