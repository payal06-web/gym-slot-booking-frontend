import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    try {
    JSON.parse(localStorage.getItem("user"))
}catch(err){
    return null;
}}
);

const [loading, setLoading]= useState(true);
useEffect(()=>{
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if(savedUser) setUser(savedUser);
    setLoading(false);

},[]);

  const login = (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;