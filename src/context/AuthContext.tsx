import React , {createContext , useReducer , useEffect, useContext} from "react";
import { getUser , getGitHubUsername , loginWithGithub , logoutUser } from "../appwrite/auth";

interface User {
    $id :string;
    name: string;
    email:string;
    emailVerification:boolean;
    prefs: Record<string , any>
}

interface AuthState {
    user: User | null;
    githubUsername : string |null ;
    loading: boolean;
    error : string | null;
}

type AuthAction = 
| { type : 'SET_USER'; payload: {user : User ; githubUsername: string | null}}
| { type : 'SET_LOADING'; payload: boolean}
| { type : 'SET_ERROR'; payload: string| null }
| { type : 'LOGOUT'}


const initialState:  AuthState = {
    user: null,
    githubUsername : null,
    loading: true,
    error: null,
}


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload.user,
          githubUsername: action.payload.githubUsername,
          loading: false,
          error: null,
        };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      case 'LOGOUT':
        return { ...state, user: null, githubUsername: null, loading: false, error: null };
      default:
        return state;
    }
  };

interface AuthContextType {
    state : AuthState;
    login: () => Promise<void>
    logout: () => Promise<void>
}  

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [state , dispatch] = useReducer(authReducer , initialState);


    useEffect(() => {
        const checkUser = async () => {
            dispatch({ type : 'SET_LOADING', payload: true});
            try {
                const userData = await getUser();
                if (userData) {
                  const username = await getGitHubUsername();
                  dispatch({
                    type: 'SET_USER',
                    payload: { user: userData, githubUsername: username || 'Unknown' },
                  });
                } else {
                  dispatch({ type: 'LOGOUT' });
                }
              } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to authenticate user' });
              }
        }

        checkUser();
    }, [])

    const login = async () => {
        try {
            await loginWithGithub();
        }catch(error) {
            dispatch({type: 'SET_ERROR' , payload: 'Login Failed'})
        }
    }

    const logout = async () => {
        try {
          await logoutUser();
          dispatch({ type: 'LOGOUT' });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: 'Logout failed' });
        }
      };


      return (
        <AuthContext.Provider value={{state , login , logout}}>
            {children}
        </AuthContext.Provider>
      )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context ) {
        throw new Error('useAuth must be within AuthProvider')
    }
    return context;
}