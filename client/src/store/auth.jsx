import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading,setIsLoading] = useState(true);
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const [isAdmin, setIsAdmin] = useState(false);
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // Logged in
  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);

  //Logout Functionality
  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  // JWT AUTONTICATION - to get current loggedIn user data
  const userAuthentication = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization:authorizationToken ,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("User Data: ",data.userData);
        setUser(data.userData);
        setIsAdmin(data.userData.isAdmin);
        setIsLoading(false);
      }else{
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error fetching user data");
    }
  };
  // To Fetch the Services Data From Backend
  const getServices = async() =>{
    try {
      const response = await fetch("http://localhost:5000/api/data/service",{
        method:"GET",
      });
      if(response.ok){
        const data = await response.json();
        // console.log(data.msg);
        setServices(data.msg);
      }else {
        console.log("Error fetching services:", response.status);
      }
      // console.log("services",response);
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  }
  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services,authorizationToken, isLoading, isAdmin,}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("use Auth must be used within the AuthProvider");
  }
  return useContext(AuthContext);
};
