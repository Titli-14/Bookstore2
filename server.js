const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Bookstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Define Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
  },
  { collection: "books" }
);

const Book = mongoose.model("Book", bookSchema);

// ✅ API to Get All Books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find({}, { title: 1, author: 1, _id: 0 });
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books" });
    }
});




// ✅ API for Login (Basic)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.json({ success: true, message: "Login Successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
});

// ✅ Serve Pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "public", "dashboard.html")));
app.get("/books", (req, res) => res.sendFile(path.join(__dirname, "public", "books.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "public", "contact.html")));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
