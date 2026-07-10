window.addEventListener('DOMContentLoaded', ()=>{
    const loader = document.getElementById('loading')
    loader.classList.add('loaded')
    setTimeout(()=>{
        loader.remove()
    }, 1000);
})