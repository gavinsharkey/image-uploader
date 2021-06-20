const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AWS = require("aws-sdk");
const mime = require('mime-types');
const app = express();

require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const DOMAIN = process.env.DOMAIN;

// AWS
const s3 = new AWS.S3({ region: "us-east-1" });

// Middlewares
app.use(morgan("tiny"));
app.use(
  express.json({
    limit: "20mb",
  })
);
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// Routes
app.post("/api/upload", (req, res) => {
  try {
    const { file: fileAsBase64, fileName } = req.body;
    const [filePath, fileExt] = fileName.split(".");

    const Body = Buffer.from(fileAsBase64, "base64");
    const Key = filePath + Date.now().toString() + `.${fileExt}`;

    s3.upload(
      {
        Bucket: process.env.BUCKET_NAME,
        Key,
        Body,
      },
      (error, data) => {
        if (error) {
          res.status(500).send({
            status: "Error",
            error: error.message,
          });
        } else if (data) {
          res.status(201).send({
            status: "Created",
            location: "/api/image/" + data.Key,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      status: "Error",
      error,
    });
  }
});

app.get("/api/image/:key", (req, res) => {
  const { key: Key = "" } = req.params;

  try {
    s3.getObject({
      Key,
      Bucket: process.env.BUCKET_NAME,
    }, (error, data) => {
      if (error) {
        return res.status(400).send({
          status: "Error",
          error: error.message,
        });
      }

      res.set('Content-Type', mime.lookup(path.basename(Key)));
      res.set('Content-Disposition', `inline; filename="${path.basename(Key)}"`)
      res.status(200).send(data.Body);
    })
  } catch (error) {
    res.status(400).send({
      status: "Error",
      error,
    });
  }
});

// Web App
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
