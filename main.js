
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

  
        const directions = {
            0 : 'right',
            1 : 'down',
            2 : 'left',
            3 : 'up'
        }

        class Turtle{
            constructor(x, y){
                this.startx=x
                this.starty=y
                this.x=x
                this.y=y
                this.direction = 0
                ctx.moveTo(x,y)
            }
            reset(){
                this.x=this.startx
                this.y=this.starty
                this.direction = 0
                ctx.moveTo(this.x,this.y)
            }
            forward(dist){
              
                if(this.direction===0){
                    this.x+=dist;
                    
                }
                if(this.direction===1){
                    this.y+=dist;
                    
                }
                if(this.direction===2){
                    this.x-=dist;
                   
                }
                if(this.direction===3){
                    this.y-=dist;
                    
                }
                ctx.lineTo(this.x,this.y)
                ctx.stroke()
                //this.drawTurtle()
            }
            turnRight(){
                this.direction = (this.direction + 1)%4; 
                //this.drawTurtle()  
            }
            turnLeft(){
                this.direction = (this.direction - 1)%4;
                if(this.direction<0){
                    this.direction=3
                }
                //this.drawTurtle()
                
            }
            drawTurtle(){
                const out = 5
                const back = 5
                const tip = 8
                switch(this.direction){
                    case 3:
                        ctx.moveTo(this.x,this.y-tip)
                        ctx.lineTo(this.x-out,this.y+back)
                        ctx.lineTo(this.x+out,this.y+back)
                        ctx.lineTo(this.x,this.y-tip)
                        break
                    case 0:
                        
                        ctx.moveTo(this.x+tip,this.y)
                        ctx.lineTo(this.x-back,this.y+out)
                        ctx.lineTo(this.x-back,this.y-out)
                        ctx.lineTo(this.x+tip,this.y)
                        break
                    case 1:
                        console.log('down')
                        ctx.moveTo(this.x,this.y+tip)
                        ctx.lineTo(this.x+out,this.y-back)
                        ctx.lineTo(this.x-out,this.y-back)
                        ctx.lineTo(this.x,this.y+tip)
                        break
                    case 2:
                        console.log('left')
                        ctx.moveTo(this.x-tip,this.y)
                        ctx.lineTo(this.x+back,this.y+out)
                        ctx.lineTo(this.x+back,this.y-out)
                        ctx.lineTo(this.x-tip,this.y)
                        break
                    
                        

                }
                
                ctx.moveTo(this.x,this.y)
                ctx.stroke()

                
            }
        }


       

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
        const scaleInput = document.getElementById('scaleInput')
        const depthInput = document.getElementById('depthInput')
        const currDir = document.getElementById('direction')
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
        
        
        t = new Turtle(150,150)
        const size = 200
        var depth = parseInt(depthInput.value)
        var scale = parseInt(scaleInput.value)
        //str = 'f+f-f-f+ff'
        var state = 'r'
        str = ''
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