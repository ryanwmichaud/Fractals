
    let canvas, ctx

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
            }
            turnRight(){
                this.direction = (this.direction + 1)%4;   
            }
            turnLeft(){
                this.direction = (this.direction - 1)%4;
                if(this.direction<0){
                    this.direction=3
                }
                
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

        scaleInput.addEventListener('change',()=>{
            scale = parseInt(scaleInput.value)
            console.log('scaleinevent depth:',depth,'\nscale:',scale,'str:',str)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
        })
        depthInput.addEventListener('change',()=>{
            depth = parseInt(depthInput.value)
            console.log('depthinevent depth:',depth,'\nscale:',scale,'str:',str)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
        })
        document.addEventListener('keydown',(e)=>{
            console.log('keypress begin and depth:',depth);
       
            t.reset()
            ctx.beginPath()
            
            switch(e.key){
                case 'ArrowUp': 
                    
                    switch(state){
                        case 'u': 
                            str=str+'f'
                            break
                        case 'r': 
                            str=str+'-f'
                            break
                        case 'l': 
                            str=str+'+f'
                            break
                        case 'd': 
                            str=str+'++f'
                            break
                    } 
                    state='u'
                    break
                case 'ArrowRight': 
                    switch(state){
                        case 'u': 
                            str=str+'+f'
                            break
                        case 'r': 
                            str=str+'f'
                            break
                        case 'l': 
                            str=str+'++f'
                            break
                        case 'd': 
                            str=str+'-f'
                            break
                    } 
                    state='r'
                    break
                case 'ArrowDown': 
                    switch(state){
                        case 'u': 
                            str=str+'++f'
                            break
                        case 'r': 
                            str=str+'+f'
                            break
                        case 'l': 
                            str=str+'-f'
                            break
                        case 'd': 
                            str=str+'f'
                            break
                    } 
                    state='d'
                    break
                case 'ArrowLeft': 
                switch(state){
                    case 'u': 
                        str=str+'-f'
                        break
                    case 'r': 
                        str=str+'++f'
                        break
                    case 'l': 
                        str=str+'f'
                        break
                    case 'd': 
                        str=str+'+f'
                        break
                } 
                    state='l'
                    break
            } 
            
            
            
            console.log('keyend and depth:',depth,'\nscale:',scale,'str:',str)

            rec(t,size,depth,scale,str)
            
        })
        
        
        t = new Turtle(150,150)
        const size = 200
        var depth = parseInt(depthInput.value)
        var scale = parseInt(scaleInput.value)
        //str = 'f+f-f-f+ff'
        var state = 'r'
        str = ''
        
        ctx.beginPath()
        rec(t,size,depth,scale,str)


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