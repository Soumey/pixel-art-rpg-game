const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png';
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})
let monster
let playerBattle
let renderedSprites
let battleAnimationId
let queue
let xpBar
let compStyles
let currentXpBarValue
let zeroXp=904
let xpBarUpdateValue = 49
let newXpBarValue
let levelValueElement=document.getElementById('levelValue')
let currentLevel=parseInt(levelValueElement.textContent);
let randomNumber

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#playerUI').style.display = 'flex';
    document.querySelector('#attacksBox').replaceChildren()
    xpBar = document.querySelector('#xpBar');
    compStyles = window.getComputedStyle(xpBar);
    currentXpBarValue = parseInt(compStyles.getPropertyValue("right").replace("px", ""), 10);
    // console.log(compStyles.getPropertyValue("right"));// console.log(xpBar);// console.log(currentXpBarValue);	 // draggle = new Monster(monsters.Draggle)// emby = new Monster(monstersEmby)
    randomNumber = Math.floor(Math.random() * 2)
    if (randomNumber === 1) {
        monster = new Monster(monsters.Draggle)
    } else monster = new Monster(monsters.Emby)
    document.querySelector('#enemyHP').innerHTML = monster.name;
    if(playerClassChoice===1)
    {
        playerBattle = new Monster(monsters.Mage)
    }else{
        playerBattle = new Monster(monsters.Ninja)
    }
    
    renderedSprites = [monster, playerBattle]
    queue = []
    playerBattle.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })
    //event listeners for attacks
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            playerBattle.attack({
                attack: selectedAttack,
                recipient: monster,
                renderedSprites
            })
            if (monster.health <= 0) {
                queue.push(() => {
                    monster.faint()
                })
                queue.push(() => {
                    //fade to white
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            newXpBarValue = currentXpBarValue - xpBarUpdateValue;
                            console.log(newXpBarValue)
                            if(newXpBarValue===120)
                            {
                                xpBar.style.right = `${zeroXp}px`
                                currentLevel += 1;
                                levelValueElement.textContent = currentLevel.toString();
                                document.querySelector('#atkButton').textContent='+'
                                document.querySelector('#defButton').textContent='+'
                            }
                            else{
                                xpBar.style.right = `${newXpBarValue}px`
                            }
                            if(map.start)
                            {
                                animate()
                            }
                            else
                            {
                                map2()
                            }
                            
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                            })
                            document.querySelector('#soundButton').style.display = 'block'
                            battle.initiated = false

                        }
                    })
                })

                return
            }
            //enemy attacks
            const randomAttack = monster.attacks[Math.floor(Math.random() * monster.attacks.length)]
            queue.push(() => {
                monster.attack({
                    attack: randomAttack,
                    recipient: playerBattle,
                    renderedSprites
                })

                if (playerBattle.health <= 0) {
                    queue.push(() => {
                        playerBattle.faint()

                    })
                    queue.push(() => {
                        //fade to white
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId)
                                if(map.start)
                                {
                                    animate()
                                }
                                else
                                {
                                    map2()
                                }
                                document.querySelector('#userInterface').style.display = 'none'
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                })
                                battle.initiated = false

                            }
                        })
                    })
                }
            })
        })
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackType').innerHTML = selectedAttack.type
        })
    })
}
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle);
    //console.log('animating battle');
    battleBackground.draw();
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })

}

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'

})
