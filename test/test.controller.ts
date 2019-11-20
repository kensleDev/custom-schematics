
    import { Controller, Get, Post, Body, Put, Res, Query, NotFoundException, HttpStatus, Delete, Param } from '@nestjs/common';
    import { Test } from './test';
    import { TestDbService } from './test.db.service';

    @Controller('test')
    export class TestController {
      constructor(private readonly TestDbS: TestDbService) {}

      @Get('list')
      async list(): Promise<Test[] | null> {
        return await this.TestDbS.list();
      }

      @Get('/:id')
      async get(@Res() res, @Param('id') id) {
        const entry = await this.TestDbS.get(id);
        if (!entry) {
          throw new NotFoundException("Entry does not exist!");
        }
        return res.status(HttpStatus.OK).json(entry);
      }

      @Get('/:queryString')
      async query(@Res() res, @Param('queryString') queryString) {
        const entry = await this.TestDbS.query(queryString);
        if (!entry) {
          throw new NotFoundException("Entry does not exist!");
        }
        return res.status(HttpStatus.OK).json(entry);
      }

      @Post('create')
      async create(@Body() test: Test): Promise<Test> {
        return await this.TestDbS.create(test);
      }

      @Put('/update')
      async update(
        @Res() res,
        @Query('id') id,
        @Body() endPoint: Test,
      ) {
        const entry = await this.TestDbS.update(id, endPoint);
        if (!entry) {
          throw new NotFoundException("Entry does not exist!");
        }
        return res.status(HttpStatus.OK).json({
          message: "Entry has been successfully updated",
          entry
        });
      }

      @Delete('/delete')
      async delete(@Res() res, @Query('id') id) {
        const entry = await this.TestDbS.delete(id);
        if (!entry) {
          throw new NotFoundException('Entry does not exist');
        }
        return res.status(HttpStatus.OK).json({
          message: 'Entry has been deleted',
          entry,
        });
      }
    }


  