const app = document.getElementById("app");

// Navigation
function navigate(page) {
  if (page === "login") loadLogin();
  if (page === "register") loadRegister();
  if (page === "users") loadUsers();
}

// Register Page
function loadRegister() {
  app.innerHTML = `
    <div class="container">
      <h3>Register</h3>
      <input type="text" id="name" placeholder="Name" />
      <input type="email" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <input type="text" id="role" placeholder="Role (admin/employee)" />
      <button onclick="handleRegister()">Register</button>
      <pre id="result"></pre>
    </div>
  `;
}

// Login Page
function loadLogin() {
  app.innerHTML = `
    <div class="container">
      <h3>Login</h3>
      <input type="email" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="handleLogin()">Login</button>
      <pre id="result"></pre>
    </div>
  `;
}

// Users Page
function loadUsers() {
  app.innerHTML = `
    <div class="container">
      <h3>All Users (Protected)</h3>
      <button onclick="handleGetUsers()">Fetch Users</button>
      <pre id="result"></pre>
    </div>
  `;
}

// Register Handler
async function handleRegister() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  try {
    const res = await registerUser(data);
    document.getElementById("result").textContent = JSON.stringify(res, null, 2);
  } catch (error) {
    document.getElementById("result").textContent = "Request failed";
  }
}


// Login Handler
async function handleLogin() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const res = await loginUser(data);

  if (res.token) {
    setToken(res.token);
  }

  document.getElementById("result").textContent = JSON.stringify(res, null, 2);
}

// Get Users Handler
async function handleGetUsers() {
  const res = await getUsers();
  document.getElementById("result").textContent = JSON.stringify(res, null, 2);
}

// Default Page
loadLogin();
