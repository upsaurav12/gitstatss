// src/auth.js
import { account, OAuthProvider } from './appwrite'

export const loginWithGithub = async () => {
  try {
    await account.createOAuth2Session(OAuthProvider.Github , import.meta.env.VITE_SUCCESS_URL , import.meta.env.VITE_FAILURE_URL)
  } catch (error) {
    console.error(error)
  }
}

export const logoutUser = async () => {
  try {
    await account.deleteSession('current')
    localStorage.removeItem('githubUsername')
  } catch (error) {
    console.error("Logout User",error)
  }
}

export const getUser = async () => {
  try {
    
    return await account.get()
  } catch (error) {
    console.error("Error fetching user's details",error)
  }
}


export const getGitHubUsername = async () => {
    const cachedUsername = localStorage.getItem('githubUsername');
    if (cachedUsername) return cachedUsername
    try {
      const session = await account.getSession('current');
      const token = session.providerAccessToken;

      if (!token) {
        console.error('No Github access token found in session');
        return null
      }


      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        }
      })

      if (!res.ok) {
        throw new Error(`Github API error: ${res.statusText}`)
      }

      const data  = await res.json();
      localStorage.setItem('githubUsername', data.login)
      return data.login;
    } catch (error) {
      console.error('Error fetching Github username:', error)
      return null;
    }
};
  
