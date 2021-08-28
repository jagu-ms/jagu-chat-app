import AsyncStorage from '@react-native-async-storage/async-storage';
//AsyncStorage is async.

export default {

    //Set user
    setUser: async user => await AsyncStorage.setItem(
        'user', JSON.stringify(user)
    ),
        
    //Get user
    getUser: async () => JSON.parse(await AsyncStorage.getItem('user')),

    //Is user authenticated.
    auth: async () => await AsyncStorage.getItem('user') != null,

    //Get user token.
    getToken: async () => {
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        return user !== null ? user.token : '';
    },

    //Update user profile
    updateProfile: async profile => {
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        profile.token = user.token;
        await AsyncStorage.setItem('user', JSON.stringify(profile));
    },

    //Delete user data.
    logout: async () => await AsyncStorage.removeItem('user')
    
}