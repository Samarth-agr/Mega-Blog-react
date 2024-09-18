import conf from "../config/config";
import { Client,ID,Databases,Storage,Query} from 'appwrite';

export class Service{
    Client = new Client();
    databases;
    storage;
    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProject);

        this.databases = new Databases(this.Client);
        this.storage = new Storage(this.storage);        
    }

    //create post

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabase , conf.appwriteCollection , slug , {
                title,
                content,
                featuredImage,
                status,
                userId,
            })
        } catch (error) {
            console.log(error);
            return false
        }
    }

    //update post

    async updatePost(slug , {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabase , conf.appwriteCollection , slug , {
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Delete 

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabase,conf.appwriteCollection,slug);
            return true
        } 
        catch (error) {
            console.log("Appwrite deletepost :", error)
            return false
        }
    }

    //get single post

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabase,conf.appwriteCollection,slug)
        } catch (error) {
            console.log("Appwrite - conf - getpost " , error)
            return false
        }
    }

    //get multiple post
    async getPosts(){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabase,conf.appwriteCollection, [
                Query.equal("status" , "active")
            ])
        } catch (error) {
            console.log("Appwrite - conf - getPosts", error)
            return false
        }
    }

    //file upload
    async uploadFile(file){
        try {
            return await this.storage.createFile(conf.appwriteBucket,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite-conf-uploadfile",error)
            return false
        }
    }

    //delete file

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(conf.appwriteBucket,fileId)
            return true
        } catch (error) {
            console.log("Appwrite-conf-deletefile",error)
            return false
        }
    }

    //file preview

    async getFilePreviw(fileId){
        return await this.storage.getFilePreview(conf.appwriteBucket,fileId)
    }
}

const service = new Service();
export default service;