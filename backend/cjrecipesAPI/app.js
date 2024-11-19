const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();
require("dotenv").config();
app.use(express.json());

const userRouter = require("./routes/users");
const dishRouter = require("./routes/dishes");
const mainRouter = require("./routes/index");

const { PORT = 3000 } = process.env;

app.use("/", mainRouter);
app.use("/", dishRouter);
app.use("/", userRouter);

mongoose
  .connect("mongodb://localhost:27017/codejamrecipes")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.post("/api/query", async (req, res) => {
  let dinner = "pasta with marinara";
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant and always provide short answers of no more than 3 words, with no punctuation",
          },
          {
            role: "user",
            content: `What drink would you pair with ${dinner}?`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const drinkRec = response.data.choices[0].message.content;
    res.json({ message: drinkRec });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({
      error: "Failed to fetch response from OpenAI",
      details: error.message,
    });
  }
});

app.use((req, res, next) => {
  res.status(NOT_FOUND_CODE).send({ message: "Requested resource not found" });
  next();
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
