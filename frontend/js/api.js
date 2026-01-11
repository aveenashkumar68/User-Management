const BASE_URL = "http://localhost:5000/api/users";

// Save token
function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

// Register
async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Login
async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Get all users (Protected)
async function getUsers() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}
