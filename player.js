function Player(imageName1, imageName2, imageName3, x, y)
{
  this.spritesheet1 = loadImage(imageName1);
  this.spritesheet2 = loadImage(imageName2);
  this.spritesheet3 = loadImage(imageName3);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = 0;
  this.facing = 0;
  this.hurrdir = 0;
  this.still = 0;
  this.frameSpeed = 3;
  this.draw = function()
  {
    push();

    translate(this.x,this.y);
    if(this.facing < 0)
    {
      scale(-1.0,1.0)// if moving is 1 then forward and if -1 the backwards
    }
    if(this.moving == 0 && this.still == 0)
    {
      image(this.spritesheet1, 0, 0, 80, 80, 0, 0, 80, 80);
    }
    if(this.moving == 0 && this.still == 1)
    {
      image(this.spritesheet1, 0, 0, 80, 80, 0, 0, 80, 80);
    }
    if(this.moving == 0 && this.still == 2)
    {
      image(this.spritesheet2, 0, 0, 80, 80, 0, 0, 80, 80);
    }
    if(this.moving == 0 && this.still == 3)
    {
      image(this.spritesheet3, 0, 0, 80, 80, 0, 0, 80, 80);
    }

    else if(this.moving == 1 || this.moving == -1)
    {
      if(this.hurrdir == 1){
        this.still = 1;
        image(this.spritesheet1, 0, 0, 80, 80, this.frame*80 + 80, 0, 80, 80);
        if (frameCount % this.frameSpeed == 0) //speed
        {
          this.frame = (this.frame + 1) % 2;
          this.x = this.x + 6 * this.moving; //horizontal movement
       }
      }
      else if(this.hurrdir == 2){
        this.still = 2;
        image(this.spritesheet2, 0, 0, 80, 80, this.frame*80 + 80, 0, 80, 80);
        if (frameCount % this.frameSpeed == 0) //speed
        {
         this.frame = (this.frame + 1) % 2;
          this.y = this.y + 6 * this.moving; //vertical movement
        }
      }
      else if(this.hurrdir == 3){
        this.still = 3;
        image(this.spritesheet3, 0, 0, 80, 80, this.frame*80 + 80, 0, 80, 80);
        if (frameCount % this.frameSpeed == 0) //speed
        {
         this.frame = (this.frame + 1) % 2;
          this.y = this.y + 6 * this.moving; //vertical movement
        }
      }
     
     } 
    pop();
  }
  this.stop = function()
  {
    this.moving = 0;
    this.frame = 3;
  }

  this.go = function(direction, dir)
  {
    this.moving = direction;
    this.facing = direction;
    this.hurrdir = dir;
  }
  this.hurt = function(){
  
   
  }
}