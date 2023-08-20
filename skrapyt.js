
                mapaX = []
                mapaY = []
                tworzeniePath = false
stworzPath = false
    function map(mapo){
        switch (mapo) {
            case 1:
                mapaX = [0, 0,     750, 750, 150, 150,600,600,350,350]
                mapaY = [100, 100, 100, 750, 750, 250,250,600,600,450]
                stworzPath = true;
                break;
            case 2:
                mapaX = [450, 450, 450, 750, 750, 0,]
                mapaY = [900, 900, 100, 100, 450, 450]
                stworzPath = true;
                break;
            case 3:
                mapaX = [425, 425, 825, 825, 725, 625,475,425, 375, 225, 125, 25, 25, 425]
                mapaY = [900, 900, 400, 200, 100, 50, 100,300, 100, 50, 100, 200,400, 900]
                stworzPath = true;
                break;
            case 4:
                document.getElementById("playArea").style.display = "inherit";
                document.getElementById("mapaKoniec").style.display = "block";
                document.getElementById("mapy").style.display = "none";

                tworzeniePath = true
                break;
        }


if(stworzPath == true){


    obama = setInterval(pathStworz,60)
    obama2 = setInterval(pathPhysics,3)


    document.getElementById("mapaKoniec").style.display = "none";
        document.getElementById("playArea").style.display = "inherit";
        document.getElementById("przy1").style.display = "block";
        document.getElementById("przy2").style.display = "block";
        document.getElementById("przy3").style.display = "block";
        document.getElementById("przy4").style.display = "block";
        document.getElementById("przy5").style.display = "block";
        document.getElementById("hp").style.display = "inherit";
        document.getElementById("money").style.display = "inherit";
        document.getElementById("mapy").style.display = "none";


        
            
    }

    }

    var money = 0
    var enemyIdCount =0
    var enemyList = []
    var fenomen = 0
    var bulletspeedmodifier = 6
    var hp = 10;
    const enemyTemplate = {
        x: 0,
        y: 0,
        angle: 0,
        speed: 0,
        hp: 0,
        type: 0,
        nextMinientyPunkten: 0,
        id: "",
    }


    var towerIdCount =0
    var towerList = []
    const towerTempplatte = {
        range: 0,
        type: 0,
        x: 0,
        y: 0,
        dmg: 1,
        lvl: 1,
        lastShot:0,
        atkSpeed: 1,
        buletSpeed: 3,
        koszt: 0,
        upgradecost: 50,
    }





    var pathIdCount =0
    var pathList = []
    const pathTemppletto = {
        x: 0,
        y: 0,
        angle: 0,
        speed: 0,
        id: "",
        nextMinientyPunkten: 0,
    }

    var bulletIdCount=0
    var bulletList=[]
    const bulletTenpette = {
        x: 0,
        y: 0,
        angle: 0,
        speed: 4,
        id: "",
        dmg: 1,
        type: 0,
    }

    var WybierandoTpye = 1
    var kostWierz = [400,500,600,800,1000]
    


    function wybierando(klarent) {
        WybierandoTpye = klarent
        document.getElementById("przy1").style. border = "cornflowerblue 6px solid"
        document.getElementById("przy2").style. border = "cornflowerblue 6px solid"
        document.getElementById("przy3").style. border = "cornflowerblue 6px solid"
        document.getElementById("przy4").style. border = "cornflowerblue 6px solid"
        document.getElementById("przy5").style. border = "cornflowerblue 6px solid"
        document.getElementById("przy"+klarent).style. border = "10px solid red"
    }
   


    //zegar
    var gejmtajm = 0
    function timer(){
        gejmtajm+=20
        
    }
    setInterval(timer,20)

    var myszka = { x: undefined, y: undefined };
    window.addEventListener('mousemove', (event) => {
      myszka = { x: event.clientX-500, y: event.clientY };
    });


