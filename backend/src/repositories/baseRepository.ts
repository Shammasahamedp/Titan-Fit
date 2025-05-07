import { IBaseRepository } from "./IbaseRepository";
import { Model,Document, FilterQuery } from "mongoose";
export class BaseRepository<T extends Document> implements IBaseRepository<T>{
    
    protected model:Model<T>
    constructor(model:Model<T>){
        this.model = model
    }
    async create(data: T): Promise<any> {
        return await this.model.create(data)
    }

    async deleteMany(filter: any): Promise<{ deletedCount?: number; }> {
        return await this.model.deleteMany(filter)
    }

    async deleteOne(filter: any): Promise<{ deletedCount?: number; }> {
        return await this.model.deleteOne(filter)
    }

    async find(filter: any): Promise<T[] > {
        return await this.model.find(filter)
    }

    

    async findById(id: string): Promise<any> {
        return await this.model.findById(id)
    }

    async findByIdAndDelete(id: string): Promise<any> {
        return await this.model.findByIdAndDelete(id)
    }

    async findByIdAndUpdate(id: string, update: any, options?: { new?: boolean; }): Promise<any> {
        return await this.model.findByIdAndUpdate(id,update,options)
    }

    async findOne(filter: any): Promise<any> {
        return await this.model.findOne(filter)
    }

    async findOneAndDelete(filter: any): Promise<any> {
        return await this.model.findOneAndDelete(filter)
    }

    async findOneAndUpdate(filter: any, update: any, options?: { new: boolean; }): Promise<any> {
        return await this.model.findOneAndUpdate(filter,update,options)
    }

    async insertMany(docs: any[]): Promise<T[]> {
        return await this.model.insertMany(docs)
    }

    async replaceOne(filter: any, replacement: T): Promise<{ acknowledged: boolean; modifiedCount: number; }> {
        return await this.model.replaceOne(filter,replacement)
    }

    async save(doc: T): Promise<T> {
        return await doc.save()
    }

    async updateMany(filter: any, update: any): Promise<{ acknowledged: boolean; modifiedCount: number; }> {
        return await this.model.updateMany(filter,update)
    }

    async updateOne(filter: any, update: any): Promise<{ acknowledged: boolean; modifiedCount: number; }> {
        return await this.model.updateOne(filter,update)
    }

    async countDocuments(filter: FilterQuery<T>): Promise<number| null> {
        return await this.model.countDocuments(filter)
    }
    
}