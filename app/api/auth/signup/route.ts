import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

interface formType {
    email : string;
    password : string;
    name : string;
    nickname : string;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        const {email, password, name, nickname} : formType = JSON.parse(await req.text());
        const hash = await bcrypt.hash(password, 10);
        // console.log(hash);
        const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from member where email = ?', [email]); // 중복체크
        const memberCnt = checkMember[0].cnt;

        if (!email || !password || !name || !nickname) {
            return NextResponse.json({message : "데이터가 부족합니다."});
        }
        
        if (memberCnt > 0) { // 0 보다 크다는 것은 이미 이메일이 있다.
            return NextResponse.json({message : "해당 이메일이 존재합니다."});
        } else {
            await db.query('insert into member (email, password, name, nickname) values (?, ?, ?, ?)', [email, hash, name, nickname]); // 여기서 password는 필드명이고, 들어가는 실제 값은 hash 여야한다.
            const data = {
                email : email,
                password : password
            }
            // console.log(email, password, name);
            return NextResponse.json({message : "성공", data : data});
        }
    } else {
        return NextResponse.json({error : "실패"});
    }
}