idkulka = 0
    function mouseClick(event) {

        if(tworzeniePath == true){ // DOKOŃCZYĆ

            if (myszka.x<900){
            if(mapaX.length==0){
                mapaX.push(myszka.x)
                mapaY.push(myszka.y)
            }

            mapaX.push(myszka.x)
            mapaY.push(myszka.y)

            idkulka++
            idkulkaa= "k"+idkulka

           document.getElementById("playArea").innerHTML += "<div class='kulka' id='"+ idkulkaa +"'></div>"
           document.getElementById(idkulkaa).style.transform = "translate(" + parseInt(myszka.x-15) + "px," + parseInt(myszka.y-15) + "px)";
        }
        }

        else{
        let x = true
        for(let i = 0; i < pathList.length; i++){
            if(myszka.x > pathList[i].x -37.5 && myszka.x < pathList[i].x + 75 + 12.5 && myszka.y > pathList[i].y - 37.5 && myszka.y < pathList[i].y + 75 + 12.5){
                x = false
            }
            }

        for(let i = 0; i < towerList.length; i++){
            if(myszka.x > towerList[i].x -52.5 && myszka.x < towerList[i].x + 50 + 6.25 && myszka.y > towerList[i].y - 52.5 && myszka.y < towerList[i].y + 50 + 6.25){
                x = false  
                uptower = towerList[i]   
                upgradeupdate()
        }
    }

        if (myszka.x<25 || myszka.x >875 || myszka.y<25 || myszka.y>875){
            x=false
        }

        if (x==true){
        towerStworz()
        }
    }


}
    towertypes= ["Normal", "Snajper", "Shotgun", "爆弾", "Kisiel"]
    function upgradeupdate(){
        document.getElementById("upgrades").style.display = "flex"
        document.getElementById("dmg").innerHTML = "DMG:" + "<br>" + uptower.dmg + "<br>" + "$"+uptower.upgradecost
        document.getElementById("range").innerHTML = "RANGE:" + "<br>" + uptower.range + "<br>" + "$"+uptower.upgradecost
        document.getElementById("AS").innerHTML = "ATK SPEED:" + "<br>" + uptower.atkSpeed/1000 + "s" + "<br>" + "$"+uptower.upgradecost
        document.getElementById("tower").innerHTML = towertypes[uptower.type-1]
        document.getElementById("sell").innerHTML =  "SELL FOR: <br>" + parseInt( kostWierz[(uptower.type-1)] * 0.5 + uptower.upgradecost)
    }
    function upgs(ulepszenie){
        if (money>=uptower.upgradecost || ulepszenie==4){
        switch (ulepszenie) {
            case 1:
                uptower.dmg= uptower.dmg+0.5
                if (uptower.type==2){
                    uptower.dmg= uptower.dmg+2
                }
            break;
            
            case 2:
                uptower.range+=10
            break;

            case 3:
                uptower.atkSpeed= uptower.atkSpeed * 0.97
                uptower.atkSpeed= Math.floor(uptower.atkSpeed)
            break;
            case 4:
                money += kostWierz[(uptower.type-1)] * 0.5 + uptower.upgradecost
                document.getElementById(uptower.id).style.display = "none"
                for (let i = 0; i < towerList.length; i++) {
                   if (uptower.id == towerList[i].id){         
                       towerList.splice(i,1)
                       document.getElementById("upgrades").style.display = "none"
                       break
                   }
                }
                
            break;
        }
        if (ulepszenie != 4){
        money-=uptower.upgradecost
        uptower.upgradecost+= 20
        }
        document.getElementById('money').innerHTML = '$'+money
        if (ulepszenie != 4){
        upgradeupdate()
        for (let l = 0; l < towerList.length; l++) {
            if(uptower.id == towerList[l].id){
                towerList[l] = uptower
                break
            }
        }
    }
    }
    }


    function towerStworz(){
        if (money>=kostWierz[WybierandoTpye-1]){
        
        towerIdCount++
        id = "t"+towerIdCount
        document.getElementById("playArea").innerHTML += "<div class='tower' id='"+ id +"'></div>"
        document.getElementById(id).style.transform = "translate(" + parseInt(myszka.x-25) + "px," + parseInt(myszka.y-25) + "px)";
        tymczasowyTower = Object.create(towerTempplatte)
        tymczasowyTower.x = myszka.x
        tymczasowyTower.y = myszka.y

        switch (WybierandoTpye) {
            case 1:
                tymczasowyTower.type = 1;
                tymczasowyTower.atkSpeed = 400
                tymczasowyTower.range = 200
                tymczasowyTower.dmg = 2  
                tymczasowyTower.buletSpeed = 3*bulletspeedmodifier
                document.getElementById(id).style.backgroundImage = "url(niemowlak1.png)"
                break;
            case 2:
                tymczasowyTower.type = 2;
                tymczasowyTower.atkSpeed =1500
                tymczasowyTower.range = 500
                tymczasowyTower.dmg = 20  
                tymczasowyTower.buletSpeed = 8*bulletspeedmodifier
                document.getElementById(id).style.backgroundImage = "url(niemowlak2.png)"
                break;
             case 3:
                tymczasowyTower.type = 3;
                tymczasowyTower.atkSpeed = 2000
                tymczasowyTower.range = 200
                tymczasowyTower.dmg = 4  
                tymczasowyTower.buletSpeed = 4*bulletspeedmodifier
                break;
            case 4:
                    tymczasowyTower.type = 4;
                    tymczasowyTower.atkSpeed =800
                    tymczasowyTower.range = 400  
                    tymczasowyTower.dmg = 2  
                    tymczasowyTower.buletSpeed = 4*bulletspeedmodifier
                break;    

                case 5:
                    tymczasowyTower.type = 5;
                    tymczasowyTower.atkSpeed = 1000
                    tymczasowyTower.range = 150  
                    tymczasowyTower.dmg = 1  
                    tymczasowyTower.buletSpeed = 1*bulletspeedmodifier
                break;  
        }
          
        
        
        // range typów towera tu i dmg pewnie i atk speed zaleznie od typu towera
        tymczasowyTower.id = id
        tymczasowyTower.nextMinientyPunkten = 1,
        towerList.push(tymczasowyTower)
        money = money - kostWierz[WybierandoTpye-1]
        document.getElementById('money').innerHTML = '$'+money
    }

    }



    function towerPhysics(){
        for(let i = 0; i < towerList.length; i++){ 
            cenemy = 0
            if(gejmtajm-towerList[i].lastShot>=towerList[i].atkSpeed){
            EnemyInRangeArray = []
            ctower = towerList[i]
            for(let j = 0; j < enemyList.length; j++){
                fenomen = Math.sqrt(Math.pow(towerList[i].x - enemyList[j].x, 2) + Math.pow(towerList[i].y - enemyList[j].y, 2))
                if (fenomen < ctower.range){
                    EnemyInRangeArray.push(enemyList[j])
                }
            }
            bigEnemy = 0
            for (let l = 0; l < EnemyInRangeArray.length; l++) {
                
                if (bigEnemy < EnemyInRangeArray[l].nextMinientyPunkten){
                    bigEnemy = EnemyInRangeArray[l].nextMinientyPunkten
                    cenemy = EnemyInRangeArray[l]
                }
                
            }
            if (cenemy != 0){
            ctower = towerList[i]
            shoot()
            towerList[i].lastShot = gejmtajm
            }
        }
        }
    }

    function shoot(){ // bullet stworz
        // if moze strzelac potem ogarnij to 
                    switch (ctower.type) {
                        case 1:
                        case 2:
                            bulletIdCount++
                            id = "b"+bulletIdCount
                            document.getElementById("playArea").innerHTML += "<div class='bullet' id='"+ id +"'></div>"
                            document.getElementById(id).style.transform = "translate(" + parseInt(ctower.x) + "px," + parseInt(ctower.y) + "px)";
                            tymczasowyBullet = Object.create(bulletTenpette)
                            tymczasowyBullet.x = ctower.x
                            tymczasowyBullet.y = ctower.y
                            tymczasowyBullet.dmg = ctower.dmg
                            tymczasowyBullet.speed = ctower.buletSpeed
                            tymczasowyBullet.angle = Math.atan2(cenemy.y+25-ctower.y, cenemy.x+25-ctower.x) *180 / Math.PI;
                            // range typów towera tu i dmg pewnie
                            tymczasowyBullet.id = id
                            bulletList.push(tymczasowyBullet)
                            break;
                        case 3:

                            for (let i = 0; i < 5; i++) {
                                bulletIdCount++
                            id = "b"+bulletIdCount
                            document.getElementById("playArea").innerHTML += "<div class='bullet' id='"+ id +"'></div>"
                            document.getElementById(id).style.transform = "translate(" + parseInt(ctower.x) + "px," + parseInt(ctower.y) + "px)";
                            tymczasowyBullet = Object.create(bulletTenpette)
                            tymczasowyBullet.x = ctower.x
                            tymczasowyBullet.y = ctower.y
                            tymczasowyBullet.dmg = ctower.dmg
                            tymczasowyBullet.speed = ctower.buletSpeed
                            tymczasowyBullet.angle = Math.atan2(cenemy.y+25-ctower.y, cenemy.x+25-ctower.x) *180 / Math.PI;
                            tymczasowyBullet.angle = tymczasowyBullet.angle + Math.random() * (40) - 20
                            // range typów towera tu i dmg pewnie
                            tymczasowyBullet.id = id
                            bulletList.push(tymczasowyBullet)
                            }
                            break;
                            case 4:
                                bulletIdCount++
                            id = "b"+bulletIdCount
                            document.getElementById("playArea").innerHTML += "<div class='bullet' id='"+ id +"'></div>"
                            document.getElementById(id).style.transform = "translate(" + parseInt(ctower.x) + "px," + parseInt(ctower.y) + "px)";
                            tymczasowyBullet = Object.create(bulletTenpette)
                            tymczasowyBullet.x = ctower.x
                            tymczasowyBullet.y = ctower.y
                            tymczasowyBullet.dmg = ctower.dmg
                            tymczasowyBullet.speed = ctower.buletSpeed
                            tymczasowyBullet.type = 1
                            tymczasowyBullet.angle = Math.atan2(cenemy.y+25-ctower.y, cenemy.x+25-ctower.x) *180 / Math.PI;
                            // range typów towera tu i dmg pewnie
                            tymczasowyBullet.id = id
                            bulletList.push(tymczasowyBullet)
                                break;
                        case 5:
                            //kisiel
                            for (let i = 0; i < enemyList.length; i++) {
                                odleglosc = Math.sqrt(Math.pow(ctower.x - enemyList[i].x, 2) + Math.pow(ctower.y - enemyList[i].y, 2))
                                if (odleglosc<ctower.range){
                                    enemyList[i].hp = enemyList[i].hp - ctower.dmg
                                    if (enemyList[i].speed >=0.25){                   
                                    enemyList[i].speed = enemyList[i].speed * 0.5
                                    }
                                    if (enemyList[i].speed <0.25 && enemyList[i].type != 2){
                                        enemyList[i].speed = 0.25
                                    }
                                }
                            }
                        break;
                    }
                   
        
                
            }


            

    function bulletPhysics(){
        for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].x = bulletList[i].x +  Math.cos(bulletList[i].angle * (Math.PI / 180)) * bulletList[i].speed
        bulletList[i].y = bulletList[i].y +  Math.sin(bulletList[i].angle * (Math.PI / 180)) * bulletList[i].speed
        
        if (bulletList[i].angle>=360){bulletList[i].angle=bulletList[i].angle-360}
        if (bulletList[i].angle<0){bulletList[i].angle=bulletList[i].angle+360}
    
        document.getElementById(bulletList[i].id).style.transform = "translate(" + bulletList[i].x + "px," + bulletList[i].y + "px)";  
            if (bulletList[i].x>1000 || bulletList[i].x < -100 || bulletList[i].y >1000 || bulletList[i].y <-100){
                document.getElementById(bulletList[i].id).style.display = "none"
                bulletList.splice(i,1)
            }
        }
    }

