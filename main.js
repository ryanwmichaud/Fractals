


(function (){
    let canvas, ctx

    function init(){
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
                //console.log('before: ',this.x,this.y)
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
                //console.log('now ',this.x,this.y);
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
            //console.log('depth',depth);
            function recForward(){
                rec(t,size/scale,depth-1,scale,str)
            }
            
            if(depth===0){
                console.log(size);
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

        t = new Turtle(150,150)
        const size = 200
        var depth = parseInt(depthInput.value)
        var scale = parseInt(scaleInput.value)
        //str = 'f+f-f-f+ff'
        str = 'f+f-f-f+f'
        
        ctx.beginPath()
        rec(t,size,depth,scale,str)


        scaleInput.addEventListener('change',()=>{
            scale = parseInt(scaleInput.value)
            console.log('scale: ',scale)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
        })
        depthInput.addEventListener('change',()=>{
            depth = parseInt(depthInput.value)
            console.log('depth: ',depth)
            t.reset()
            ctx.clearRect(0,0,canvas.height,canvas.width)
            ctx.beginPath()
            ctx.moveTo(150,150)
            rec(t,size,depth,scale,str)
        })
       
        /*
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        t.turnRight()
        rec(t,s,d,4)
        */
      
        
    }

    document.addEventListener('DOMContentLoaded',init)
    //once DOM loads, init canvas and context

})()


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