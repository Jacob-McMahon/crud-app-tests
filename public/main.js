const update = document.querySelector('#invasion')
const deleteB = document.querySelector('#fightBack')
const messyDiv = document.querySelector('#message')


//adding an event listener on to the button id'd as invasion in order to
//make an update request to the server by sending a json file to the server 
//here we are sending a name and a quote to update a different name and quote in
// the database
update.addEventListener('click', () => {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.',
        }),
        
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

/*deleteB.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify({
                name: 'Darth Vader'
            })
        })
    .then(res => {
        if(res.ok) return res.json()
        
    })
.then(response => {
    //window.location.reload()
})

})*/
deleteB.addEventListener('click', _ => {
    fetch('quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No quote to delete'){
            messyDiv.textContent = 'No Darth Vader quote to delete'
        }
          window.location.reload(true)
        }
    )
})


