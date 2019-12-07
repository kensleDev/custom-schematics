"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feature_template_1 = require("./templates/feature.template");
const feature_db_service_template_1 = require("./templates/feature.db.service.template");
const feature_controller_template_1 = require("./templates/feature.controller.template");
const feature_module_template_1 = require("./templates/feature.module.template");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function nme(_options) {
    return (tree, _context) => {
        const { featureName, schema, crudOps } = _options;
        const featureNameUpper = featureName.substring(0, 1).toUpperCase() + featureName.substring(1);
        tree.create(`${featureName}/${featureName}.ts`, feature_template_1.featureTemplate(featureNameUpper, schema));
        tree.create(`${featureName}/${featureName}.db.service.ts`, feature_db_service_template_1.featureDbServiceTemplate(featureName, featureNameUpper, crudOps));
        tree.create(`${featureName}/${featureName}.controller.ts`, feature_controller_template_1.featureControllerTemplate(featureName, featureNameUpper));
        tree.create(`${featureName}/${featureName}.module.ts`, feature_module_template_1.featureModuleTemplate(featureName, featureNameUpper));
        return tree;
    };
}
exports.nme = nme;
