async function getData() {
    const res = await fetch('http://localhost:3000/api/admin', {
        cache : 'no-cache',
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            pathUrl : 'mainCnt'
        })
    });
    const data = res.json();
    if (!res.ok) { // 승인이 되지 않았다면
        console.log('에러가 발생하였습니다.');
        return
    }
    return data;
}

export default async function TotalCount() {
    const resultData = await getData();
    const data = resultData.data;
    const listMenu = ['총 회원 수', '신규 가입 수', '금일 새글 수', '금일 새 댓글 수', '금일 방문자 수', '총 방문자 수'];
    const listCnt = [data.totalCnt, data.todayCnt, data.writeCnt, data.commentCnt, data.visitCnt, data.totalTotalCnt];
    return (
        <ul className="flex justify-between flex-wrap lg:mb-4">
            {
                listMenu.map((e, i) => {
                    return (
                        <li key={i} className="widget p-4 basis-[48%] lg:basis-[15%] mb-4 lg:mb-0 flex justify-between">
                            <h3>{e}</h3>
                            <p><span className="font-bold">{listCnt[i]}</span>{i === 2 || i === 3 ? "개" : "명"}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}