import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../PagesCss/PageCss.css'
import axios from 'axios';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

import Powerbi from './Powerbi';
import Powerbitest from './Powerbitest';

function PageEnd() {

  // 백엔드에서 받은 데이터 저장
  const [data, setData] = useState([]);
  const [get, setGet] = useState(false);


  // 로컬스토리지에 관심목록 저장
  const [heartList, setheartList] = useState([]);

  // 얘는 지워도 됨
  const [power, setPower] = useState('시각화자료가 들어갈 자리');

  //관심목록 하트 클릭
  const [heartClicked1, setHeartClicked1] = useState(false);
  const [heartClicked2, setHeartClicked2] = useState(false);
  const [heartClicked3, setHeartClicked3] = useState(false);

  const [heartClicked, setHeartClicked] = useState(false);


  // powerbi 
  const powerbibtn = async () => {
    const basicFilter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "12_04_08_E_CCTV정보_서울_20230710 - 복사본_종로구",
        hierarchy: "관리기관명",
        hierarchyLevel: "설치목적구분"
      },
      operator: "In",
      values: ["서울특별시 서대문구청"],
      filterType: models.FilterType.BasicFilter
    };

    console.log("실행중 실행중");

    if (window.report) {
      const pages = await window.report.getPages();
      const page = pages[0]; // 예를 들어 첫 번째 페이지 사용

      const visuals = await page.getVisuals();
      const visual = visuals[1]; // 예를 들어 첫 번째 시각적 요소 사용
      console.log("비주얼 로고 찍음", visual);
      // console.log("basicFilter 찍음",basicFilter);

      await visual.setSlicerState({
        filters: [basicFilter]
      });

    }



  }

  // 1등 지역 관심 목록
  const handleHeart1 = (area) => {
    setHeartClicked1(!heartClicked1);

    const heartList = JSON.parse(localStorage.getItem('heartList')) || [];

    if (heartList.includes(area)) {
      alert(`${area}를 관심목록에서 삭제했습니다.`);
      const updatedList = heartList.filter(item => item !== area);
      localStorage.setItem('heartList', JSON.stringify(updatedList));
    } else {
      alert(`${area}를 관심목록에 추가했습니다.`);
      heartList.push(area);
      localStorage.setItem('heartList', JSON.stringify(heartList));
    }
  }

  // 2등 지역 관심 목록
  const handleHeart2 = (area) => {
    setHeartClicked2(!heartClicked2);

    const heartList = JSON.parse(localStorage.getItem('heartList')) || [];

    if (heartList.includes(area)) {
      alert(`${area}를 관심목록에서 삭제했습니다.`);
      const updatedList = heartList.filter(item => item !== area);
      localStorage.setItem('heartList', JSON.stringify(updatedList));
    } else {
      alert(`${area}를 관심목록에 추가했습니다.`);
      heartList.push(area);
      localStorage.setItem('heartList', JSON.stringify(heartList));
    }
  }

  // 3등 지역 관심 목록
  const handleHeart3 = (area) => {
    setHeartClicked3(!heartClicked3);

    const heartList = JSON.parse(localStorage.getItem('heartList')) || [];

    if (heartList.includes(area)) {
      alert(`${area}를 관심목록에서 삭제했습니다.`);
      const updatedList = heartList.filter(item => item !== area);
      localStorage.setItem('heartList', JSON.stringify(updatedList));
    } else {
      alert(`${area}를 관심목록에 추가했습니다.`);
      heartList.push(area);
      localStorage.setItem('heartList', JSON.stringify(heartList));
    }
  }


  ////////////////////////////////////////////////////////////////

  //백엔드에 데이터 요청해서 결과값 받아오기
  useEffect(() => {
    axios.get('http://localhost:4000/deliver/recommendResult')
      .then(response => {
        setData(response.data);
        setGet(!get);
        console.log(typeof response.data)
      })

      .catch(error => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
      });
  }, []);


  useEffect(() => {
    const heartList = JSON.parse(localStorage.getItem('heartList')) || [];

    if (data.length > 0) {
      const heartStates = data.map(item => heartList.includes(item.first));
      setHeartClicked(heartStates);
    }
  }, [data]);

  ////////////////////////////////////////////////////////////////////////////


  //백엔드에 관심목록 보내기
  const saveHeartListToBackend = () => {
    const heartList = JSON.parse(localStorage.getItem('heartList')) || [];

    axios.post('http://localhost:4000/saveHeartList', { heartList })
      .then(response => {
        console.log('데이터를 서버에 전송했습니다.', response);
        // localStorage.removeItem('heartList');
        // localStorage.removeItem('sex');
        // localStorage.removeItem('hobby');
        // localStorage.removeItem('sports');
        alert('데이터 저장성공')
      })

      .catch(error => {
        console.error(' list데이터를 서버에 전송하는 중 오류가 발생했습니다.', error);
      });
  }


  return (
    <div className='End-container'>

      <div className='End-recommend'>

        {get ?
          <div className='End-recommend-result'>
            <div className='End-recommend-result-text'>추천 결과</div>
            {data.map((item, index) => (
              <div className="End-recomend-text" key={index}>



                <button className='End-recommend-text-1'
                  onClick={() => { powerbibtn() }}>
                  <div className='End-1'>1위</div>
                  {item.first}

                  {heartClicked1 ?
                    <AiFillHeart onClick={() => handleHeart1(item.first)} size="30" color="red" />
                    : <AiOutlineHeart onClick={() => handleHeart1(item.first)} size="30" color="red" />}
                </button>


                {/* 2등 지역 */}
                <button className='End-recommend-text-1'
                  onClick={() => setPower('도봉구지역 자료')}>
                  <div className='End-1'>2위</div>
                  {item.second}
                  {heartClicked2 ?
                    <AiFillHeart onClick={() => handleHeart2(item.second)} size="30" color="red" />
                    : <AiOutlineHeart onClick={() => handleHeart2(item.second)} size="30" color="red" />}
                </button>


                {/* 3등 지역 */}
                <button className='End-recommend-text-1'
                  onClick={() => setPower('노원구지역 자료')}>
                  <div className='End-1'>3위</div>
                  {item.third}
                  {heartClicked3 ?
                    <AiFillHeart onClick={() => handleHeart3(item.third)} size="30" color="red" />
                    : <AiOutlineHeart onClick={() => handleHeart3(item.third)} size="30" color="red" />}
                </button>
              </div>
            ))}
          </div>
          : <div><em>데이터를 불러오는데 실패했습니다.</em></div>}

        {/* <div>
<button onClick={saveHeartListToBackend}>관심 목록 전송 후 삭제</button>
</div> */}


        {/* 파워비아이 적용하기 */}
        <div className='End-powerbi'>
          <Powerbitest />
        </div>

      </div>
    </div>
  )
}
export default PageEnd


