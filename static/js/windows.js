let openFilter          = false
let isPopupOpen           = false
const filterButtonWhat  = document.getElementById('filter_button_what')
const filterWhat        = document.querySelector('#filter_what .window-inner')
const filterButtonWhen  = document.getElementById('filter_button_when')
const filterWhen        = document.querySelector('#filter_when .window-inner')
const filterButtonWho   = document.getElementById('filter_button_who')
const filterWho         = document.querySelector('#filter_who .window-inner')
filterButtonWhat.addEventListener('click',()=>filterToggleStart(filterWhat))
filterWhat.addEventListener('animationend', ()=>filterAnimationEnd(filterWhat))
filterButtonWhen.addEventListener('click', ()=>filterToggleStart(filterWhen))
filterWhen.addEventListener('animationend', ()=>filterAnimationEnd(filterWhen))
filterButtonWho.addEventListener('click', ()=>filterToggleStart(filterWho))
filterWho.addEventListener('animationend', ()=>filterAnimationEnd(filterWho))

const timeInput     = document.getElementById('input_time')
const dayInput      = document.getElementById('input_day')
const monthInput    = document.getElementById('input_month')
const dateInput     = document.getElementById('input_date')
const today         = new Date()

timeInput.value     = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`
dayInput.value      = `${today.getDay()}`
monthInput.value    = `${(today.getMonth() + 1).toString().padStart(2, '0')}`
dateInput.value     = `${today.getFullYear()}-${String(today.getMonth()  + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`

async function filterToggleStart(filter){
    if(isPopupOpen){
        await windowClose()
    }
    filterToggle(filter)
}

function filterToggle(filter){
    return new Promise(resolve=>{
        const filterArrow = document.querySelector(`.filter-${filter.dataset.filterName}-arrow`)
        if(!openFilter){
            filter.classList.add('open')
            filterArrow.classList.add('open')
            openFilter = filter
        }else{
            document.querySelector(`.filter-${openFilter.dataset.filterName}-arrow`).classList.remove('open')
            if(openFilter != filter){
                openFilter.classList.add('close')
    
                openFilter = filter
            }else{
                filter.classList.add('close')
                filterArrow.classList.remove('open')
                openFilter = false
                filter.addEventListener('animationend',()=>{
                    resolve()
                }, {once:true})
            }
        }
    })
}

function filterAnimationEnd(filter){
    if(filter.classList.contains('close')){
        filter.classList.remove('close', 'open')
    }
    if(openFilter){
        openFilter.classList.add('open')
        document.querySelector(`.filter-${openFilter.dataset.filterName}-arrow`).classList.add('open')
    }
}
async function popupOpen(url){
    if(openFilter){
        await filterToggle(openFilter)
    }
    htmx.ajax('GET', `/mockup/${url}`, {
        target: '#popup_main',
        swap: 'innerHTML transition:true'
    })
    isPopupOpen = true
}
function windowClose(button){
    return new Promise(resolve=>{
        let popup
        if(button){
            popup = button.parentElement
        }else{
            popup = document.querySelector('#popup_main .window-inner')
        }
        if(popup){
            popup.classList.remove('open')
            popup.classList.add('close')
            popup.addEventListener('animationend',()=>{
                isPopupOpen = false
                if(button){
                    popup.remove()
                }
                resolve()
            }, {once:true})
        }
    })
}