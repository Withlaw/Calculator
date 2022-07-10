//Selecting elemnets
const displayTextEl = document.querySelector('.display__text');
const buttonsEl = document.querySelector('.btn--container');

//starting conditions
displayTextEl.textContent = 0;
let action, beforeOpr, afterOpr, operator;
let getNum = false; //숫자를 처음 받거나, 처음 받은 숫자가 0일 때 false

//functions
function calculate(n1, n2, opr) {
  const num1 = Number(n1);
  const num2 = Number(n2);
  let result;

  switch (opr) {
    case '+':
      result = num1 + num2;
      // console.log(result);
      break;
    case '-':
      result = num1 - num2;
      // console.log(result);
      break;
    case 'x':
      result = num1 * num2;
      // console.log(result);
      break;
    case '÷':
      result = num1 / num2;
      // console.log(result);
      break;
  }

  return Math.round(result * 100) / 100;
}

buttonsEl.addEventListener('click', function (click) {
  // click object :
  // click;
  // click.target;
  // click.target.classList;
  // click.target.textContent;
  console.log(click.target.classList);

  //클릭한 버튼값
  const btnText = click.target.textContent.trim();
  const btnValue = click.target.classList[0];
  // if (+btnText >= 0 && btnText !== '') {}
  if (btnValue === 'number') {
    //버튼이 0이 아닌 숫자일 때
    if (btnText !== '0') {
      if (!getNum) {
        getNum = true;
        displayTextEl.textContent = btnText;
      } else {
        displayTextEl.textContent += btnText;
      }
    } else {
      // 0일 때
      if (!getNum) {
        // 0을 처음 누를 때
        displayTextEl.textContent = btnText;
      } else {
        //0버튼은 getNum에 true를 주지 않기 때문에 0만 눌러서는 이곳을 통과할 수 없음
        displayTextEl.textContent += btnText;
        //연산 후 처음 (beforeOpr not undefined)
      }
      //두번째 이상
    }
    // action = 'number';

    //첫번째 숫자, 첫번째 숫자가 0일때 해결
    //두번재 숫자 - 잇기 해결
    //첫 -> 두 번째 모두 0일 때 해결
  }

  if (btnValue === 'operator') {
    // console.log(typeof displayTextEl.textContent); // textContent = string
    getNum = false;
    beforeOpr = Number(displayTextEl.textContent);
    operator = btnText;

    action = 'operator';
  }

  if (btnValue === 'calculate') {
    if (getNum && action !== 'calculate') {
      //숫자를 받고, 처음 계산일 때
      afterOpr = Number(displayTextEl.textContent);
      displayTextEl.textContent = calculate(beforeOpr, afterOpr, operator);

      getNum = false;
      // action = 'calculate';
    } else if (!getNum) {
      //앞에 숫자를 받지 않고 눌렀을때
      if (action === 'operator') {
        //연산을 받은 후 일때 (beforeOper 값 존재)
        afterOpr = Number(displayTextEl.textContent);
        displayTextEl.textContent = calculate(beforeOpr, afterOpr, operator);
        // action = 'calculate';
        // console.log(beforeOpr, afterOpr, operator, displayTextEl.textContent);
      } else if (action === 'calculate') {
        //정상 계산 후 엔터 연속일때
        beforeOpr = Number(displayTextEl.textContent);
        displayTextEl.textContent = calculate(beforeOpr, afterOpr, operator);

        // console.log('here');
      }
    }
    // console.log(calculate(beforeOpr, afterOpr, operator));
    //첫번째 엔터 해결
    //엔터 연타 해결
    action = 'calculate';
  }

  if (btnValue === 'clear') {
    displayTextEl.textContent = 0;
    beforeOpr = undefined;
    afterOpr = undefined;
    operator = undefined;
    getNum = false;

    action = 'clear';
  }

  if (btnValue === 'decimal') {
    let hasDot = displayTextEl.textContent.includes('.');

    if (!getNum) {
      //앞에 숫자를 받지 않고 처음에 점을 찍었을때
      //or action === 'calculate'
      // if (!hasDot) {
      displayTextEl.textContent = '0.';
      getNum = true;
    } else {
      //앞에 숫자 있을 때
      if (!hasDot) {
        displayTextEl.textContent += '.';
        getNum = true;
      }
      // .이 한개로 있으면 더 이상 .은 안받음
    }

    action = 'decimal';
  }
});

////결론: 계산을 계속 이어가게 하는게 너무 어렵다. 그냥 기능을 많이 넣지 말고 한 번 계산이 되면 초기화 기능을 같이 넣는다거나 해서 에러를 최소화 시킬 수 있는 방법으로 알고리즘을 짜자. 아니면 예상 불가능한 에러가 나오거나 앞에 짠 조건과 꼬이거나 아니면 통채로 다시 알고리즘을 짜야할 지도  모름
