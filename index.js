

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const collisionsMap2 = []

for (let i = 0; i < collisionSecond.length; i += 70) {
    collisionsMap2.push(collisionSecond.slice(i, 70 + i));
}

const battleZonesMap = []

for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const battleZonesMap2 = []

for (let i = 0; i < battleZonesData2.length; i += 70) {
    battleZonesMap2.push(battleZonesData2.slice(i, 70 + i));
}

const npcsMap = []
//1027 i 1028
for (let i = 0; i < npcCollisions.length; i += 70) {
    npcsMap.push(npcCollisions.slice(i, 70 + i));
}

const transitionZonesMap = []

for (let i = 0; i < transitionZoneData.length; i += 70) {
    transitionZonesMap.push(transitionZoneData.slice(i, 70 + i));
}

const offset = {
    x: -40,
    y: -400
}

const offset2 = {
    x: -100,
    y: -500
}

console.log(transitionZonesMap)
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }

    })
})
//-----
const boundaries2 = []
collisionsMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2553) {
            boundaries2.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }

    })
})
//-------
const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }

    })
})


//----------------
const battleZones2 = []
battleZonesMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2553) {
            battleZones2.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }

    })
})

const transitionZones = []

transitionZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1026) {
            transitionZones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }

    })
})


//console.log(transitionZones)
const NPCs = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'
npcsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // 1026 === villager
        if (symbol === 1027) {
            NPCs.push(
                new NPC({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: villagerImg,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['...', 'Hej, wiesz ze możesz wejść w walkę na polach znacząco różniących się od innych?', 'Proszę, wygraj dla mnie 16 pojedynków i awansuj na 2 poziom.']
                })
            )
        }
        // 1031 === oldMan
        else if (symbol === 1028) {
            NPCs.push(
                new NPC({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: oldManImg,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    dialogue: ['Hej, gdzieś tutaj jest ukryte przejścię do drugiej lokacji. Znajdź je dla mnie.']
                })
            )
        }

        if (symbol !== 0) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})


// map1 image 
const image = new Image();
image.src = './img/StartMap.png';

//foreground1 img
const foregroundImage = new Image();
foregroundImage.src = './img/Foreground.png';

// map1 image 
const secondMap = new Image();
secondMap.src = './img/SecondMap.png';

//foreground1 img
const secondForeground = new Image();
secondForeground.src = './img/SecondMapForeground.png';
let playerClassChoice = 1;

//player image
const playerDownImage = new Image();
const playerUpImage = new Image();
const playerLeftImage = new Image();
const playerRightImage = new Image();

playerLeftImage.src = './img/playerLeft.png';
playerRightImage.src = './img/playerRight.png';
playerUpImage.src = './img/playerUp.png';
playerDownImage.src = './img/playerDown.png';

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,// width of full player sprite
        y: canvas.height / 2 - 68 / 2 // height of full player sprite
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 25
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const player2 = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,// width of full player sprite
        y: canvas.height / 2 - 68 / 2 // height of full player sprite
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 25
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})
//----
const background = new Sprite({
    position:
    {
        x: offset.x,
        y: offset.y
    },
    image: image
});
//----
const background2 = new Sprite({
    position:
    {
        x: offset.x,
        y: offset.y
    },
    image: secondMap
});
//----
const foreground = new Sprite({
    position:
    {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});
//-----

const foreground2 = new Sprite({
    position:
    {
        x: offset.x,
        y: offset.y
    },
    image: secondForeground
});
//-----

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }

}
const movables = [background, ...boundaries, foreground, ...battleZones, ...boundaries2, ...battleZones2, foreground2, background2, ...transitionZones, ...NPCs]
function moveMovables(newOffset) {
    movables.forEach((movable) => {
        movable.position.x += newOffset.x;
        movable.position.y += newOffset.y;
    });
}
const renderables = [background, ...boundaries, ...battleZones, ...NPCs, player, foreground]
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}
// right position of player,left position of box,
//left player, right box
// top player, bottom box
const battle = {
    initiated: true
}
const map = {
    start: true
}


