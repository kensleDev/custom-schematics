export const featureTemplate = (featureNameUpper: string, schema: string) => {

  const assembledProps = () => {

    const props = schema.split(", ").map(el => {
      return `
        @prop({ required: true })
        ${el}
      `;
    }).join('\n');

    return props
  }


  return `
    import { prop, Typegoose } from '@typegoose/typegoose';

    export class ${featureNameUpper} extends Typegoose {
      ${assembledProps()}
    }

  `;
}
