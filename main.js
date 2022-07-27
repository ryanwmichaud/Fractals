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
        function rec(t, size, depth, scale, str){
            
            function recForward(){
                rec(t,size/scale,depth-1,scale,str)
            }
            
            if(depth===0){
                t.forward(size)
            }
            else{
                
                for(const i of str ){
                    if (i === 'f'){
                        recForward()
                    }else if(i === '+'){
                        t.turnRight()
                    }else if(i === '-'){
                        t.turnLeft() 
                    }
                }
            }
        }
        scaleInput.addEventListener('change',()=>{
            scale = parseInt(scaleInput.value)
            console.log('scaleinevent depth:',depth,'\nscale:',scale,'str:',str)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
            t.drawTurtle()
        })
        depthInput.addEventListener('change',()=>{
            depth = parseInt(depthInput.value)
            console.log('depthinevent depth:',depth,'\nscale:',scale,'str:',str)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
            t.drawTurtle()
        })
        document.addEventListener('keydown',(e)=>{
            console.log('keypress begin and depth:',depth);
       
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            
            switch(e.key){
                case 'w': 
                    
                    switch(state){
                        case 'u': 

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
                    break
                case 'd': 
                    switch(state){
                        case 'u': 
                            str=str+'+'
                            break
                        case 'r': 
        
                            break
                        case 'l': 
                            str=str+'++'
                            break
                        case 'd': 
                            str=str+'-'
                            break
                    } 
                    state='r'
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
                            
                            break
                    } 
                    state='d'
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
                            
                            break
                        case 'd': 
                            str=str+'+'
                            break
                    } 
                    state='l'
                    break
                case 'f':
                    str=str+'f'
                    break
                case 'q':
                        str=str+'-'
                        break
                case 'e':
                        str=str+'+'
                        break

            } 
            
            
            
            console.log('keyend and depth:',depth,'\nscale:',scale,'str:',str)
            currDir.textContent='current direction: '+state
            rec(t,size,depth,scale,str)
            t.drawTurtle()
            
        })
        
        
        const t = new Turtle(150,150,ctx)
        const size = 200
        var depth = parseInt(depthInput.value)
        var scale = parseInt(scaleInput.value)
        //str = 'f+f-f-f+ff'
        var state = 'r'
        var str = ''
        currDir.textContent=`current direction: ${state}`

        ctx.beginPath()
        rec(t,size,depth,scale,str)
        t.drawTurtle()


        /*
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        */
    }

    document.addEventListener('DOMContentLoaded',main)
    //once DOM loads, init canvas and context




/*
recForward()
t.turnLeft()
recForward()
t.turnRight()
recForward()
t.turnRight()
recForward()
recForward()
t.turnLeft()
recForward()
t.turnLeft()
recForward()
t.turnRight()
recForward()
*/