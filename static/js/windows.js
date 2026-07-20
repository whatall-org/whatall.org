let openFilter          = false
let popupOpen           = false
const filterButtonWhat  = document.getElementById('filter_button_what')
const filterWhat        = document.querySelector('#filter_what .window-inner')
const filterButtonWhen  = document.getElementById('filter_button_when')
const filterWhen        = document.querySelector('#filter_when .window-inner')
const filterButtonWho   = document.getElementById('filter_button_who')
const filterWho         = document.querySelector('#filter_who .window-inner')
filterButtonWhat.addEventListener('click',()=>filterToggle(filterWhat))
filterWhat.addEventListener('animationend', ()=>filterAnimationEnd(filterWhat))
filterButtonWhen.addEventListener('click', ()=>filterToggle(filterWhen))
filterWhen.addEventListener('animationend', ()=>filterAnimationEnd(filterWhen))
filterButtonWho.addEventListener('click', ()=>filterToggle(filterWho))
filterWho.addEventListener('animationend', ()=>filterAnimationEnd(filterWho))

const timeInput     = document.getElementById('input_time')
const dayInput      = document.getElementById('input_day')
const monthInput    = document.getElementById('input_month')
const dateInput     = document.getElementById('input_date')
const today         = new Date()

console.log(String(today.getDay() + 1))
timeInput.value     = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`
dayInput.value      = `${today.getDay()}`
monthInput.value    = `${(today.getMonth() + 1).toString().padStart(2, '0')}`
dateInput.value     = `${today.getFullYear()}-${String(today.getMonth()  + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`

async function filterToggle(filter){
    if(popupOpen){
        await popupClose()
    }
    if(!openFilter){
        filter.classList.add('open')
        openFilter = filter
    }else{
        if(openFilter != filter){
            openFilter.classList.add('close')
            openFilter = filter
        }else{
            filter.classList.add('close')
            openFilter = false
        }
    }
    }

function filterAnimationEnd(filter){
    if(filter.classList.contains('close')){
        filter.classList.remove('close', 'open')
    }
    if(openFilter){
        openFilter.classList.add('open')
    }
}
function popupClose(button){
    return new Promise(resolve=>{
        const popup = document.querySelector('#popup_main .window-inner')
        if(popup){
            popup.classList.remove('open')
            popup.classList.add('close')
            popup.addEventListener('animationend',()=>{
                popupOpen = false
                resolve()
            }, {once:true})
        }
    })
}