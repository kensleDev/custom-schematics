export const featureDbServiceTemplate = (featureName: string, featureNameUpper: string, crudOps: string) => {

  const crudOpsArr = crudOps.split(', ')

  type CrudType = 'create' | 'get' | 'list' | 'update' | 'remove' | 'query' | 'getLatest'

  const fnMap = {
    create: create(),
    get: get(),
    list: list(),
    update: update(),
    remove: remove(),
    query: query(),
    getLatest: getLatest()
  }

  const opts = () => {
    return crudOpsArr.map((op: CrudType) => {
      return `${fnMap[op]}`
    }).join('\n');
  }

  const body =
    crudOps === "all"
      ? `
    ${create()}
    ${get()}
    ${list()}
    ${update()}
    ${remove()}
    ${query()}
    ${getLatest()}
  ` : opts;

  // funcs

  function create() {
    return `async create(entry: ${featureNameUpper}) {
      const newEntry = new this.domainModal(entry);
      return await newEntry.save();
    }`
  }

  function get() {
    return `async get(id): Promise<${featureNameUpper}> {
      const entry = await this.domainModal.findById(id).exec();
      return entry;
    }`
  }

  function list() {
    return `async list(): Promise<${featureNameUpper}[] | null> {
      return await this.domainModal.find().exec();
    }`
  }

  function update()  {
    return `async update(id, entry: ${featureNameUpper}): Promise<${featureNameUpper}> {
      const updatedEntry = await this.domainModal.findByIdAndUpdate(
        id,
        entry,
        { new: true },
      );
      return updatedEntry;
    }`
  }

  function remove() {
    return `async delete(id): Promise<any> {
      const deletedEntry = await this.domainModal.findOneAndDelete(id);
      return deletedEntry;
    }`
  }

  function query() {
    `async query(mongoQuery, sortFilter, limitFilter?): Promise<${featureNameUpper}[] | null> {
      if (limitFilter) {
        return await this.domainModal.find(mongoQuery).sort(sortFilter).limit(limitFilter).exec();
      else {
        return await this.domainModal.find(mongoQuery).sort(sortFilter).exec();
      }
    }`
  }

  function getLatest() {
   return `
    async getLatest(): Promise<${featureNameUpper}[] | null> {
      return await this.domainModal.find({}).sort({_id: -1}).limit(1).exec();
    }`;
  }

  // template

  return `
    import { Injectable } from '@nestjs/common';
    import { ReturnModelType } from '@typegoose/typegoose';
    import { InjectModel } from 'nestjs-typegoose';

    import { ${featureNameUpper} } from './${featureName}';

    @Injectable()
    export class ${featureNameUpper}DbService {
      constructor(
        @InjectModel(${featureNameUpper})
        private readonly domainModal: ReturnModelType<typeof ${featureNameUpper}>,
      ) {}

      ${body}


    }


  `;
}
