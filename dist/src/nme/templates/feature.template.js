"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureTemplate = (featureNameUpper, schema) => {
    const assembledProps = () => {
        const props = schema.split(", ").map(el => {
            return `
        @prop({ required: true })
        ${el}
      `;
        }).join('\n');
        return props;
    };
    return `
    import { prop, Typegoose } from '@typegoose/typegoose';

    export class ${featureNameUpper} extends Typegoose {
      ${assembledProps()}
    }

  `;
};
