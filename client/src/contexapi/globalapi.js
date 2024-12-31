import { createContext, useEffect, useState } from 'react';

// Create a context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const[profileId,setprofileId]=useState(null);
  const[theme,setheme]=useState("dark");

  const updateState = (newValue) => {
    setState(newValue);
  };
  const updateprofileId = (newValue) => {
    setprofileId(newValue);
  };
const toggletheme=()=>{
  setheme(theme=="light"?"dark":"light");
}
useEffect(()=>{
  if(theme=="dark"){
    document.documentElement.classList.add("dark")
  }
  else{
    document.documentElement.classList.remove("dark")

  }
},[theme])

  return (
    <MyContext.Provider value={{ state, updateState,profileId ,updateprofileId,theme,toggletheme}}>
      {children}
    </MyContext.Provider>
  );
};
