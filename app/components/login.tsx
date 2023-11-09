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

export default function Login({session} : PropsData) {
    return (
        <>
            {
            session && session.user?.email ? 
            <button onClick={() => {signOut()}}>로그아웃!!</button>
            :
            <>
            <button onClick={() => {signIn('kakao')}}>카카오 로그인!!</button>
            <button onClick={() => {signIn('naver')}}>네이버 로그인!!</button>
            <button onClick={() => {signIn('github')}}>깃허브 로그인!!</button>
            <button onClick={() => {signIn('google')}}>구글 로그인!!</button>
            </>
            }
        </>
    )
}