import conf from '../conf.js'
import {Client, Account, ID} from "appwrite"

export class AuthService {
    // lets make two properties
    client = new Client();
    account;  // account constructor se banaege (jab object bane)-
              // just to save resources

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(client);
    }

    // ek method (wrapper type ka) appwrite ki sari services ke liye
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                //call another method (account exist krta h to login karado)
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);

        }

        return null;
    }
}

const authService = new AuthService(); 
export default authService
