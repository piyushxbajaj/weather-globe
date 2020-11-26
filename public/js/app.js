

console.log('Client side javascript side file loaded')
const url = '/weather?address='


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent =''
messageTwo.textContent = ''
document.getElementById("weatherIcon").src=''


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading weather for '+location
    messageTwo.textContent=''
    document.getElementById("weatherIcon").src=''
    fetch(url+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                console.log(data.error)
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
                document.getElementById("weatherIcon").src=data.img
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.img)
            }
        })
    })
    console.log(location)
})

