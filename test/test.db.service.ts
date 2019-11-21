
    import { Injectable } from '@nestjs/common';
    import { ReturnModelType } from '@typegoose/typegoose';
    import { InjectModel } from 'nestjs-typegoose';

    import { Test } from './test';

    @Injectable()
    export class TestDbService {
      constructor(
        @InjectModel(Test)
        private readonly domainModal: ReturnModelType<typeof Test>,
      ) {}
      
    
      async create(entry: Test) {
        const newEntry = new this.domainModal(entry);
        return await newEntry.save();
      }
    
      async get(id): Promise<Test> {
        const entry = await this.domainModal.findById(id).exec();
        return entry;
      }
    
      async list(): Promise<Test[] | null> {
        return await this.domainModal.find().exec();
      }
    
      async update(id, entry: Test): Promise<Test> {
        const updatedEntry = await this.domainModal.findByIdAndUpdate(
          id,
          entry,
          { new: true },
        );
        return updatedEntry;
      }
    
      async delete(id): Promise<any> {
        const deletedEntry = await this.domainModal.findOneAndDelete(id);
        return deletedEntry;
      }
    
      async query(mongoQuery, sortFilter, limitFilter?): Promise<Test[] | null> {
        if (limitFilter) {
          return await this.domainModal.find(mongoQuery).sort(sortFilter).limit(limitFilter).exec();
        } else {
          return await this.domainModal.find(mongoQuery).sort(sortFilter).exec();
        }
      }
    
      async getLatest(): Promise<Test[] | null> {
        return await this.domainModal.find({}).sort({_id: -1}).limit(1).exec();
      }
  
    }


  