const express = require("express");
const {connectTOMongoDB} = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");
const cors = require("cors");


const app = express();
const PORT = 3000;

connectTOMongoDB(
  "mongodb+srv://uniquesonu:sonu-project1@cluster0.yuae3.mongodb.net/"
)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

  app.use(express.json());
app.use(cors());

app.use("/url", urlRouter);
app.get('/:shortId', async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectURL);
    
}
)

app.listen(PORT, () => console.log(`Server listen on PORT: ${PORT}`));
