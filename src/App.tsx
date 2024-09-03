import { useState } from "react";
import "./App.css";
import { AxiosError } from "axios";
import { api } from "./http/client";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetPosts = async () => {
    setLoading(true);

    try {
      const res = await api.get<Post[]>(
        "posts"
      );

      setPosts(res.data);
    } catch (e) {
      const error = e as AxiosError;

      console.log("deu erro", error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Clique no botão para buscar os posts:</h2>
      <button onClick={handleGetPosts}>Buscar Posts</button>

      {loading && "Carregando..."}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
