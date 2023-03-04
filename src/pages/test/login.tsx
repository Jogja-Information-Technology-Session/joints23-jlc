import { type NextPage } from "next";
import Link from "next/link";
import { api, setToken } from "~/utils/api";

const Login: NextPage = () => {
  const login = api.user.login.useMutation({
    onSuccess: (accessToken: string) => {
      // TODO store accessToken in state?
      setToken(accessToken);
      console.log(accessToken);
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

    login.mutate({ username, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="rounded border shadow-sm"
          type="username"
          name="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="rounded border shadow-sm"
          type="password"
          name="password"
        />
        <br />
        <button className="bg-blue-200" type="submit">
          Login
        </button>
        <br />
        <br />
        <Link className="underline" href="/test/addUser">
          addUser
        </Link>
        <br />
        <Link className="underline" href="/test/addQuestion">
          add Question
        </Link>
      </form>
    </>
  );
};

export default Login;
