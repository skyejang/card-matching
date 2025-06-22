import React, { useMemo, useState } from "react";
import Card from "../components/Card";

const GamePage = ({ level = 4 }) => {
  const cardSet = {
    yellow: ["sunflower", "flower"],
    pink: ["cherryblossom"],
    green: ["clover"],
  };

  //카드뽑기 & 중복 쌍 만들기
  const color = Object.keys(cardSet);
  const PickCards = useMemo(() => {
    const rand = (max) => Math.floor(Math.random() * max);

    //copy arrays
    const copy_cardSet = { ...cardSet };
    const copy_color = [...color];
    //mininum pairs for each color
    const loop_num = level / color.length;
    const picked = [];

    //반복문 도는 횟수 :  총쌍/색 갯수의 몫
    const RandomLoop = (bg) => {
      for (var i = 0; i < Math.floor(loop_num); i++) {
        //랜덤숫자 : 배열의 인덱스값을 랜덤으로 넣기위해서
        //랜덤숫자가 각 색깔별로 달라도 상관없음
        //각 색깔 배열의 랜덤숫자 인덱스에 해당하는값을 push로 밀어주고 copy에서는 빼기
        //뺀 배열에서 계속 돌아가기
        //랜덤숫자의 max값도 copy배열 조정 이후 다시정해서 getInter함수에넣기
        //반복문돌렸을 때 copy배열 length가 0일 때 끝
        const arr = copy_cardSet[bg];
        const card = arr[rand(arr.length)];
        if (arr.length !== 0) {
          picked.push(card, card);
          arr.splice(arr.indexOf(card), 1);
          if (!arr.length) copy_color.splice(copy_color.indexOf(bg), 1);
        }
      }
    };
    //loop for each color
    color.forEach(RandomLoop);
    //
    if (loop_num !== Math.floor(loop_num)) {
      color.forEach(RandomLoop);
    }
    //최종 셔플
    return picked.sort(() => Math.random() - 0.5);
  }, [level]);

  const [flipped, setFlipped] = useState(Array(PickCards.length).fill(false));
  const [paired, setPaired] = useState(Array(PickCards.length).fill(false));
  const [firstIdx, setFirstIdx] = useState(null);
  const flipHandler = (index) => {
    //이미 뒤집어져있거나 짝맞춰진경우 무시
    if (flipped[index] || paired[index]) return;
    //useState상태변화 할 때, 최신의 이전값을 가져올때 이전값을 prev인자로 받아옴
    setFlipped((prev) => {
      const copy_prev = [...prev];
      copy_prev[index] = true;
      return copy_prev;
    });
    //첫번째 선택 카드일때
    if (firstIdx === null) {
      setFirstIdx(index);
      return;
    }
    //두번째 선택 카드일 때
    const first = firstIdx; //스냅샷
    const second = index;
    setFirstIdx(null); //다음 턴 대비 초기화

    if (PickCards[first] === PickCards[second]) {
      // 매칭성공했을 떄
      setPaired((prev) => {
        const copy_prev = [...prev];
        copy_prev[first] = true;
        copy_prev[second] = true;
        return copy_prev;
      });
      return;
    }
    setTimeout(() => {
      setFlipped((prev) => {
        const copy_prev = [...prev];
        copy_prev[first] = false;
        copy_prev[second] = false;
        return copy_prev;
      });
    }, 700);
  };

  return (
    <div className="pt-4">
      {/* demo card wrap */}
      <div className="w-fit grid grid-cols-3 gap-2">
        {PickCards.map((card, i) => (
          <Card
            key={i}
            card={card}
            cardSet={cardSet}
            isFlipped={flipped[i] || paired[i]}
            onClick={() => flipHandler(i)}
          />
        ))}
      </div>
    </div>
  );
};
export default GamePage;
