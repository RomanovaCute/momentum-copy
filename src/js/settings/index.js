const settingBtn = document.querySelector('.set-button'),
    setContainer = document.querySelector('.settings-container'),
    allBtn = document.querySelectorAll('.set-btn'),
    tabsItems = document.querySelectorAll('.set-item'),
    checkbox = document.querySelectorAll('.checkbox');

const allWidgets = document.querySelectorAll('.widget-box'),
    widget = document.querySelectorAll('.certain-widget');

const state = {
    language: 'en',
    photoSource: 'github',
    blocks: [
        {
            widget: 'audio',
            shown: true
        },
        {
            widget: 'weather',
            shown: true
        },
        {
            widget: 'time',
            shown: true
        },
        {
            widget: 'date',
            shown: true
        },
        {
            widget: 'greeting',
            shown: true
        },
        {
            widget: 'quote',
            shown: true
        },
        {
            widget: 'links',
            shown: true
        }
    ]
}

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
        if(!currentCheckbox.classList.contains('on')){
            currentCheckbox.classList.add('on')
        } else {
            currentCheckbox.classList.remove('on')
        }
    })
})

//настройки отображения
widget.forEach((elem, index) => elem.addEventListener('click', () => {
    let input = elem.getElementsByTagName('input')

    state.blocks[index].shown = input[0].checked;
    // setLocalStorageState();
    if (input[0].checked) {
      allWidgets[index].classList.remove('disabled');
    }
    else {
      allWidgets[index].classList.add('disabled');
    }
  }));
