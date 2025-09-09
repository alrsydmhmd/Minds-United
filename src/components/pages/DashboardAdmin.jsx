import { useEffect } from "react";

export default function DashboardAdmin() {
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:4000/admin", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      <p>Selamat datang, Admin!</p>
    </div>
    );
  }
  