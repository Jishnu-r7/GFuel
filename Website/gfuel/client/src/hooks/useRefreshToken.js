import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();



    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        setAuth(prev => {

            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                userEmail: response.data.userEmail,
                username: response.data.username
            }
        });
        console.log("the auth", auth)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;