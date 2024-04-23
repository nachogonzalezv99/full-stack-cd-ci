import { useEffect, useState } from "react";
import "./App.css";

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

function App() {
  const [users, setUsers] = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        name: e.target.name.value,
      }),
    }).then(res => console.log(res));
  };

  useEffect(() => {
    fetch(`${backendUrl}/users`)
      .then((res) => res.json())
      .then(({ users }) => setUsers(users));
  }, []);

  return (
    <>
      <h1>Users page</h1>
      {users.map((user: any) => (
        <p>
          {user.email} - ${user.name}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required />

        <label htmlFor="name">Name</label>
        <input id="name"  name="name" required />

        <button>Create</button>
      </form>
    </>
  );
}

export default App;
