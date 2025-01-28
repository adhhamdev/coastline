import { pipeline } from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const P = () => class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Supabase/gte-small';
    static instance = null;

    static async getInstance() {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model);
        }
        return this.instance;
    }
}

let PipelineSingleton;
if (process.env.NODE_ENV !== 'production') {
    // When running in development mode, attach the pipeline to the
    // global object so that it's preserved between hot reloads.
    // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
    if (!global.PipelineSingleton) {
        global.PipelineSingleton = P();
    }
    PipelineSingleton = global.PipelineSingleton;
} else {
    PipelineSingleton = P();
}
export default PipelineSingleton;