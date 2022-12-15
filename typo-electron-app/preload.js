/** 
 * 최초에 화면이 열릴시 document가 준비되었을 때의 이벤트를 정의한다.
 * node js의 process versions 개체에 엑세스하여 html 문서에 버전 번호를 추가하게 한다.
 */
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if(element){
            element.innerText = text;
        }
    }
    ['chrome', 'node', 'electron'].forEach(e=>replaceText(`${e}-version`, process.versions[e]))
})