'use client';

interface userInfo {
    name : string;
    email : string;
    image : string;
}
interface PropsData {
    session ? : userInfo | null
}

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Login({session} : PropsData) {
    return (
        <>
            {
                session && session.user.level === 10 ? '관리자' : session && session.user !== null && '일반회원'
            }
            {console.log(session && session.user)}
            {
                session && session.user?.email ? 
                <button onClick={() => {signOut()}}>로그아웃!!</button>
                :
                <>
                    <Link href='/register'>회원가입</Link>
                    <div className="lg:max-w-7xl mx-auto ">
                        <button onClick={() => {signIn('kakao')}} className="block"><img className="w-52" src="./../img/kakao.png" alt="kakao" /></button>
                        <button onClick={() => {signIn('naver')}} className="block"><img className="w-52" src="./../img/naver.png" alt="naver" /></button>
                        <button onClick={() => {signIn('github')}} className="block w-52 h-12 rounded-md bg-gray-800 text-white">Sign in with Github</button>
                        <button onClick={() => {signIn('google')}} className="block"><img className="w-52" src="./../img/google.png" alt="google" /></button>
                        <button onClick={() => {signIn('credential')}} className="block text-5xl bg-slate-600 text-white p-5">통합 로그인</button>
                    </div>
                </>
            }
        </>
    )
}