// 📌 API Base URL
const BASE_URL = "http://localhost:3000";

async function fetchBooks() {
    try {
        const response = await fetch("/books");
        if (!response.ok) throw new Error("Failed to fetch books");

        const books = await response.json();
        const bookList = document.getElementById("bookList");
        bookList.innerHTML = ""; // Clear existing content

        if (books.length === 0) {
            bookList.innerHTML = "<p>No books available.</p>";
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";
            bookCard.innerHTML = `
                <div class="book-title">${book.title || "Untitled"}</div>
                <div class="book-author">by ${book.author || "Unknown"}</div>
            `;
            bookList.appendChild(bookCard);
        });

    } catch (error) {
        console.error("Error fetching books:", error);
        document.getElementById("bookList").innerHTML = "<p>Error loading books.</p>";
    }
}

fetchBooks();


// Fetch books on page load
fetchBooks();



// Call fetchBooks when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);


// 📌 Register User
async function registerUser(event) {
    event.preventDefault();
    
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        let response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        let data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Registration error:", error);
    }
}

// 📌 Login User
async function loginUser(event) {
    event.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        let response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "home.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Login error:", error);
    }
}

// 📌 Logout User
function logoutUser() {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// 📌 Check if User is Logged In
function checkLoginStatus() {
    let token = localStorage.getItem("token");
    if (token) {
        document.getElementById("login-container").innerHTML = `
            <button onclick="logoutUser()">Logout</button>
        `;
    }
}

// 📌 Run on Page Load
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks();
    checkLoginStatus();
});

