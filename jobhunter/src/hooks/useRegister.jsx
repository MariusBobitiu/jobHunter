function useRegister() {
  const register = async (username, email, password) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userName: username, email, password }),
        }
      );
      if (res.status === 409) {
        alert("Username or email already exists");
        return;
      }
      if (res.status === 500) {
        alert("Error in user creation");
        return;
      }
      if (res.status === 200) {
        return { username, password };
      }
    } catch (err) {
      console.error(err);
    }
  };
  return register;
}

export default useRegister;
