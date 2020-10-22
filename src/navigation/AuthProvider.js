import React, {createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            const isNewUser = response.additionalUserInfo;
            const {uid} = response.user;
            const userData = {email, uid, isNewUser};

            // console.log(uid);
            firestore()
              .collection('Users')
              .doc(`${userData.uid}`)
              .set(userData)
              .then(() => {
                console.log('user added');
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export {useAuth};
export default AuthProvider;
