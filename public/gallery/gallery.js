
function displayData(data){
    data.forEach(element => {
        const root = document.createElement('div')
        
        const date = document.createElement('p')
        date.textContent = new Date(element.date).toLocaleString()

        const title = document.createElement('p')
        title.textContent = element.title
        
        const author = document.createElement('p')
        author.textContent = element.author
        
        console.log(element.image);
        const image = document.createElement('img')
        image.src = element.image
        image.height = 300

        const loadForm = document.createElement('form')
        const loadBtn = document.createElement('button')
        loadBtn.textContent='load'
        loadForm.append(loadBtn)
        loadForm.action="../index.html"
        loadBtn.addEventListener('click',async()=>{
            const data = {
                data:  loadBtn.parentElement.parentElement.children.item(5).textContent
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            }
            console.log('sending',options.body);
            const res = await fetch('/loaded', options)
            const json = await res.json()
            console.log('server sent back', json);
            
            
        })

        const instructions = document.createElement('p')
        instructions.textContent = element.instructions

        root.append(title,author,date,image,loadForm,instructions)
        root.classList.add('entry')
        document.getElementById('feed').prepend(root)
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


