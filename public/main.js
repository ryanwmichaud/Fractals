import {Turtle} from './turtle.js'

let canvas, ctx
//add a target dot for start and finish
    function main(){
        canvas = document.getElementById('canvas')
        if(canvas.getContext) {
            ctx = canvas.getContext('2d')
        }else{
            console.log('browser not support');
            return
        }

        const scaleInput = document.getElementById('scaleInput')
        const depthInput = document.getElementById('depthInput')
        const currDir = document.getElementById('direction')
        const strEdit = document.getElementById('strEdit')
        const strEditSubmit = document.getElementById('strEditSubmit')
        const undo = document.getElementById('undo')
        const titleBox = document.getElementById('titleBox')
        const authorBox = document.getElementById('authorBox')
        const postBtn = document.getElementById('postBtn')

        function rec(t, size, depth, scale, str){
            function recForward(){
                rec(t,size/scale,depth-1,scale,str)
            }
            if(depth===0){
                t.forward(size)
            }
            else{
                for(const i of str ){
                    if(i === 'n'){
                        continue
                    }
                    else if (i === 'f'){
                        recForward()
                    }else if(i === '+'){
                        t.turnRight()
                    }else if(i === '-'){
                        t.turnLeft() 
                    }
                }
            }
        }
        function reDraw(){
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(t.startx,t.starty)
            rec(t,size,depth,scale,str)
            t.drawTurtle()
        }
        scaleInput.addEventListener('change',()=>{
            scale = parseInt(scaleInput.value)
            //console.log('scaleinevent depth:',depth,'\nscale:',scale,'str:',str)
            reDraw()
        })
        depthInput.addEventListener('change',()=>{
            depth = parseInt(depthInput.value)
            //console.log('depthinevent depth:',depth,'\nscale:',scale,'str:',str)
            reDraw()
        })
        strEditSubmit.addEventListener('click',()=>{
            str = strEdit.value
            reDraw()
        })
        undo.addEventListener('click',()=>{
            //console.log('undo pressed');
            if(states.length === 1){
                return
            }
            str=str.slice(0,-1)
            strEdit.value=str
            

            //delete last state. look for prev not n, make it that. 
            states = states.slice(0,-1) 
            //console.log('last',states.charAt(states.length-1))
            var i = states.length-1
            while(states.charAt(i) === 'n'){
                i--
            }
            state = states.charAt(i)

            currDir.textContent=`current direction:  ${state} ${states}`

            reDraw()
        })
        document.addEventListener('keydown',(e)=>{
            switch(e.key){
                case 'w': 
                    
                    switch(state){
                        case 'u': 
                            str=str+'n'
                            break
                        case 'r': 
                            str=str+'-'
                            break
                        case 'l': 
                            str=str+'+'
                            break
                        case 'd': 
                            str=str+'++'
                            break
                    } 
                    state='u'
                    states=states+state
                    break
                case 'd': 
                    switch(state){
                        case 'u': 
                            str=str+'+'
                            break
                        case 'r': 
                            str=str+'n'
                            break
                        case 'l': 
                            str=str+'++'
                            break
                        case 'd': 
                            str=str+'-'
                            break
                    } 
                    state='r'
                    states=states+state
                    break
                case 's': 
                    switch(state){
                        case 'u': 
                            str=str+'++'
                            break
                        case 'r': 
                            str=str+'+'
                            break
                        case 'l': 
                            str=str+'-'
                            break
                        case 'd': 
                            str=str+'n'
                            break
                    } 
                    state='d'
                    states=states+state
                    break
                case 'a': 
                    switch(state){
                        case 'u': 
                            str=str+'-'
                            break
                        case 'r': 
                            str=str+'++'
                            break
                        case 'l': 
                            str=str+'n'
                            break
                        case 'd': 
                            str=str+'+'
                            break
                    } 
                    state='l'
                    states=states+state
                    break
                case 'p':
                    str=str+'f'
                    states=states+'n'
                    break
                case 'q':
                        str=str+'-'
                        break
                case 'e':
                        str=str+'+'
                        break
            } 
            currDir.textContent=`current direction:  ${state} ${states}`
            strEdit.value=str
    
            //console.log('keyend and depth:',depth,'\nscale:',scale,'str:',str)
            reDraw()
            
        })

        

        postBtn.addEventListener('click',async ()=>{
            

            const data = {
                title: titleBox.value,
                author: authorBox.value
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            }


            console.log('sending',options.body);
            const res = await fetch('/entries',options)
            const json = await res.json()
            console.log('server sent back',json)
        })
        
        
        const t = new Turtle(150,150,ctx)
        const size = 200
        var depth = parseInt(depthInput.value)
        var scale = parseInt(scaleInput.value)
        //str = 'f+f-f-f+ff'
        var state = 'r'
        var states = 'r'
        var str = ''
        currDir.textContent=`current direction: ${state} ${states}`
        ctx.beginPath()
        rec(t,size,depth,scale,str)
        t.drawTurtle()


 
    }

    document.addEventListener('DOMContentLoaded',main)
    //once DOM loads, init canvas and context

    


