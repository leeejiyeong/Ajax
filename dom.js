//dom.js

var fruits = [];
fruits.push({
    name: '사과',
    price: 1000,
    farm: '김해농장',
    farmer: '홍길동'
}); //js에서는 java처럼 클래스 따로 만들필요없이 중괄호로 간단하게 설정가능
fruits.push({
    name: '오렌지',
    price: 1500,
    farm: '성주농장',
    farmer: '김민기'
});
fruits.push({
    name: '배',
    price: 2000,
    farm: '김해농장',
    farmer: '박성윤'
});
fruits.push({
    name: '복숭아',
    price: 5000,
    farm: '성주농장',
    farmer: '최민식'
});

// for(const fruit of fruits){      //for문을 이용한 단순 반복출력
//     console.log(fruit)
// }
let apple = fruits[0];
console.log(apple);
for (let prop in apple) { //apple이 가지고있는 속성중에
    console.log(prop, apple[prop]) //apple[인덱스번호같은거(?)]
}

function anonym() {
    console.log(this); //this : function안에서 쓰여지면 window
    //       event안에서 쓰여지면 event대상
}
anonym();

//document에다가. event를 만들건데. dom요소로. 이벤트가 발생하면 함수실행(익명함수:이름없는 함수)
//익명함수를 사용해도되지만 함수를 따로 만들어서 그 함수이름을 써줘도된다.
//보통 코드가 길어지면 따로 함수로 뺌
document.addEventListener('DOMContentLoaded', init);

document.addEventListener('click', function (e) {
    e.stopPropagation();
    alert('click했을때 뜨는 메시지')
}, false); //false -> bubbling방식 : 하위요소 부터 상위요소로 찾아가겠다
//true -> capturing : 상위요소 -> 하위요소 반대로감


