function setShare(){
    const shareTitle = '나의 MBTI는?'
    const shareDes = '간단하게 나의 MBTI를 알아보자~'
    const shareImage = './img/mbti.png'
    const shareURL = 'https://easytestmbti.netlify.app/'

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage,
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
            },
        },

        buttons: [
            {
                title: '나도 테스트하기',
                link: {
                    mobileWebUrl: shareURL,
                    webUrl: shareURL,
                },
            },
        ],
    });
}
