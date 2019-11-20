
    import { prop, Typegoose } from '@typegoose/typegoose';

    export class Test extends Typegoose {
      
        @prop({ required: true })
        name: string
      
    }

  