inter1 = setInterval(towerPhysics, 50)
inter2 = setInterval(bulletPhysics, 20)
gameround=-1
    // stwórz przecinika
    function enemyStworz(){

        if (enemyIdCount%10 ==0){
            gameround++
        }
        console.log(gameround)
        document.getElementById('hp').innerHTML = hp+"hp <br> Runda: " + (gameround+1)

        enemyIdCount++
        id = "e"+enemyIdCount
        document.getElementById("playArea").innerHTML += "<div class='enemy' id='"+ id +"'></div>"
        tymczasowyEnemy = Object.create(enemyTemplate)
        tymczasowyEnemy.x = mapaX[0]
        tymczasowyEnemy.y = mapaY[0]
        tymczasowyEnemy.angle =  Math.atan2(mapaY[tymczasowyEnemy.nextMinientyPunkten]- tymczasowyEnemy.y, mapaX[tymczasowyEnemy.nextMinientyPunkten] - tymczasowyEnemy.x) * 180 / Math.PI;
        tymczasowyEnemy.id = id
        tymczasowyEnemy.nextMinientyPunkten = 1

        enemyTypeToSpawnowanieTerazPotemToZmienic = Math.floor(Math.random()*3)

        switch (enemyTypeToSpawnowanieTerazPotemToZmienic) {
            case 0:
                //normal
                tymczasowyEnemy.speed = 0.5 + (gameround* 0.005)
                tymczasowyEnemy.hp = Math.floor( 15 + (gameround*2) * Math.pow(1.05, gameround))
                tymczasowyEnemy.type = 1
                document.getElementById(id).style.backgroundImage = "url(niemowlak2.png)"
                break;
            case 1:
                //szybki
                tymczasowyEnemy.speed = 1 + (gameround * 0.01)
                tymczasowyEnemy.hp = Math.floor( 7 + (gameround* 0.5) * Math.pow(1.05, gameround))
                tymczasowyEnemy.type = 2
                document.getElementById(id).style.backgroundImage = "url(niemowlak1.png)"
                break;
            case 2:
                //tank
                tymczasowyEnemy.speed = 0.25 + (gameround * 0.002)
                tymczasowyEnemy.hp = Math.floor( 30 + (gameround* 4) * Math.pow(1.05, gameround))
                tymczasowyEnemy.type = 3
                document.getElementById(id).style.backgroundImage = "url(tank.png)"
                break;        
        
    
        }
        


        enemyList.push(tymczasowyEnemy)
    }

   
    inter3 = setInterval( function enemyPhysics(){
        for (let i = 0; i < enemyList.length; i++) {
            currentEnemy = enemyList[i]

            if(currentEnemy.x > mapaX[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.x < mapaX[currentEnemy.nextMinientyPunkten]+5 && currentEnemy.y > mapaY[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.y < mapaY[currentEnemy.nextMinientyPunkten]+5){
                currentEnemy.nextMinientyPunkten++    
                document.getElementById(currentEnemy.id).innerHTML = currentEnemy.id + " " + currentEnemy.hp
                enemySetAngle()
            }

            
            enemyMove()
            enemyHit()
            enemyList[i] = currentEnemy
            
            
            if (currentEnemy.hp <=0){
                document.getElementById(enemyList[i].id).style.display = "none"
                enemyList.splice(i,1)
                money+=35
                money+= Math.floor(Math.random()*6 -3)
                document.getElementById('money').innerHTML = '$'+money
                // pieniądze pog
            }
            let x = mapaX.length - 1
            if (currentEnemy.nextMinientyPunkten>x){
                document.getElementById(enemyList[i].id).style.display = "none"
                enemyList.splice(i,1)


                // hp tutaj
                hp = hp-1
                document.getElementById('hp').innerHTML = hp+"hp <br> Runda: " + (gameround+1)

                if(hp<=0){
                    wybuchid = 0
                    for (let i = 0; i < towerList.length; i++) {
                        document.getElementById("playArea").innerHTML += " <img src='wybuch.png' id= w"+ wybuchid+">"
                        document.getElementById("w"+ wybuchid).style.transform = "translate(" + parseInt(towerList[i].x-80) + "px," + parseInt(towerList[i].y-80) + "px)";
                        

                        wybuchid +=1   
                    }

                    towerList=[]
                    clearInterval(inter1)
                    clearInterval(inter2)
                    clearInterval(inter3)
                    clearInterval(inter4)
                    document.getElementById('gameover').style.display = "flex"
                }
            }
        }
    }, 3);
   


    function enemyHit(){
        for(let i = 0; i<bulletList.length; i++){
            if(bulletList[i].x <= currentEnemy.x+50 && bulletList[i].x >= currentEnemy.x){
                if(bulletList[i].y <= currentEnemy.y+50 && bulletList[i].y >= currentEnemy.y){
                    if (bulletList[i].type == 0){
                    currentEnemy.hp -= bulletList[i].dmg
                    document.getElementById(bulletList[i].id).style.display = "none"
                    bulletList.splice(i,1)
                    // hitAnimation tu
                    }
                    else {
                        for (let j = 0; j < enemyList.length; j++) {
                            odleglosc = Math.sqrt(Math.pow(currentEnemy.x - enemyList[j].x, 2) + Math.pow(currentEnemy.y - enemyList[j].y, 2))
                            if (odleglosc< 200){
                                enemyList[j].hp = enemyList[j].hp - bulletList[i].dmg                        
                            }
                        }
                        document.getElementById(bulletList[i].id).style.display = "none"
                        bulletList.splice(i,1)
                    }
                }
            }
        }
        
    }


    function enemyMove(){
        currentEnemy.x = currentEnemy.x +  Math.cos(currentEnemy.angle * (Math.PI / 180)) * currentEnemy.speed
        currentEnemy.y = currentEnemy.y +  Math.sin(currentEnemy.angle * (Math.PI / 180)) * currentEnemy.speed
        
        if (currentEnemy.angle>=360){currentEnemy.angle=currentEnemy.angle-360}
        if (currentEnemy.angle<0){currentEnemy.angle=currentEnemy.angle+360}
    
        document.getElementById(currentEnemy.id).style.transform = "translate(" + currentEnemy.x + "px," + currentEnemy.y + "px)";
    }

    

    function enemySetAngle(){
        currentEnemy.angle = Math.atan2(mapaY[currentEnemy.nextMinientyPunkten]- currentEnemy.y, mapaX[currentEnemy.nextMinientyPunkten] - currentEnemy.x) * 180 / Math.PI;
    }
    
    function pathStworz(){
        pathIdCount++
        id = "p"+pathIdCount
        document.getElementById("playArea").innerHTML += "<div class='path' id='"+ id +"'></div>"
        tymczasowypath = Object.create(pathTemppletto)
        tymczasowypath.x = mapaX[0]
        tymczasowypath.y = mapaY[0]
        tymczasowypath.angle =  Math.atan2(mapaY[tymczasowypath.nextMinientyPunkten]- tymczasowypath.y, mapaX[tymczasowypath.nextMinientyPunkten] - tymczasowypath.x) * 180 / Math.PI;
        tymczasowypath.id = id
        tymczasowypath.speed = 3
        tymczasowypath.nextMinientyPunkten = 1,
        pathList.push(tymczasowypath)
    }



    function pathPhysics(){
        for (let i = 0; i < pathList.length; i++) {
            currentEnemy = pathList[i]

            
            if(currentEnemy.x > mapaX[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.x < mapaX[currentEnemy.nextMinientyPunkten]+5 && currentEnemy.y > mapaY[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.y < mapaY[currentEnemy.nextMinientyPunkten]+5){
                currentEnemy.nextMinientyPunkten++    
                enemySetAngle()
            }

            
            pathMove()
            pathList[i] = currentEnemy
            
            let x = mapaX.length - 1
            if (currentEnemy.nextMinientyPunkten>x){
                clearInterval(obama)
                clearInterval(obama2)
                money = 1000
                document.getElementById('money').innerHTML = '$'+money

                while(idkulka>0){
                    document.getElementById("k"+idkulka).style.display = "none"
                    idkulka--
                }

                inter4 = setInterval( function a(){
                enemyStworz()
                }, 1000); 
            }
        }
    }

    function pathMove(){
        currentEnemy.x = currentEnemy.x +  Math.cos(currentEnemy.angle * (Math.PI / 180)) * currentEnemy.speed
        currentEnemy.y = currentEnemy.y +  Math.sin(currentEnemy.angle * (Math.PI / 180)) * currentEnemy.speed
        
        if (currentEnemy.angle>=360){currentEnemy.angle=currentEnemy.angle-360}
        if (currentEnemy.angle<0){currentEnemy.angle=currentEnemy.angle+360}
    
        document.getElementById(currentEnemy.id).style.transform = "translate(" + parseInt(currentEnemy.x - 12.5) + "px," + parseInt(currentEnemy.y - 12.5) + "px)";
    }

    

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

   function reset(){
    location.reload()
   }

   function creat(){
    if (mapaX.length>=3){
       stworzPath = true;
       map(4)
       tworzeniePath = false;
   }
   else{
       alert("daj wincej punktów")
   }
}
    
