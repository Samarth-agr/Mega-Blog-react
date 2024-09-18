import conf from "../config/config";
import { Client, Account} from 'appwrite';

export class AuthService{
    Client = new Client();
    account;
    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProject)
        this.account = new Account(this.Client);
    }

    //Sign up
    async CreateAccount({email,password,name}){
        try{
        const userAccount = await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            //login directly after creation
            return this.login(email,password);
        }
        else{
            return userAccount;
        }
    }
        catch(error){
           throw error;
        } 
    }

    //login

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            throw error;
        }
    }

    //logout
    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }
}


const authservice = new AuthService();

export default authservice;