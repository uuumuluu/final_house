# final_house
졸작 팀플 파일

### To do
- [ ] 맞춤지역 페이지 진입 시 object 에러 발생 수정 요망
- [ ] 지역탐색 페이지에서 다른 페이지로 이동할 시 경고창 띄우기 '지금까지 입력한 내용이 저장되지 않습니다. ' -> prompt 시도 실패. 버전이 안 맞음
- [ ] 메인화면 / 마이페이지에서 지역에 대한 정보를 어디까지 보여줄건지 -> 지역이름 / 평균시세 등
- [ ] 파워비아이 페이지 -> 대시보드랑 시각화 지도 어떻게 같이 보여줄건지. 탭메뉴로 구현할건지 + 파워비아이 지도가 더 먼저 보이게 할 것 / 화면의 크기는 황금비율을 맞출걸 16:4 등

### API 정의서
*[노션](https://www.notion.so/2-29540c534eb54de2808f282591fea938)

/////

###교수님 피드백
근거있는 UX 디자인 -> 사용자의 편리성을 위해



-> 모든 연령대의 사람들이 쉽게 사용할 수 있도록 직관적으로 디자인 했는지?
-> 불필요한 클릭을 요구하지 않는지?
-> 데이터 전달이 잘 되는지?


powerbi 연동 코드 / 여러개의 column 값 변경하기
```
useEffect(() => {
  const applyMultipleFilters = async () => {
    const filter1 = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "테이블명",
        column: "관리기관명"
      },
      operator: "In",
      values: ["서울특별시 강남구청"],
      filterType: models.FilterType.BasicFilter
    };

    const filter2 = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "테이블명",
        column: "설치목적"
      },
      operator: "In",
      values: ["교통"],
      filterType: models.FilterType.BasicFilter
    };

    const combinedFilter = {
      $schema: "http://powerbi.com/product/schema#advanced",
      target: {
        table: "테이블명"
      },
      logicalOperator: "And",
      conditions: [filter1, filter2]
    };

    console.log("실행중 실행중");

    if (window.report) {
      const pages = await window.report.getPages();
      const page = pages[0]; // 예를 들어 첫 번째 페이지 사용

      const visuals = await page.getVisuals();
      const visual = visuals[0]; // 예를 들어 첫 번째 시각적 요소 사용
      console.log("비주얼 로고 찍음", visual);
      // console.log("combinedFilter 찍음", combinedFilter);

      await visual.setSlicerState({
        filters: [combinedFilter]
      });
    }
  }

  applyMultipleFilters();
}, []);

```



```
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors()); //cors 허용

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

////////////////////////////////


const UserInfo = []; // 유저데이터 임시 저장 배열
const recommendResult = {
  first: "강남구",
  second: "서대문구",
  third: "종로구",
}; // 임시 추천결과 저장 배열

const loacationData = {
  김지호: { locations: { first: "강남구", second: "서대문구", third: "종로구" },
  favorites: []},
  홍길동 : { locations: { first: "도봉구", second: "중구", third: "노원구" },
  favorites: []}
}




///////////////////////////////////////// 


// 프론트엔드에서 백엔드로 보낸 유저의 정보 
app.post('/users', (req, res) => {
  const userInfo = req.body; // JSON 데이터 파싱

  console.log('Received Data:', userInfo);

  const name = userInfo.name;
  const sex = userInfo.sex;
  const age = userInfo.age;
  const hobby = JSON.parse(userInfo.hobby).join(', ');

  if (userInfo.sports !== null) {
    const sports = JSON.parse(userInfo.sports).join(',');
    console.log("운동 종목 값 ", sports);
  }

  const tendency = userInfo.tendency;

  console.log("취미 값", hobby);


  res.send('데이터가 성공적으로 저장되었습니다.');
});



// 지역추천 알로리즘 결과를 프론트에 보내줌
app.get('/users/:name/locations', function (req, res) {
  const { name } = req.params;
  res.json(loacationData[name].locations)
});





// 관심목록 관련 코드 //

// 프론트에서 보낸 관심목록을 백엔드에 저장
app.put('/users/:name/favorites', (req, res) => {
  const { name } = req.params;
  const areaToAdd = req.body.favorites;
  const favorites = loacationData[name].favorites;

  if (!favorites.includes(areaToAdd)) {
    // 중복된 값이 없는 경우에만 추가
    loacationData[name].favorites.push(areaToAdd);

    console.log('프론트엔드로부터 받은 관심목록 데이터', areaToAdd);
    console.log('백엔드에 저장된 관심목록 데이터', loacationData[name].favorites);
    res.send("관심목록을 백엔드로 성공적으로 보냄");
  } else {
    console.log('이미 중복된 값이 존재합니다.');
  }

});

// 프론트에서 보낸 관심목록을 백엔드에서 삭제
app.delete('/users/:name/favorites', (req, res) => {
  const { name } = req.params;
  const areaToDelete = req.body.favorites;


  const favorites = loacationData[name].favorites;
  const updatedFavorites = favorites.filter((item) => item !== areaToDelete);

  console.log("업데이트 콘솔",updatedFavorites)

  loacationData[name].favorites = updatedFavorites;

  console.log('프론트엔드로부터 받은 삭제할 관심목록 데이터', areaToDelete);
  console.log('삭제 후 백엔드에 남은 관심목록 데이터', loacationData[name].favorites);
  res.send("관심목록을 백엔드로 성공적으로 보냄")

});


// 백엔드에 저장된 관심목록 마이페이지에 전송
app.get('/favorites/:name', (req, res) => {
  const { name } = req.params;
  res.send(loacationData[name].favorites);
  console.log('관심지역 목록 데이터전송')
});


app.listen(4000, () => console.log('켜졌다!'))
```
