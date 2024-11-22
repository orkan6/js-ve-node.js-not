var http=require("http")

var url=require("url")

http.createServer(function (req,res){

res.writeHead(200,{"Content-Type":"text/html"});

var q=url.parse(req.url,true).query;

var txt=q.kullanici_adi+" "+q.sifre;

res.end(txt)

}).listen(8080)
----------------------------------------------------
var url=require("url");

var adr="http://www.deu.edu.tr/ogrenciler.html?username=can.aydin&password=1234";

var q=url.parse(adr,true);

console.log(q.host);

console.log(q.pathname);

console.log(q.search);

 

var qdata=q.query;

console.log(qdata)

console.log(qdata.kullanici_adi);

console.log(qdata.sifre);


------------------------------------------------------ 

var http=require("http")

const dd=  import('upper-case');

 

http.createServer(function(req,res){

    res.writeHead(200,{'Content-Type':'text/html'})

    res.write(dd.upperCase("Hello World"))

    res.end("deneme")

}).listen(5000);
