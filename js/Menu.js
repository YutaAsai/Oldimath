{
    const HumburgerIcon = document.createElement('ion-icon');
    HumburgerIcon.setAttribute('class', 'HumburgerIcon');
    HumburgerIcon.setAttribute('name', 'menu-outline')
    HumburgerIcon.setAttribute('draggable', 'false');
    const MenuBackGround = document.createElement('div');
    MenuBackGround.setAttribute('class', 'MenuBackGround');
    MenuBackGround.setAttribute('draggable', 'false');

    window.addEventListener('load',() =>{
        const nav = document.querySelector('nav');
        nav.appendChild(HumburgerIcon);
        nav.appendChild(MenuBackGround);
        MenuSize();
    });
    window.addEventListener('resize', () =>{
        MenuSize();
    });
    function MenuSize(){
        HumburgerIcon.style.fontSize = HeaderMenuH * 0.25 * 0.7 + 'px';
        let HeaderRate = (((bestImgWH - bestImgWHphone)/2)/bestImgWH)
        MenuBackGround.style.height = winH + 'px';
        if(winW > winH && winW <= (winH * 2.1)){
            MenuBackGround.style.width = winH * HeaderRate + 'px';
        }else if (winW > (winH * 2.1)){
            MenuBackGround.style.width = winW + 'px';
        }else{
            MenuBackGround.style.width = winW + 'px';
        }
    };
    HumburgerIcon.addEventListener('mouseover', () =>{
        MenuBackGround.classList.add('class', 'MenuBackGroundActive');
    });
    MenuBackGround.addEventListener('mouseleave', () =>{
        MenuBackGround.classList.remove('class', 'MenuBackGroundActive')
    })
}