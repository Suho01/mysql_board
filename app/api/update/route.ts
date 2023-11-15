'use client'

import { NextRequest, NextResponse } from "next/server";
import db from '@/db';

interface PostNumber {
    title : string;
    content : string;
    id : number;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        try {
            const {title, content, id} : PostNumber = JSON.parse(await req.text());

            if (!title || !content || !id) {
                return NextResponse.json({message : "데이터가 부족합니다."});
            } else {
                /* select : 선택, insert : 입력, delete : 삭제, update : 수정 */
                await db.query(
                    'update board set title = "?", content = "?" where id = ?', [title, content, id]
                );
                return NextResponse.json({message : "정상적으로 수정되었습니다."});
            }
        } catch(error) {
            return NextResponse.json({error : "에러"});
        }
    } else {
        return NextResponse.json({message : "정상적인 데이터가 아닙니다."});
    }
}