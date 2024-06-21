// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);


//   return (
//     <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [formInfo, setFormInfo] = useState({})
    const [mail, setMail] = useState('');

    return (
        <AuthContext.Provider value={{
            auth, 
            setAuth,
            formInfo,
            setFormInfo,
            mail,
            setMail
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;


//auth will contain currently logged in persons email,accessToken,roles,

//formInfo contains details from hallcheckform to use in booksubmit