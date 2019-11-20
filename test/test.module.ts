

    import { TypegooseModule } from 'nestjs-typegoose';
    import { Module } from '@nestjs/common';

    import { Test } from './test';
    import { TestDbService } from './test.db.service';
    import { TestController } from './test.controller';

    @Module({
      imports: [TypegooseModule.forFeature([Test])],
      providers: [TestDbService],
      controllers: [TestController],
      exports: [TestDbService]
    })
    export class TestModule {}


  