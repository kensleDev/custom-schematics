export const featureModuleTemplate = (featureName: string, featureNameUpper: string) => {
  return `

    import { TypegooseModule } from 'nestjs-typegoose';
    import { Module } from '@nestjs/common';

    import { ${featureNameUpper} } from './${featureName}';
    import { ${featureNameUpper}DbService } from './${featureName}.db.service';
    import { ${featureNameUpper}Controller } from './${featureName}.controller';

    @Module({
      imports: [TypegooseModule.forFeature([${featureNameUpper}])],
      providers: [${featureNameUpper}DbService],
      controllers: [${featureNameUpper}Controller],
      exports: [${featureNameUpper}DbService]
    })
    export class ${featureNameUpper}Module {}


  `;
}
