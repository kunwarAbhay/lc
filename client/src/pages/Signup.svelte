<script>
  const BASE_URL = "http://localhost:8000";

  const handleSignup = async (event) => {
    const data = new FormData(event.currentTarget);

    const user = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
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

      console.log("Signup successfull");

      localStorage.setItem("username", user.username);
      localStorage.setItem("auth-token", res.authtoken);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<main
  class="min-h-[80vh] flex flex-col justify-center "
>
  <div class="mx-auto min-w-[20rem] p-6 border-2 border-black">
      <h1 class="text-center mb-4 text-2xl font-bold">Signup</h1>
      <p class="text-center mb-6 text-sm font-medium tracking-wider">Let's Get Started</p>

      <form on:submit|preventDefault={handleSignup} class="flex flex-col gap-4 mx-auto">
        <input
          required
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          class="p-3 border-black focus:outline-violet-900"
        />

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
          value="Signup"
          class="py-3 border-violet-900 bg-red-600 border-none tracking-wider text-white outline-none"
        />
      </form>
  </div>
</main>

