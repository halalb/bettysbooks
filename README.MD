# 📚 Betty's Books — Library Web App

A basic full-stack web application for managing books, users, and sessions. Built with Node.js, Express, MySQL, and EJS templates. This project was part of the **Dynamic Web Applications** course at Goldsmiths.

---

## 🧾 Features

* 📚 Add, delete, and list books
* 👤 Register and log in users
* 🔐 Session-based authentication
* 🎨 Server-side rendered views (EJS)
* 💾 MySQL relational database backend
* ✅ Form validation and clean routing

---

## ⚙️ Tech Stack

| Layer      | Stack                        |
| ---------- | ---------------------------- |
| Backend    | Node.js, Express.js          |
| Views      | EJS (Embedded JavaScript)    |
| Database   | MySQL                        |
| Styling    | CSS                          |
| Validation | express-validator (optional) |

---

## 📂 Project Structure

```
├── public/            → static CSS
├── routes/            → books.js, users.js, main.js
├── views/             → all .ejs templates (index, login, register, etc.)
├── create_db.sql      → database schema
├── insert_test_data.sql → seed/test data
├── index.js           → main server setup
```

---

## 🚀 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/yourusername/bettysbooks.git
cd bettysbooks
npm install
```

### 🛠️ Database Setup

1. Open MySQL shell:

```sql
SOURCE create_db.sql;
SOURCE insert_test_data.sql;
```

2. Update your DB credentials in `index.js`

### ▶️ Run the App

```bash
node index.js
```

Open `http://localhost:8080` in your browser.

---

## 🧠 Lessons This Project Was Supposed to Teach

* MVC folder structure
* EJS templating
* RESTful routes
* Session handling in Express
* SQL schema design

---

## 🙋‍♂️ Author

**Hasib Uddin**
Computer Science, Goldsmiths

---
