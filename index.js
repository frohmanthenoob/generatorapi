const express = require('express');
const app = express();
const path = require("path");
const Jimp = require("jimp");

console.log("Host on Http://localhost:9595")


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/readme.html"))
})

app.get('/img/:imgID/text/:addText', function (req, res) {
    var fileName = '鸚鵡兄弟.png',
        text = req.params.addText,
        loadedImage,
        picHeight, picWidth,
        textHeight, textWidth;
    Jimp.read(path.join(__dirname+"/img/"+ req.params.imgID+".jpg")).then(function (image) {
        loadedImage = image;
        picHeight = image.bitmap.height;
        picWidth = image.bitmap.width;
        return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    }).then(function (font) {
        textHeight = picHeight*0.95 - 64;
        //console.log("picHeight = "+picHeight+"; picWidth = "+picWidth+";");
        textWidth = picWidth / 19;
        //console.log("text length = "+text.length+";")
        //console.log("textHeight = "+textHeight+"; textWidth = "+textWidth+";");
        loadedImage.print(font, textWidth, textHeight, text).getBuffer(Jimp.MIME_PNG,function(err, buffer){
            res.end(buffer);
        });
    }).catch(function (error) {
        res.send(error)
    })
})
app.listen(process.env.PORT || 5000)