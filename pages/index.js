import { useState } from "react";
import { supabase } from "lib/Store";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (process.browser) {
    document.title = "Login - UtamakeChat";
  }

  const handleLogin = async (type, username, password) => {
    try {
      const userid = username + '@utamake-teams-livechat.vercel.app'
      const { error, user } =
        type === "LOGIN"
          ? await supabase.auth.signIn({ email: userid, password })
          : await supabase.auth.signUp({ email: userid, password });
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert("Error with auth: " + error.message);
      } else if (!user)
        alert("Signup successful, confirmation mail should be sent soon!");
    } catch (error) {
      console.log("error", error);
      alert(error.error_description || error);
    }
  };

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      handleLogin("LOGIN", username, password);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
      <div className="w-full sm:w-1/2 xl:w-1/3">
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Username
            </label>
            <input
              type="text"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your UserID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Password
            </label>
            <input
              type="password"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => submitOnEnter(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleLogin("LOGIN", username, password);
              }}
              href={"/channels"}
              className="bg-green-500 hover:bg-teal text-white py-2 px-4 rounded text-center transition duration-150 hover:bg-white hover:text-green-500 border hover:border-green-500"
            >
              Login
            </a>
            <a
              href={"/signup"}
              className="border border-green-400 text-green-500 py-1 px-4 rounded w-full text-center transition duration-150 hover:bg-green-400 hover:text-white"
            >
              or SignUp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
