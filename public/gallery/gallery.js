
function displayData(data){
    data.forEach(element => {
        const root = document.createElement('div')
        
        const title = document.createElement('p')
        title.textContent = element.title
        
        const author = document.createElement('p')
        author.textContent = element.author
        
        const instructions = document.createElement('p')
        instructions.textContent = element.instructions
        
        const date = document.createElement('p')
        date.textContent = element.date

        root.append(title,author,date,instructions)
        root.classList.add('entry')
        document.body.append(root)
        
    })
    
    
   // text.textContent=JSON.stringify(data)
    
}


async function main(){
    console.log('getting');
    const data = await fetch('/entries')
    const readable = await data.json()
    //console.log('data: ', readable)
    displayData(readable)
}


main()


