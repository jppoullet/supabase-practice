import React from "react";
import supabase from "../config/supabaseClient";

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "jppoullet@yahoo.com",
    password: "aaaaa11111",
    options: {
      data: {
        first_name: "John",
        age: 27,
      },
    },
  });
};

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <div></div>
      <button onClick={signUp}>Signup</button>
    </div>
  );
};

export default Signup;
