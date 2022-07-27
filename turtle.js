export class Turtle{
    constructor(x, y, ctx){
        this.startx=x
        this.starty=y
        this.x=x
        this.y=y
        this.direction = 0
        this.ctx = ctx
        this.ctx.moveTo(x,y)
    }
    reset(){
        this.x=this.startx
        this.y=this.starty
        this.direction = 0
        this.ctx.moveTo(this.x,this.y)
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
        this.ctx.lineTo(this.x,this.y)
        this.ctx.stroke()
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
                this.ctx.moveTo(this.x,this.y-tip)
                this.ctx.lineTo(this.x-out,this.y+back)
                this.ctx.lineTo(this.x+out,this.y+back)
                this.ctx.lineTo(this.x,this.y-tip)
                break
            case 0:
                
                this.ctx.moveTo(this.x+tip,this.y)
                this.ctx.lineTo(this.x-back,this.y+out)
                this.ctx.lineTo(this.x-back,this.y-out)
                this.ctx.lineTo(this.x+tip,this.y)
                break
            case 1:
                console.log('down')
                this.ctx.moveTo(this.x,this.y+tip)
                this.ctx.lineTo(this.x+out,this.y-back)
                this.ctx.lineTo(this.x-out,this.y-back)
                this.ctx.lineTo(this.x,this.y+tip)
                break
            case 2:
                console.log('left')
                this.ctx.moveTo(this.x-tip,this.y)
                this.ctx.lineTo(this.x+back,this.y+out)
                this.ctx.lineTo(this.x+back,this.y-out)
                this.ctx.lineTo(this.x-tip,this.y)
                break
            
                

        }
        
        this.ctx.moveTo(this.x,this.y)
        this.ctx.stroke()

        
    }
}

