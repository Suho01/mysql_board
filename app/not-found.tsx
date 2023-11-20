import { headers } from 'next/headers';

export default async function NotFound() {
    const headerList = headers();
    const domain = headerList.get('referer');
    console.log(headerList.get('referer'));

    return (
        <>
            <p>입력하신 {domain}은 없는 페이지입니다.</p>
        
            <div className="w-full">
                <div className="text-black font-black text-7xl">Not Found</div>
            </div>
        </>
    )
}