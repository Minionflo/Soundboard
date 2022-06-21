const app = require('express')();
const fs = require('fs');
const { exec } = require('child_process');

var port = 8080;

if (port >= 0 && port <= 65536) { console.log("port vaild") } else {port = 8080; console.log("port invalid. set port to 8080")}
app.listen(port, () => console.log("Started"))


app.get('/gui', function(req, res) {
    var raw_sounds = fs.readdirSync("./sounds")
    var sounds = []
    raw_sounds.forEach(function(v, i, a) {
        var sound = v.replace(".wav", '')
        sounds.push(sound)
    })
    var raw_html = fs.readFileSync("index.html")
    raw_html = raw_html.toString()
    var rep_html = ""
    sounds.forEach(function(v, i, a) {
        v.replace(".wav", ".sounds")
        rep_html = rep_html + `<div class="grid-item"><button class="button" id="sound-${v}" onclick="sound('${v}')" name="http://localhost:${port}/sound/${v}">${v}</button></div>`
    })
    var html = raw_html.replace("REPLACE", rep_html)
    res.send(html.toString())
})

app.get("/sound/:sound", function(req, res) {
    var sound = req.params.sound
    exec(`/usr/bin/pacmd play-file ${__dirname}/sounds/${sound}.wav 3`)
    res.send("OK")
})