function init() {
    //input태그의 click이벤트 등록(기존에 있던거 누르면 팝업 안뜨게할라고)
    //form의 하위에있는 input태그를 가져오는데 submit은 안가져오고싶다
    // = name요소가 있는 input만 가져오겠다.
    //console.log(document.querySelectorAll('form>input[name]'));     //console창으로 확인해보기
    document.querySelectorAll('form>input[name]').forEach(function (item) {
        console.log(item); //item = input태그
        item.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    //등록버튼 눌렀을때 화면이 리프레시 되서 불-편
    //=> submit버튼에다가 이벤트가 발생하면 이벤트가 등록되도록 하기
    document.querySelector('form>input[type=submit]').addEventListener("click", addItem);

    createTable(); //화면에 테이블 목록을 보여준다
}

function addItem(e) {
    e.preventDefault(); //기본기능을 차단한다(안해주면 리프레시 되버림)
    e.stopPropagation();
    console.log('addItem call');
    let nameVal = document.getElementById('fruit').value;
    let priceVal = document.getElementById('price').value;
    let farmVal = document.getElementById('farm').value;
    let farmerVal = document.getElementById('farmer').value;
    console.log(nameVal, priceVal, farmVal, farmerVal);

    let obj = {}; //new Object(); (새로운 객체 생성) //name자리에 nameVal의 값을 넣어주겠다
    obj.name = nameVal; //==> 두개 합친게 let obj={name:nameVal};랑 같은거임
    obj.price = priceVal;
    obj.farm = farmVal;
    obj.farmer = farmerVal;

    document.querySelector('tbody').appendChild(createTr(obj));

    //초기화
    document.getElementById('fruit').value = '';
    document.getElementById('price').value = '';
    document.getElementById('farm').value = '';
    document.getElementById('farmer').value = '';
}

function createTable() {
    // table의 하위에 생성
    let tbl = document.createElement('table'); //table태그(태그=엘리먼트)
    tbl.setAttribute('border', '1'); //어트리뷰트(css같은거)넣어주기

    //createHeader함수의 반환 값을 tbl의 하위에 추가
    tbl.appendChild(createHeader());

    //createBody함수의 반환 값을 tbl의 하위에 추가
    tbl.appendChild(createBody());

    //body영역에 보여져야함
    document.body.appendChild(tbl);

    //
}

//제목 만들어주기
function createHeader() {
    //thead > tr > th*5 => return thead;
    let titles = ['과일', '가격', '농장', '생산', '삭제', '선택삭제']
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    titles.forEach(function (item) { //idx, ary가 안필요하면 안적어도 된다.
        let th = document.createElement('th');
        th.innerText = item;
        tr.appendChild(th);
    })
    thead.appendChild(tr);

    return thead; // 함수를 호출한 영역으로 thead를 반환한다
}

function createBody() {
    let tbd = document.createElement('tbody'); //tbody태그

    //tr은 반복이 필요하다(fruits 배열요소의 갯수만큼 생성)
    fruits.forEach(function (item, idx, ary) {
        tbd.appendChild(createTr(item));
    });

    return tbd;
}

//잘라서 새로운 함수를 만들면 createbody에서 쓰던 변수 item을 쓰지못한다.
// 따라서 함수 괄호안에 val이라고 적어주고 기존item으로 쓰던걸 val로 바꿔준다
function createTr(val = {
    name: "바나나",
    price: 1000,
    farm: "수입",
    farmer: "수입이"
}) {
    let tr = document.createElement('tr');

    //목록 눌렀을때 input에 해당 열 내용 나오게하기
    tr.addEventListener('click', showDetail);

    //마우스오버&해제(this = tr이기때문에 바꿔서 써도 상관없음)
    tr.addEventListener('mouseover', function () {
        tr.setAttribute('style', 'background-color:yellow')
    });
    tr.addEventListener('mouseout', function () {
        this.removeAttribute('style', 'background-color')
        //= tr.setAttribute('style', 'background-color:null') 위랑 같은거. remove를 쓰면 배경색 지정 안해도된다
    });

    //td 반복생성하기
    for (let prop in val) {
        let td1 = document.createElement('td');
        let name = document.createTextNode(val[prop]);
        //과일이름은 txt값이니까 txtNode사용
        //배열의 첫번째 이름값을 가져올거니까 fruits[0].name      
        //fruits[0].name -> fruits[idx].name -> item.name
        td1.appendChild(name);
        tr.appendChild(td1);
    }

    //button추가하기
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.addEventListener('click', function (e) {
        e.stopPropagation(); // 이벤트 전파 차단
        console.log(this); // 인스턴스값
        this.parentElement.parentElement.remove(); //button의 부모요소인->td->tr를 지움
    }, false);
    btn.innerText = '삭제' //<button>삭제</button>
    td.appendChild(btn);
    tr.appendChild(td);

    //체크박스 만들기
    let td2 = document.createElement('td');
    td2.setAttribute('style', 'text-align:center'); //체크박스 가운데정렬을 위함
    let chkBox = document.createElement('input');
    chkBox.setAttribute('type', 'checkbox');
    chkBox.setAttribute('checked','checked')    //체크박스 체크된거 속성을 넣어주기
    chkBox.addEventListener('click', function (e) {
        e.stopPropagation();
    }, false);
    td2.appendChild(chkBox);
    tr.appendChild(td2);

    return tr;

}

function showDetail(e) {
    e.stopPropagation();

    console.log(this.children[0].innerText);
    document.getElementById('fruit').value = this.children[0].innerText;
    document.getElementById('price').value = this.children[1].innerText
    document.getElementById('farm').value = this.children[2].innerText
    document.getElementById('farmer').value = this.children[3].innerText;
}



// function createUL() {
//     //ul 태그를 만들어줌(ul의 하위에 생성)
//     var ul = document.createElement('ul');
//     //배열의 경우에만 forEach를 사용할 수 있다.
//     fruits.forEach(function (item, idx, ary) {
//         // if (idx % 2 == 0)
//         console.log(item);

//         //li태그 만들기
//         var li = document.createElement('li');

//         //텍스트노드 만들기
//         var txtNode = document.createTextNode(item.name + ', ' + item.price);

//         //부모자식관계 만들어주기
//         li.appendChild(txtNode);

//         //ul의 하위태그로 만들어주기
//         ul.appendChild(li);
//     })

//     console.log(ul);
//     document.body.appendChild(ul);
//     //↑ 순서가 중요하다. body가 script태그보다 위에 있기 때문에 null값으로 나오는것.
//     //script태그를 body 아래쪽으로 내리면 정상출력된다
// }

/*** 
//let delSelected = 'hhhhhhhhhhhh';

function delSelected() { //함수 선언식. 실제로는 아래 함수표현식과 같다.
//= let delSelected = function() 랑 같다. 그러므로 같은 이름은 변수로 사용할 수 없음.
    console.log('hhh');
}
let anonymFnc = function () {   //함수 표현식. 변수에다가 함수에 입력한 값을 담아서 나타냄
    console.log('aaaaa');
}
anonymFnc();
***/

function delSelected(e){
    e.stopPropagation();
    console.log('hhh');
    //방법1)
    // document.querySelectorAll('tbody>tr').forEach(function(item){
    //     console.log(item);      //item = tr태그
    //     console.log(item.querySelector('input[type=checkbox]').getAttribute('checked'));    //
    //     console.log(item.querySelector('input[type=checkbox]').checked);    //true냐false냐로 가져오고 싶기 때문에 이게 더 적당하다
    //     if(item.querySelector('input[type=checkbox]').checked){
    //         item.remove();
    //     } 
    // });

    //방법2)
    document.querySelectorAll('tbody>tr>td>input[type=checkbox]:checked').forEach(
        function(item){
            console.log(item);
            item.parentElement.parentElement.remove();
        }
    );

}



//★숙제 - 선택삭제를 체크박스로 바꾸고 제목체크를 누르면 다 체크/해제 되도록 해보자👍👍👍👍👍