import { AuthService } from "./auth";

const API_URL = "https://api.todo-app.horlakz.com";

const auth = new AuthService();

export async function signup(user) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      mode: "no-cors",
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

export async function login(logindetails) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(logindetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUser() {
  try {
    const res = await auth.user();

    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}
