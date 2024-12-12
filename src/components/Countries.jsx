import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const supabase = createClient(
    "https://hkbgripquxrybkogguai.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrYmdyaXBxdXhyeWJrb2dndWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NjgzMzYsImV4cCI6MjA0OTU0NDMzNn0.S_3i97n-HgznZLdyhxeZtBeZl5xPwpVLDYGBmXKxvJU"
  );

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  };

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
};

export default Countries;