function map2() {
    const map2Animation = window.requestAnimationFrame(map2);
    //console.log(animationID);
    background2.draw();
    boundaries2.forEach(boundary => {
        boundary.draw();
        if (rectangularCollision({
            rectangle1: player2,
            rectangle2: boundary
        })
        ) console.log('coliding');
    })
    //testBoundary.draw();
    battleZones2.forEach(battleZone => {
        battleZone.draw();
    })
    player2.draw();
    foreground2.draw();
    let moving = true;
    player2.animate = false;
    if (battle.initiated) return
    //battlezone activation
    if ((keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed )) {
        for (let i = 0; i < battleZones2.length; i++) {
            const battleZone = battleZones2[i];
            const overlappingArea = (Math.min(player2.position.x + player2.width, battleZone.position.x + battleZone.width) - Math.max(player2.position.x, battleZone.position.x)) *
                (Math.min(player2.position.y + player2.height, battleZone.position.y + battleZone.height) - Math.max(player2.position.y, battleZone.position.y))

            if (rectangularCollision({
                rectangle1: player2,
                rectangle2: battleZone
            })&& 
                overlappingArea > (player2.width * player2.height) / 2
                && Math.random() < 0.01
            ) {
                console.log('activate battle')

                //deactivate current animation view
                window.cancelAnimationFrame(map2Animation);

                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                document.querySelector('#soundButton').style.display = 'none';
                battle.initiated = true;

                //flash animation (loading)
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.3,
                    //end on white screen
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.3,
                            onComplete() {
                                //activate new animation loop with battle
                                initBattle()
                                animateBattle();
                                //animate from end screen to battle
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.6
                                })
                            }
                        })


                    }
                })

                break
            }
        }
    }
    //player movement(based on moving rendered map instead of player)
    if (keys.w.pressed && lastKey === 'w') {
        player2.animate = true;
        player2.image = player2.sprites.up;
        for (let i = 0; i < boundaries2.length; i++) {
            const boundary = boundaries2[i];
            if (rectangularCollision({
                rectangle1: player2,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3 // +3 is to know when player is about to collide 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 3;
            })
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        player2.animate = true;
        player2.image = player2.sprites.down;
        for (let i = 0; i < boundaries2.length; i++) {
            const boundary = boundaries2[i];
            if (rectangularCollision({
                rectangle1: player2,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            })
        }

    }
    else if (keys.a.pressed && lastKey === 'a') {
        player2.animate = true;
        player2.image = player2.sprites.left;
        for (let i = 0; i < boundaries2.length; i++) {
            const boundary = boundaries2[i];
            if (rectangularCollision({
                rectangle1: player2,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 3;
            })
        }

    }
    else if (keys.d.pressed && lastKey === 'd') {
        player2.animate = true;
        player2.image = player2.sprites.right;
        for (let i = 0; i < boundaries2.length; i++) {
            const boundary = boundaries2[i];
            if (rectangularCollision({
                rectangle1: player2,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3;
            })
        }
    }



}
function checkForCharacterCollision({
    NPCs,
    player,
    npcsOffset = { x: 0, y: 0 }
}) {
    player.interactionAsset = null
    // monitor for character collision
    for (let i = 0; i < NPCs.length; i++) {
        const NPC = NPCs[i]

        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...NPC,
                    position: {
                        x: NPC.position.x + npcsOffset.x,
                        y: NPC.position.y + npcsOffset.y
                    }
                }
            })
        ) {
            player.interactionAsset = NPC
            break
        }
    }
}


function animate() {
    const animationID = window.requestAnimationFrame(animate);
    console.log('animating')
    //1st start menu
    const soundButton = document.getElementById('#soundButton')
    const playButton = document.getElementById('#playButton')
    const helpButton = document.getElementById('#helpButton')
    const classOne = document.getElementById('#classOne')
    const classTwo = document.getElementById('classTwo')

    renderables.forEach((renderable) => {
        renderable.draw()
    })
    let moving = true;
    player.animate = false;
    if (battle.initiated) return
    for (let i = 0; i < transitionZones.length; i++) {
        const transitionZone = transitionZones[i];
        const overlappingArea = (Math.min(player.position.x + player.width, transitionZone.position.x + transitionZone.width) - Math.max(player.position.x, transitionZone.position.x)) *
            (Math.min(player.position.y + player.height, transitionZone.position.y + transitionZone.height) - Math.max(player.position.y, transitionZone.position.y))
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: transitionZone
        }) &&
            overlappingArea > (player.width * player.height) / 2
           
        ) {
            console.log('activate transition')
            //deactivate current animation view
            window.cancelAnimationFrame(animationID);
            //flash animation (loading)
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 5,
                yoyo: true,
                duration: 0.3,
                //end on white screen
                onComplete() {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        duration: 0.3,
                        onComplete() {
                            map.start = false;
                            //activate new animation loop with battle
                            moveMovables({ x: 2200, y: 100 });
                            map2()
                            //animate from end screen to battle
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.6
                            })
                        }
                    })
                }
            })
            break
        }
    }

    //battlezone activation
    if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed ) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y))

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: battleZone
            }) &&
                overlappingArea > (player.width * player.height) / 2
                && Math.random() < 0.01 // chance to activate the battle
            ) {
                console.log('activate battle')
                //deactivate current animation view
                window.cancelAnimationFrame(animationID);
                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                document.querySelector('#soundButton').style.display = 'none';
                battle.initiated = true;
                //flash animation (loading)
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.3,
                    //end on white screen
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.3,
                            onComplete() {
                                //activate new animation loop with battle
                                initBattle()
                                animateBattle();
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.6
                                })
                            }
                        })


                    }
                })

                break
            }
        }
    }
    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;

        checkForCharacterCollision({
            NPCs,
            player,
            npcsOffset: { x: 0, y: 3 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })
            ) {
                moving = false;
                break
            }
        }
        //clone of the boundary object without overrating the original
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 3;
            })
        }

    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        checkForCharacterCollision({
            NPCs,
            player,
            npcsOffset: { x: 0, y: -3 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            })
        }

    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;

        checkForCharacterCollision({
            NPCs,
            player,
            npcsOffset: { x: 3, y: 0 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 3;
            })
        }

    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;
        checkForCharacterCollision({
            NPCs,
            player,
            npcsOffset: { x: -3, y: 0 }
        })
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y// +3 is to know when player is about to collide 
                    }
                } //clone of the boundary object without overrating the original
            })
            ) {
                //console.log('coliding');
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3;
            })
        }
    }


}
function toggleSound() {
    // Check the current state of the audio
    if (audio.Map.playing()) {
        // Pause the audio
        audio.Map.pause();
        // Change the icon to indicate sound is off
        document.querySelector('#soundIcon').innerHTML = '🔇';
    } else {
        // Play the audio
        audio.Map.play();
        // Change the icon to indicate sound is on
        document.querySelector('#soundIcon').innerHTML = '🔊';
    }
}

