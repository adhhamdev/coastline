import { NextResponse } from 'next/server';
import PipelineSingleton from './pipeline.js';

export async function GET(request) {
    const text = request.nextUrl.searchParams.get('text');
    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }
    // Get the classification pipeline. When called for the first time,
    // this will load the pipeline and cache it for future use.
    const classifier = await PipelineSingleton.getInstance();

    // Actually perform the classification
    const result = await classifier(text, { pooling: 'mean', normalize: true });

    const data = Array.from(result.ort_tensor.cpuData);
    console.log(data);

    return NextResponse.json(data);
}