const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { MongoClient } = require("./db/db.connect");
const { router: userRouter } = require("./routes/user.route");
const { router: watchLaterRouter } = require("./routes/watchlater.route");
const { router: playlistRouter } = require("./routes/playlist.route");
const { router: videoRouter } = require("./routes/video.route");
const { router: likeDisLikeRouter } = require("./routes/like_dislike.route");
const { router: historyRouter } = require("./routes/history.route");
app.use(bodyParser.json());
app.use(cors());

app.use(videoRouter);
app.use(userRouter);
app.use(watchLaterRouter);
app.use(historyRouter);
app.use(likeDisLikeRouter);
app.use(playlistRouter);

MongoClient();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});

app.get("/", async (req, res) => {
  res.json({ success: true, message: "Welcome to Ankit's Youtube Server" });
});
//Handling 404 route
app.use(async (req, res) => {
  res.json({ success: false, error: "Not a valid call" });
});
//Handling any error
app.use(async (err, req, res, next) => {
  res.json({ success: false, error: err, message: err.message });
});
