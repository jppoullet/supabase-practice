import { useEffect, useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import Countries from "./components/countries";

const supabase = createClient(
  "https://hkbgripquxrybkogguai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrYmdyaXBxdXhyeWJrb2dndWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NjgzMzYsImV4cCI6MjA0OTU0NDMzNn0.S_3i97n-HgznZLdyhxeZtBeZl5xPwpVLDYGBmXKxvJU"
);

function App() {
  const [session, setSession] = useState(null);

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

  if (!session) {
    return <Auth supabaseClient={supabase} />;
  } else {
    return <Countries></Countries>;
  }
}

export default App;
