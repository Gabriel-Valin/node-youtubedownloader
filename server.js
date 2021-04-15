require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs');

app.listen(process.env.PORT)
console.log('We server has been started at ' + process.env.PORT + '🤙🏻');

app.get('/', (req, res) => {
    res.render('./contents/index');
})

app.get('/download', async (req, res) => {

    let type = req.query.select;
    let uri = req.query.uri;
    let idInfo = await ytdl.getURLVideoID(uri);
    let infosVideo = await ytdl.getInfo(idInfo);
    let details = infosVideo.videoDetails;
    let title = details.title;

    res.header("Content-Disposition", `attachment; filename="${title}.${type}`);
    ytdl(uri).pipe(res);
});