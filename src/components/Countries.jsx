import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
import supabase from "../config/supabaseClient";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const { data } = await supabase.from("countries").select("*");
    setCountries(data);
    console.log(data);
  };

  return (
    <div>
      <div>Logged in! Countries</div>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
