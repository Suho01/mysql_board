import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';

export const GET = async (req : NextRequest) : Promise<NextResponse> => {
    const { title, content } = JSON.parse(await req.text());
    const pathname = req.nextUrl.pathname;
    const postId = pathname.split('/').pop();
    const [results] = await db.query<RowDataPacket[]>('update board set title = "?", content = "?" where id = ?', [title, content, postId]);

    return NextResponse.json({data : results});
}

export const POST = async (req : NextRequest) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        return NextResponse.json({message : "메시지"});
    } else {
        return NextResponse.json({message : "에러"});
    }
}