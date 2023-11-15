<script>  
  const BASE_URL = "http://localhost:8000";

  const handleLogin = async (event) => {
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log(user);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      if (!res.status) {
        throw new Error(res.msg);
      }

      console.log("Logged in successfully");
      localStorage.setItem("friends", res.data.friends.join(","));
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("auth-token", res.authtoken);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<main
  class="min-h-[80vh] flex flex-col justify-center "
>
  <div class="mx-auto border-2 border-black p-6">
      <h1 class="text-center  mb-4 text-2xl font-bold">Login</h1>
      <p class="text-center mb-6 text-sm font-medium tracking-wider">Welcome back! Please enter your details</p>

      <form on:submit|preventDefault={handleLogin} class="flex flex-col gap-4 mx-auto">    
        <input
          required
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
          class="p-3 border-black focus:outline-violet-900"
        />

        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          class="p-3 border-black focus:outline-violet-900"
        />

        <input
          type="submit"
          value="Login"
          class="py-3 bg-red-700 cursor-pointer border-none tracking-wider text-white outline-none"
        />
      </form>
  </div>
</main>