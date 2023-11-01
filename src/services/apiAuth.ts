const API_URL = "https://api.todo-app.horlakz.com";

export async function signup(user: {
  fullname: "string";
  email: "string";
  username: "string";
  password: "string";
}) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function login(logindetails: {
  username: "string";
  password: "string";
}) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify(logindetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUser() {
  try {
    const res = await fetch(`${API_URL}/user`, { mode: "no-cors" });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
