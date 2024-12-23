import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Countries from "./components/countries";
import supabase from "./config/supabaseClient";
import Test from "./components/Test";
import Signup from "./components/Signup";

function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // const getUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   return user;
  // };

  const getEmail = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user.user_metadata;

    setEmail(email.password);
    console.log(email);
  };

  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();

    console.log(data, error);
  };

  useEffect(() => {
    getEmail();
  }, [email]);

  if (!session) {
    // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
    return <Signup />;
  } else {
    return (
      <div>
        <p>Hello {email}</p>
        <Countries />
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}

export default App;
