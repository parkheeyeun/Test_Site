const main = document.querySelector("#main")
const qna = document.querySelector("#qna")
const result = document.querySelector("#result")
// 질문 갯수
const endpoint = 12
const select = [0, 0, 0, 0, 0, 0, 0, 0]

// qna질문 추가하기
function addAnswer(answerText, qidx, idx) {
    var a = document.querySelector(".abox")
    var answer = document.createElement('button')
    // answer에 class생성
    answer.classList.add('answerList')
    answer.classList.add('p-3')
    answer.classList.add('my-4')
    answer.classList.add('fadein')
    answer.classList.add('fadeout')
    a.appendChild(answer)
    answer.innerHTML = answerText

    answer.addEventListener('click', function () {
        var children = document.querySelectorAll('.answerList')
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true
            children[i].style.animation = "fadeout 0.5 s"
            children[i].style.WebkitAnimation = "fadeout 0.5s"
        }
        setTimeout(() => {
            var target = qnalist[qidx].a[idx].type
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1
            }

            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none'
            }
            // 다음질문이 나타나기 위해 전질문을 none해주고 idx를 증가시켜준다
            goNext(++qidx)
        }, 450)
    }, false)
}

// 결과 점수 계산
function cal() {
    console.log(select)
    const array = [[0, 1], [2, 3], [4, 5], [6, 7]]
    const mbtiType = array.map(([a, b]) => {
        if (select[a] > select[b]) {
            return a.toString()
        } else {
            return b.toString()
        }
    }).join('')

    console.log(mbtiType)
    return mbtiType
}

function setResult() {
    let point = cal()
    // console.log("포인트:", point)
    let resultName = ''
    let resultDesc = ''

    for (let i = 0; i < infolist.length; i++) {
        if (point === infolist[i].name) {
            resultName = infolist[i].type
            resultDesc = infolist[i].desc
        }
    }
    // console.log(resultName)
    
    const resultname = document.getElementsByClassName('resultname')
    for (let i = 0; i < resultname.length; i++) {
        resultname[i].innerHTML = resultName;
    }

    const resultDes = document.getElementsByClassName('resultdes')
    for (let i = 0; i < resultDes.length; i++) {
        resultDes[i].innerHTML = resultDesc;
    }

    var resultImg = document.querySelector('img')
    const imgDiv = document.querySelector('#resultImg')
    var imgUrl = 'img/' + point + '.png'
    resultImg.src = imgUrl
    resultImg.alt = point
    resultImg.classList.add('img-fluid')
    imgDiv.appendChild(resultImg)
}

// 결과 페이지로 이동
function goResult() {
    qna.style.animation = "fadeout 1s"
    qna.style.WebkitAnimation = "fadeout 1s"

    setTimeout(() => {
        result.style.animation = "fadein 1s"
        result.style.WebkitAnimation = "fadein 1s"
        setTimeout(() => {
            qna.style.display = "none"
            result.style.display = "block"
        }, 450);
    }, 450)

    /// console.log(select)
    setResult()
}

// 다음 질문으로 이동하기
function goNext(qidx) {
    if (qidx === endpoint) {
        goResult()
        return
    }

    var q = document.querySelector(".qbox")
    q.innerHTML = qnalist[qidx].q
    for (let i in qnalist[qidx].a) {
        // i는 질문의 선택지
        addAnswer(qnalist[qidx].a[i].answer, qidx, i)
    }
    var status = document.querySelector('.statusbar')
    status.style.width = (100 / endpoint) * (qidx + 1) + '%'
}

// 질문 시작하기
function begin() {
    main.style.animation = "fadeout 1s"
    main.style.WebkitAnimation = "fadeout 1s"

    //시작하기를 눌렀을때 qna가 display block되어야 함
    //효과가 끝난후에 main의 display가 none되어야 함

    setTimeout(() => {
        // animation이 반정도 진행되었을 때 qna가 fadein
        qna.style.animation = "fadein 1s"
        qna.style.WebkitAnimation = "fadein 1s"
        setTimeout(() => {
            // main이 none되고 qna가 block된다
            main.style.display = "none"
            qna.style.display = "block"
        }, 450);
        let qidx = 0
        goNext(qidx)
    }, 450)
}

