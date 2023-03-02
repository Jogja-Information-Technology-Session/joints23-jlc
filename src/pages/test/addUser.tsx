import { type NextPage } from "next";
import { api, setToken } from "~/utils/api";

const addUser: NextPage = () => {
  const createUser = api.user.createUser.useMutation();
  const login = api.user.login.useMutation({
    onSuccess: (accessToken) => {
      setToken(accessToken);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    createUser.mutate({ username, password });
  };

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    login.mutate({ username, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">create</button>
      </form>

      <form onSubmit={handleLogin}>
        <label htmlFor="username">Admin Username</label>
        <input type="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default addUser;
