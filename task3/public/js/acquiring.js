export const acquiring = () => {
    //DOM
    const headline = document.querySelector('#headline');
    const message = document.querySelector('#message');
    const btnWrapper = document.querySelector('.btn-wrapper');

    //h2の内容を書き換え
    headline.innerHTML = '取得中';
    //h3の内容を書き換え
    message.innerHTML = '少々お待ちください';
    //.btn-wrapperの中身をすべて消す
    while (btnWrapper.firstChild) {
        btnWrapper.removeChild(btnWrapper.firstChild);
    }
};
