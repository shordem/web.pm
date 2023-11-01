const API_URL_TODO = "https://api.todo-app.horlakz.com/todos";

export async function getTodo() {
  try {
    const res = await fetch(API_URL_TODO, {
      mode: "no-cors",
    });
    if (!res.ok) throw new Error("Unable to get tasks");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function addTodo(task) {
  try {
    const res = await fetch(API_URL_TODO, {
      method: "POST",
      body: JSON.stringify(task),
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
export async function updateTodo(task, id) {
  try {
    const res = await fetch(
      `${API_URL_TODO}/d88e6675-b4e2-4ad8-a02b-05b01b0189c9`,
      {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await fetch(
      `${API_URL_TODO}/54d27e82-3320-4519-adae-7c6eee7d4741`,
      {
        method: "DELETE",
      }
    );
  } catch (err) {
    throw new Error(err);
  }
}
