import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { featureTemplate } from './templates/feature.template';
import { featureDbServiceTemplate } from './templates/feature.db.service.template';
import { featureControllerTemplate } from './templates/feature.controller.template';
import { featureModuleTemplate } from './templates/feature.module.template';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nme(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const { featureName, schema, crudOps } = _options;
    const featureNameUpper = featureName.substring(0, 1).toUpperCase() + featureName.substring(1)


    tree.create(`${featureName}/${featureName}.ts`, featureTemplate(featureNameUpper, schema))
    tree.create(`${featureName}/${featureName}.db.service.ts`, featureDbServiceTemplate(featureName, featureNameUpper, crudOps));
    tree.create(`${featureName}/${featureName}.controller.ts`, featureControllerTemplate(featureName, featureNameUpper));
    tree.create(`${featureName}/${featureName}.module.ts`, featureModuleTemplate(featureName, featureNameUpper));

    return tree;
  };
}
