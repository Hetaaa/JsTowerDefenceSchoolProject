    var enemyIdCount =0
    var enemyList = []
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
        range: 1,
        type: 0,
        x: 0,
        y: 0,
        dmg: 0,
        lvl: 1
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


// pierwsze 2 są takie same!
    mapaX = [100, 100, 150, 400, 800]
    mapaY = [100, 100, 300, 800, 850]



    var myszka = { x: undefined, y: undefined };
    window.addEventListener('mousemove', (event) => {
      myszka = { x: event.clientX-500, y: event.clientY };
    });



    function mouseClick(event) {
        let x = true
        for(let i = 0; i < pathList.length; i++){
            if(myszka.x > pathList[i].x -37.5 && myszka.x < pathList[i].x + 75 + 12.5 && myszka.y > pathList[i].y - 37.5 && myszka.y < pathList[i].y + 75 + 12.5){
                x = false
            }
            
            }
           
        


        for(let i = 0; i < towerList.length; i++){
            if(myszka.x > towerList[i].x -52.5 && myszka.x < towerList[i].x + 50 + 6.25 && myszka.y > towerList[i].y - 52.5 && myszka.y < towerList[i].y + 50 + 6.25){
                x = false
                
        }

    }

        if (x==true){
        towerStworz()
        }


    }

    function towerStworz(){
        towerIdCount++
        id = "t"+towerIdCount
        document.getElementById("playArea").innerHTML += "<div class='tower' id='"+ id +"'></div>"
        document.getElementById(id).style.transform = "translate(" + parseInt(myszka.x-25) + "px," + parseInt(myszka.y-25) + "px)";
        tymczasowyTower = Object.create(towerTempplatte)
        tymczasowyTower.x = myszka.x
        tymczasowyTower.y = myszka.y
        tymczasowyTower.type = 1;
        tymczasowyTower.id = id
        tymczasowyTower.nextMinientyPunkten = 1,
        towerList.push(tymczasowyTower)
    }

    function enemyStworz(){
        enemyIdCount++
        id = "e"+enemyIdCount
        document.getElementById("playArea").innerHTML += "<div class='enemy' id='"+ id +"'></div>"
        tymczasowyEnemy = Object.create(enemyTemplate)
        tymczasowyEnemy.x = mapaX[0]
        tymczasowyEnemy.y = mapaY[0]
        tymczasowyEnemy.angle =  Math.atan2(mapaY[tymczasowyEnemy.nextMinientyPunkten]- tymczasowyEnemy.y, mapaX[tymczasowyEnemy.nextMinientyPunkten] - tymczasowyEnemy.x) * 180 / Math.PI;
        tymczasowyEnemy.speed = 1,
        tymczasowyEnemy.hp = 1,
        tymczasowyEnemy.type = 1;
        tymczasowyEnemy.id = id
        tymczasowyEnemy.nextMinientyPunkten = 1,
        enemyList.push(tymczasowyEnemy)
    }

   
    setInterval( function enemyPhysics(){
        for (let i = 0; i < enemyList.length; i++) {
            currentEnemy = enemyList[i]

            if(currentEnemy.x > mapaX[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.x < mapaX[currentEnemy.nextMinientyPunkten]+5 && currentEnemy.y > mapaY[currentEnemy.nextMinientyPunkten]-5 && currentEnemy.y < mapaY[currentEnemy.nextMinientyPunkten]+5){
                currentEnemy.nextMinientyPunkten++    
                enemySetAngle()
            }

            
            enemyMove()
            enemyList[i] = currentEnemy
            
            let x = mapaX.length - 1
            if (currentEnemy.nextMinientyPunkten>x){
                document.getElementById(enemyList[i].id).style.display = "none"
                enemyList.splice(i,1)
                //trac hp
            }
        }
    }, 3);
   

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
                setInterval( function a(){
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

    obama = setInterval(pathStworz,60)
    obama2 = setInterval(pathPhysics,3)
    