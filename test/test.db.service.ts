
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

      () => {
        return crudOpsArr.map((op) => {
            return `${fnMap[op]}`;
        }).join('\n');
    }


    }


  