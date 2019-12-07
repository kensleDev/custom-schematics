"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureControllerTemplate = (featureName, featureNameUpper) => {
    return `
    import { Controller, Get, Post, Body, Put, Res, Query, NotFoundException, HttpStatus, Delete, Param } from '@nestjs/common';
    import { ${featureNameUpper} } from './${featureName}';
    import { ${featureNameUpper}DbService } from './${featureName}.db.service';

    @Controller('${featureName}')
    export class ${featureNameUpper}Controller {
      constructor(private readonly ${featureNameUpper}DbS: ${featureNameUpper}DbService) {}

      @Get('list')
      async list(): Promise<${featureNameUpper}[] | null> {
        return await this.${featureNameUpper}DbS.list();
      }

      @Get('/:id')
      async get(@Res() res, @Param('id') id) {
        const entry = await this.${featureNameUpper}DbS.get(id);
        if (!entry) {
          throw new NotFoundException("Entry does not exist!");
        }
        return res.status(HttpStatus.OK).json(entry);
      }

      @Get('/:queryString')
      async query(@Res() res, @Param('queryString') queryString) {
        const entry = await this.${featureNameUpper}DbS.query(queryString);
        if (!entry) {
          throw new NotFoundException("Entry does not exist!");
        }
        return res.status(HttpStatus.OK).json(entry);
      }

      @Post('create')
      async create(@Body() ${featureName}: ${featureNameUpper}): Promise<${featureNameUpper}> {
        return await this.${featureNameUpper}DbS.create(${featureName});
      }

      @Put('/update')
      async update(
        @Res() res,
        @Query('id') id,
        @Body() endPoint: ${featureNameUpper},
      ) {
        const entry = await this.${featureNameUpper}DbS.update(id, endPoint);
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
        const entry = await this.${featureNameUpper}DbS.delete(id);
        if (!entry) {
          throw new NotFoundException('Entry does not exist');
        }
        return res.status(HttpStatus.OK).json({
          message: 'Entry has been deleted',
          entry,
        });
      }
    }


  `;
};
