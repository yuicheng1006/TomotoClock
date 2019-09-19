var btn = document.querySelector('.text i');
var ul = document.querySelector('.ul');


var getDataAry = JSON.parse(localStorage.getItem('tasks')) || []; //陣列
//console.log(getDataAry);

//-------讓more隱藏起來-------
function moreHide() {
    document.querySelector('.more').innerHTML = "";
}

//-------讓more顯現起來-------
function moreOpen() {
    document.querySelector('.more').innerHTML = "MORE";
}


//------呼叫任務列顯示在網頁中------
function callTask() {
    var str = "";
    for (var i = 0; i < getDataAry.length; i++) {

        str += ` <li>
 <lebal class="ul_ontainer">
            <input type="checkbox" class="checkboxs"  data-num="${i}">
            <span class=" checkmark"></span>
            <p>${getDataAry[i]}</p>
        </lebal>
            <span class="smallPlay">
            <i class="material-icons" data-playbtn="${i}"  data-tasktask="${getDataAry[i]}">play_circle_outline</i>
            </span>
            </li>`
    }

    ul.innerHTML = str;

    //-------取得我的小播放器的icon------
    var smallPlay = document.querySelectorAll('.smallPlay i');

    for (var i = 0; i < smallPlay.length; i++) {

        smallPlay[i].addEventListener('click', listbtn);

    }
    smallPlay[0].addEventListener('click', countDown);
    //-------取得我的任務列欄(刪除用)------
    var checkboxs = document.querySelectorAll('.checkboxs');
    for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('click', removeTask);
    }
    //-------讓more隱藏起來-------
    if (getDataAry.length < 3) {
        moreHide();
    }
}
callTask(getDataAry);

//--------讓第一個任務一直顯示在最上面的任務--------
function firstTask(e) {
    var txt = document.querySelector('.txt');
    txt.innerHTML = getDataAry[0];

}
firstTask();

//------新增任務------
function addTask() {
    var textbox = document.querySelector('.textbox').value; //先抓出textbox的值，然後unshift到陣列裡

    getDataAry.unshift(textbox); //將textbox的值新增進去getDataAry（陣列）
    var listString = JSON.stringify(getDataAry); //把陣列轉型為字串 //unshift往第一個加上去
    localStorage.setItem('tasks', listString); //再存進local stroage裡

    callTask(); //呼叫任務列表，要執行陣列裡的內容印在網頁上
    //console.log(listString);

    if (getDataAry.length >= 3) {
        moreOpen(); //如果我的陣列大於3我的more就會顯現出來
    }
}

btn.addEventListener('click', addTask);



//-------按下小播放器會到最上面任務------
function listbtn(e) {
    var playbtn = e.target.dataset.playbtn;
    var tasktask = e.target.dataset.tasktask;
    //console.log(tasktask);
    var txt = document.querySelector('.txt');
    txt.innerHTML = tasktask;
    getDataAry.splice(playbtn, 1);
    getDataAry.unshift(tasktask);
    var listString = JSON.stringify(getDataAry);
    localStorage.setItem('tasks', listString);

    callTask();
    tomatoremove();
}


//-------按下小播放器會到最上面任務(另一個寫法)------

// function playBtn(e) {
//     //     //console.log(e.target.closest('li').childNodes[1].childNodes[5].textContent)

//     var txt = document.querySelector('.txt');
//     txt.innerHTML = e.target.closest('li').childNodes[1].childNodes[5].textContent; //去取出我的p值

//     //     console.log(txt.textContent);
//     //     //console.log(getArry)
// }

//-------刪除任務----------

function removeTask(e) {
    var num = e.target.dataset.num;
    getDataAry.splice(num, 1);
    var listString = JSON.stringify(getDataAry);
    localStorage.setItem('tasks', listString);
    callTask();
    firstTask();
    tomatoremove();
}

//--------輸入完textbox後值消失----------
function clear() {
    document.querySelector('.textbox').value = "";
}

btn.addEventListener('click', clear);


//按enter即可送出任務
var content = document.querySelector('.content');

function addEnter(e) {
    //先找出enter鍵的數字（使用keycode）
    if (e.keyCode == '13') {
        addTask(); //讓keyCode=13這個enter的數字就觸發saveMission()
        clear();
    }
}
content.addEventListener('keydown', addEnter, false);

//------上面任務的圓圈完成後按掉會刪除--------
var circle_m = document.querySelector('.circle_m');

circle_m.addEventListener('click', removeTask);


//--------播放icon變動-----------

var show = document.querySelector('.show');
var hide = document.querySelector('.hide');
var circleBg = document.querySelector('.circle');
var square = document.querySelector('.square');

//--------icon播放-----------
function playOpen() {
    circleBg.classList.add("bgWhite");
    show.style.display = "none"; //去改變我的css的屬性值
    hide.style.display = "block";
    hide.style.color = "#FF4384";
    square.style.backgroundColor = "#FF4384";
}
show.addEventListener('click', playOpen);

//--------icon停止-----------
function playHide() {
    circleBg.classList.remove("bgWhite");
    show.style.display = "block";
    hide.style.display = "none";
    square.style.backgroundColor = "#FFF";
}

hide.addEventListener('click', playHide);

//--------倒數計時-----------

var min = document.querySelector('.min');
var sec = document.querySelector('.sec');

var timer;
var m = 24;
var s = 59;
var toma = 0;

function countDown(e) {
    if (s < 10) s = "0" + s;

    sec.textContent = s;

    var a = m;
    if (m < 10) {
        a = "0" + m;
    }
    min.textContent = a; //由於因為m做運算導致無法將正確內容顯示在網頁上，所以要設一個變數讓他去存
    s -= 1;
    console.log(sec);
    timer = setTimeout(countDown, 1000);

    if (s < 0) {

        s = 59; //秒重新開始計算
        m -= 1; //如果我的秒數跑完;我的分就減1
    }
    if (m < 0) {
        clearTimeout(timer);
        playHide();
        m = 24;
        s = 59;
        min.innerHTML = "25";
        sec.innerHTML = "00";
        tomatoadd();
        // show.addEventListener('click', countDown);
    }

    // if (m < 10) {
    //     m = m.toString();
    //     console.log(m);
    //     m.substring(0, m.length - 1);
    //     m = "0" + m
    // }
}
show.addEventListener('click', countDown);

//------25分鐘跑完後會加一顆番茄
function tomatoadd() {
    var tomato = document.querySelector('.tomatoes');
    tomato.innerHTML += `<p class="circle_s" style="border-color:#003164; background-color:#003164"></p>`;
}
//------刪掉番茄
function tomatoremove() {
    document.querySelector('.tomatoes').innerHTML = "";
    console.log("ddddd");
}

//-------暫停播放-------
function stopPlayer() {
    clearTimeout(timer);
}

hide.addEventListener('click', stopPlayer);



//-------輸入任務到最上面-------------

// function ListBtn() {
//     var txt = document.querySelector('.txt');
//     var textbox = document.querySelector('.textbox').value;
//     console.log(textbox);
//     txt.innerHTML = textbox;
// }

//----------任務列的處理（印在上面）----------
//-------將任務儲進local stroage裡面（最上面）

// function saveMission(e) {
//     var textbox = document.querySelector('.textbox').value;
//     console.log(textbox);
//     localStorage.setItem('mission', textbox);
//     var txt = document.querySelector('.txt');
//     txt.innerHTML = localStorage.getItem('mission');
// }
// btn.addEventListener('click', saveMission);