function addAtk(){
    let atkValue=parseInt(document.querySelector('#attackValue').textContent)
    atkValue+=1
    document.querySelector('#attackValue').textContent=atkValue
    document.querySelector('#atkButton').textContent=''
}

function addDef(){
    let defValue=parseInt(document.querySelector('#defValue').textContent)
    defValue+=1
    document.querySelector('#defValue').textContent=defValue
    document.querySelector('#defButton').textContent=''
}



helpButton.addEventListener('click', () => {
    document.querySelector('#helpDiv').style.display = 'block';


})

playButton.addEventListener('click', () => {
    document.querySelector('#playButton').style.display = 'none';
    document.querySelector('#helpButton').style.display = 'none';
    document.querySelector('#menuUI').style.display = 'none';

    document.querySelector('#classChoice').style.display = 'grid'
})
classOne.addEventListener('click', () => {
    document.querySelector('#classChoice').style.display = 'none'
    document.querySelector('#playerUI').style.display = 'flex';
    playerClassChoice = 1;
    playerLeftImage.src = './img/mageLeft.png';
    playerRightImage.src = './img/mageRight.png';
    playerUpImage.src = './img/mageUp.png';
    playerDownImage.src = './img/mageDown.png';
    document.querySelector('#characterImg').style.backgroundImage = "url('./img/Faceset.png')"
    document.querySelector('#item').style.backgroundImage="url('./img/Stick.png')"
    console.log(playerClassChoice)
    battle.initiated = false
    animate()
})
classTwo.addEventListener('click', () => {
    document.querySelector('#classChoice').style.display = 'none'
    document.querySelector('#playerUI').style.display = 'flex';
    playerClassChoice = 2;
    console.log(playerClassChoice)
    playerLeftImage.src = './img/ninjaLeft.png';
    playerRightImage.src = './img/ninjaRight.png';
    playerUpImage.src = './img/ninjaUp.png';
    playerDownImage.src = './img/ninjaDown.png';
    document.querySelector('#characterImg').style.backgroundImage = "url('./img/ninjaFace.png')"
    document.querySelector('#item').style.backgroundImage="url('./img/Shuriken.png')"
    
    battle.initiated = false

    animate()
})
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('#helpDiv').style.display = 'none';
    }
})
//key listeners for movement
let lastKey = '' // tracking last key so we're moving by last pressed key when holding 2
window.addEventListener('keydown', (e) => {
    if (player.isInteracting) {
        switch (e.key) {
            case ' ':
                player.interactionAsset.dialogueIndex++

                const { dialogueIndex, dialogue } = player.interactionAsset
                if (dialogueIndex <= dialogue.length - 1) {
                    document.querySelector('#npcDialogueBox').innerHTML =
                        player.interactionAsset.dialogue[dialogueIndex]
                    return
                }
                // finish conversation
                player.isInteracting = false
                player.interactionAsset.dialogueIndex = 0
                document.querySelector('#npcDialogueBox').style.display = 'none'
                
                break
        }
        return
    }

    switch (e.key) {
        case ' ':
            if (!player.interactionAsset) return
            // beginning the conversation
            const firstMessage = player.interactionAsset.dialogue[0]
            document.querySelector('#npcDialogueBox').innerHTML = firstMessage
            document.querySelector('#npcDialogueBox').style.display = 'flex'
            player.isInteracting = true
            break

        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
    }
});
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});
let startSound = false
addEventListener('click', () => {
    if (document.querySelector('#soundIcon').innerHTML === '🔊' && !startSound) {
        audio.Map.play()
        startSound = true

    }

})
addEventListener('keyup', (e) => {
    const inventoryUI = document.querySelector('#inventoryUI');
    if (document.querySelector('#playerUI').style.display === 'flex') {

        if (e.key === 'i') {

            if (inventoryUI.style.display === 'none') {
                inventoryUI.style.display = 'flex';
                document.querySelector('#soundButton').style.display = 'none'
                battle.initiated = true;
            } else {
                inventoryUI.style.display = 'none';
                document.querySelector('#soundButton').style.display = 'block'
                battle.initiated = false;
            }
        }
    }

});
