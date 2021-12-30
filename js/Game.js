class Game{
    constructor(){

    }
    readGameState(){
        database.ref("gameState").on('value',(data)=>{gameState = data.val()});
      }
      updateGameState(count){
          database.ref("/").update({gameState: count});
      }
      start(){
        if(gameState ===0){
            player = new Player();
            player.readPlayerCount();
            form = new Form();
            form.display();
        }
        player1 = createSprite(width-400,height-100);
        console.log("luna");
        
      player1.addImage("player1", hp1IMG);
      player1.scale = 0.3;
      //player1.debug = true;
      player1.setCollider("rectangle",10,10,100,600);
      player2 = createSprite(width-600,height-100);
      console.log("cedric");
      
      player2.addImage("player2", hp2IMG);
      player2.scale = 0.6;
      //player2.debug = true;
      player2.setCollider("rectangle",10,10,100,300);
      player3 = createSprite(width-800,height-100);
      console.log("draco");
      
      player3.addImage("player3",hp3IMG);
      player3.scale = 0.4;
      //player3.debug = true;
      player3.setCollider("rectangle",10,10,100,600);
      player4 = createSprite(width-1000,height-100);
      console.log("harry");
      
      player4.addImage("player4", hp4IMG);
      player4.scale = 0.4;
      //player4.debug = true;
      player4.setCollider("rectangle",10,10,100,600);
     players =[player1,player2,player3,player4];
     
      }
      
      play(){
        background(0);
        form.hide();
        Player.getPlayerInfo();
        image(bgImg,0,0,displayWidth,displayHeight);
        var x =100;
        var y=500;
        var index =0;
        textSize(20);
        fill(rgb(random(0,255),random(0,255),random(0,255)));
        text("Look out for the hippogriffs and dragons to save your lives!!!",650,100);
        text("Press left and right arrow keys to navigate",650,200);
        for(var plr in allPlayers){
          index = index+1;
          
          x = displayHeight+300+ allPlayers[plr].distanceX;
          y=500;

          players[index -1].x = x;
          players[index - 1].y = y;
                       
          if(index === player.index){
                      
          fill("white");
          textSize(25);
          text(allPlayers[plr].name ,x,y-150);
        }
                        textSize(20);
                        fill("blue");
                         text(allPlayers.player1.name+" = " +allPlayers.player1.score,50,50);
                         fill("yellow");
                        text(allPlayers.player2.name+" = "+ allPlayers.player2.score, 50, 100);
                        fill("green");
                        text(allPlayers.player3.name+" = " +allPlayers.player3.score,50,150);
                        fill("red");
                        text(allPlayers.player4.name+" = " + allPlayers.player4.score, 50, 200);
                        textSize(18);
                        fill("blue");
                        text("Lives left for "+allPlayers.player1.name+" = "+allPlayers.player1.lives,150,550);
                        fill("yellow");
                        text("Lives left for "+allPlayers.player2.name+" = "+allPlayers.player2.lives,150,600);
                        fill("green");
                        text("Lives left for "+allPlayers.player3.name+" = "+allPlayers.player3.lives,150,650);
                        fill("red");
                        text("Lives left for "+allPlayers.player4.name+" = "+allPlayers.player4.lives,150,700);

        
       }
        
      
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        player.distanceX +=10;
        player.updatePlayerInfo();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distanceX -=10;
        player.updatePlayerInfo();
    }

     if (frameCount % 80 === 0) {
         goodNPC = createSprite(random(100, displayWidth), 0, 100, 100);
         goodNPC.scale = 0.4;
         goodNPC.velocityY = 6;
         var rand = Math.round(random(1,5));
         switch(rand){
             case 1: goodNPC.addImage("NPC1",unicorn);
             break;
             case 2: goodNPC.addImage("NPC2", phoenix);
             break;
             case 3: goodNPC.addImage("NPC3", potion);
             break;
             case 4: goodNPC.addImage("NPC4", felix);
             break;
             case 5: goodNPC.addImage("NPC5", broom);
             break;
         }
         pointsGroup.add(goodNPC);
        }
      if(frameCount % 60 === 0){
        badNPC = createSprite(random(100,displayWidth),0,100,100);
        //badNPC.debug=true;
        badNPC.scale = 0.3;
        badNPC.velocityY = 5;
        var rand = Math.round(random(1,2));
        switch(rand){
          case 1: badNPC.addImage("npc1",dragon);
          break;
          case 2:badNPC.addImage("npc2",hippogriff);
          break;
        }
        dangerGroup.add(badNPC);
        
      }
      if(frameCount % 100 === 0) {
        house = createSprite(random(100,displayWidth),0,100,100);
        house.scale = 0.2;
        house.velocityY = 5;
        var rand = Math.round(random(1,4));
        switch(rand){
          case 1: house.addImage("npc3",gryf);
          break;
          case 2:house.addImage("npc4",raven);
          break;
          case 3: house.addImage("npc5",slyther);
          break;
          case 4:house.addImage("npc8",huffle);
          break;
          }
          houseGrp.add(house);
          }
          if (player.index !== null) {


            for (var i = 0; i < pointsGroup.length; i++) { 
              
                if (pointsGroup.get(i).isTouching(players)) { 
                    pointsGroup.get(i).destroy();
                    
                      console.log(player.name);
                    player.score =player.score+10; 
                    player.updatePlayerInfo(); 
                    scoreSound.play();
                    
                }
              }
                for(var i=0; i< dangerGroup.length;i++){
                    if(dangerGroup.get(i).isTouching(players)){
                      
                      dangerGroup.get(i).destroy();
                      
                        console.log(player.name);
                        
                      player.lives --;
                      player.score = player.score-5;
                      player.updatePlayerInfo();
                      loseSound.play();
                      
                      if(player.lives===0){
                        
                      console.log(i);
                      gameState=2
                      }
                    }
                }
                for(var i=0; i< houseGrp.length;i++){
                  if(houseGrp.get(i).isTouching(players)){
                    houseGrp.get(i).destroy();
                   
                      console.log(player.name);
                    player.score = player.score+5;
                    player.updatePlayerInfo();
                    scoreSound.play();
                    

                  }
                

              }
          
            }
            
            drawSprites();
    }

    end(){
      console.log("Ended")
      image(gameOver,0,0, displayWidth,displayHeight);
      for(var plr in allPlayers){
      if(player.lives===0){
        fill("white");
        textSize(25);
        text("Please wait....",500,100);
        textSize(20);
                        fill("blue");
                         text(allPlayers.player1.name+" = " +allPlayers.player1.score,50,50);
                         fill("yellow");
                        text(allPlayers.player2.name+" = "+ allPlayers.player2.score, 50, 100);
                        fill("green");
                        text(allPlayers.player3.name+" = " +allPlayers.player3.score,50,150);
                        fill("red");
                        text(allPlayers.player4.name+" = " + allPlayers.player4.score, 50, 200);
                        textSize(18);
                        fill("blue");
                        text("Lives left for "+allPlayers.player1.name+" = "+allPlayers.player1.lives,150,450);
                        fill("yellow");
                        text("Lives left for "+allPlayers.player2.name+" = "+allPlayers.player2.lives,150,600);
                        fill("green");
                        text("Lives left for "+allPlayers.player3.name+" = "+allPlayers.player3.lives,150,650);
                        fill("red");
                        text("Lives left for "+allPlayers.player4.name+" = "+allPlayers.player4.lives,150,700);
    }
  }
    if(allPlayers.player1.lives === 0 && allPlayers.player2.lives ===0 && allPlayers.player3.lives==0 && allPlayers.player4.lives==0){
       this.updateGameState(0);
      player.updatePlayerCount(0);
       form1 = new Form();
      player.updatePlayerInfo();
      
    }
  }
  

}