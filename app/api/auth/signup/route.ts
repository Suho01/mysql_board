import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

interface formType {
    email : string;
    password : string;
    name : string;
    nickname ? : string;
    level ? : number;
    type ? : string;
    id ? : number;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        let {email, password, name, nickname, level, type, id} : formType = JSON.parse(await req.text());
        level = level === undefined ? 2 : level;
        if (type === 'edit') {
            const [chkMember] = await db.query<RowDataPacket[]>('select password from suho.member where email = ?', [email]);
            if (password === chkMember[0].password) {
                await db.query<RowDataPacket[]>('update suho.member set email = ?, name = ?, nickname = ?, level = ? where id = ?', [email, name, nickname, level, id]);
            } else {
                const hash = await bcrypt.hash(password, 10);
                await db.query<RowDataPacket[]>('update suho.member set email = ?, password = ?, name = ?, nickname = ?, level = ? where id = ?', [email, hash, name, nickname, level, id]);
            }
            return NextResponse.json({message : "성공", data : nickname});
        }
        console.log(email, password, name, nickname, level, type, id);
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