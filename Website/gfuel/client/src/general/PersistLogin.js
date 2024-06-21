import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { BarLoader } from "react-spinners";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
        try {
          console.log("auth from p", auth);
          await refresh();
        } catch (err) {
          console.error(err);
        } finally {
          isMounted && setIsLoading(false);
        }
      };

      // persist added here AFTER tutorial video
      // Avoids unwanted call to verifyRefreshToken
      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

      return () => (isMounted = false);
    }, [auth,auth?.accessToken, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <div className="mt-[-6rem] h-screen flex justify-center items-center">
                    <BarLoader/>
                </div>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin