import { FilterQuery,UpdateQuery,QueryOptions } from "mongoose";


export interface IBaseRepository<T>{
    find(filter:FilterQuery<T>):Promise<T[]|null>
    findOne(filter:FilterQuery<T>):Promise<T|null>
    findById(id:string):Promise<T|null>
    findByIdAndUpdate(id:string,update:UpdateQuery<T>,options?:{new?:boolean}):Promise<T|null>
    findOneAndUpdate(filter:FilterQuery<T>,update:UpdateQuery<T>,options?:{new:boolean}):Promise<T|null>
    
    create(data:Partial<T>):Promise<T|null>;
    insertMany(docs:Partial<T[]>):Promise<T[]>
    save(doc:T):Promise<T>

    updateOne(filter:FilterQuery<T>,update:UpdateQuery<T>):Promise<{acknowledged:boolean,modifiedCount:number}>
    updateMany(filter:FilterQuery<T>,update:UpdateQuery<T>):Promise<{acknowledged:boolean,modifiedCount:number}>
    replaceOne(filter:FilterQuery<T>,replacement:T):Promise<{acknowledged:boolean,modifiedCount:number}>

    deleteOne(filter:FilterQuery<T>,options?:QueryOptions):Promise<{deletedCount?:number}>
    deleteMany(filter:FilterQuery<T>,options?:QueryOptions):Promise<{deletedCount?:number}>
    findByIdAndDelete(id:string,options?:QueryOptions):Promise<T|null>
    findOneAndDelete(filter:FilterQuery<T>,options?:QueryOptions):Promise<T|null>
      
    countDocuments(filter:FilterQuery<T>):Promise<number|null>
    
}