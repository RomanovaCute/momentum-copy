const settingBtn = document.querySelector('.set-button'),
    setContainer = document.querySelector('.settings-container'),
    allBtn = document.querySelectorAll('.set-btn'),
    tabsItems = document.querySelectorAll('.set-item'),
    checkbox = document.querySelectorAll('.checkbox');


settingBtn.addEventListener('click', openMenu)

function openMenu(){
    setContainer.classList.contains('active') ? setContainer.classList.remove('active') : setContainer.classList.add('active')
}

allBtn.forEach(item => {
    item.addEventListener('click', () => {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab')
        let currentTab = document.querySelector(tabId);

        if(! currentBtn.classList.contains('active')){
            allBtn.forEach((item) => {
                item.classList.remove('active')
            })
        }

        tabsItems.forEach((item) => {
            item.classList.remove('active')
        })

        currentBtn.classList.add('active');
        currentTab.classList.add('active');
    })
})

//автоматический 'клик' по первой вкладке в 'настройках'
document.querySelector('.set-btn').click();

checkbox.forEach((elem) => {
    elem.addEventListener('click', () => {
        console.log('clicked');
        let currentCheckbox = elem;
        currentCheckbox.classList.toggle('on')
        

    })
})
