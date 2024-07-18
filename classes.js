class Sprite {
    constructor({
      position,
      image,
      frames = { max: 1, hold: 10 },
      sprites,
      animate = false,
      rotation = 0,
      scale = 1
    }) {
      this.position = position
      this.image = new Image()
      this.frames = { ...frames, val: 0, elapsed: 0 }
      this.image.onload = () => {
        this.width = (this.image.width / this.frames.max) * scale
        this.height = this.image.height * scale
      }
      this.image.src = image.src
      this.animate = animate
      this.sprites = sprites
      this.opacity = 1
      this.rotation = rotation
      this.scale = scale
    }
    draw() {
      c.save()
      c.translate(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      )
      c.rotate(this.rotation)
      c.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      )
      c.globalAlpha = this.opacity
  
      const crop = {
        position: {
          x: this.frames.val * (this.width / this.scale),
          y: 0
        },
        width: this.image.width / this.frames.max,
        height: this.image.height
      }
      const image = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        width: this.image.width / this.frames.max,
        height: this.image.height
      }
      c.drawImage(
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        image.position.x,
        image.position.y,
        image.width * this.scale,
        image.height * this.scale
      )
      c.restore()
      if (!this.animate) return
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
      if (this.frames.elapsed % this.frames.hold === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
      }
    }
  }

class Monster extends Sprite {
    constructor({ isEnemy = false,
        name,
        health = 100,
        position,
        image,
        frames = { max: 1, hold: 25 },
        sprites = [],
        animate = false,
        rotation = 0,
        attacks,
    }) {
        super({
            position,
            image,
            frames,
            sprites,
            animate,
            rotation,
        })
        this.isEnemy = isEnemy
        this.name = name
        this.health = health
        this.attacks = attacks
    }
    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted! '
        gsap.to(this.position, {
            y: this.position.y + 20,
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.battle.stop()
        audio.victory.play()
    }
    attack({ attack, recipient, renderedSprites }) {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name
        if (checkItemLocation(dropZone1) && this.isEnemy===false) {
            recipient.health -= (attack.damage+10)
          }
          else{
            recipient.health -= attack.damage
          }
        
        let rotation = 1.4
        if (this.isEnemy) rotation = -2.6
        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20
        let healthBar = '#enemyHealthBar'
        if (this.isEnemy) healthBar = '#playerHealthBar'
        switch (attack.name) {
          case 'ShurikenThrow':
            const shurikenThrowImage=new Image()
            shurikenThrowImage.src='./img/Shuriken.png'
            const shurikenThrow= new Sprite({
                position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: shurikenThrowImage,
                    frames: {
                        max: 1,
                        hold: 10
                    },
                    animate: true,
                    rotation
            })
            
            renderedSprites.splice(1, 0, shurikenThrow)
            gsap.to(shurikenThrow.position, {
                x: recipient.position.x,
                y: recipient.position.y,
                rotation:rotation+0.2,
                duration: 0.8,
                onComplete: () => {
                    audio.fireballHit.play()
                    gsap.to(healthBar, {
                        width: recipient.health + '%'
                    })
                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.1
                    })
                    gsap.to(recipient, {
                        opacity: 0,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.1

                    })
                    renderedSprites.splice(1, 1)
                }
            })
            break;

            break;

          case 'Waterball':
            audio.initFireball.play()
            const waterballImage = new Image()
            waterballImage.src = './img/waterball.png'
            const waterball = new Sprite({
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                image: waterballImage,
                frames: {
                    max: 4,
                    hold: 10
                },
                animate: true,
                rotation
            })
            renderedSprites.splice(1, 0, waterball)
            gsap.to(waterball.position, {
                x: recipient.position.x,
                y: recipient.position.y,
                duration: 0.8,
                onComplete: () => {
                    audio.fireballHit.play()
                    gsap.to(healthBar, {
                        width: recipient.health + '%'
                    })
                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.1
                    })
                    gsap.to(recipient, {
                        opacity: 0,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.1

                    })
                    renderedSprites.splice(1, 1)
                }
            })
            break;
            case 'Fireball':
                audio.initFireball.play()
                const fireballImage = new Image()
                fireballImage.src = './img/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, fireball)
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    duration: 0.8,
                    onComplete: () => {
                        audio.fireballHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1

                        })

                        renderedSprites.splice(1, 1)
                    }
                })
                break;

            case 'Tackle':
                const tl = gsap.timeline()
                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onConmplete: () => {
                        //enemy get hit
                        audio.tackleHit.play()
                        gsap.to(healthBar, {
                            width: this.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1
                        })
                    }
                }).to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x
                })
                break;
        }
    }
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position,
            this.width = 48, // wielkosc 1 tile, nie zmienia sie
            this.height = 48
    }
    draw() {
        c.fillStyle = 'rgba(255,0,0,0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class NPC extends Sprite {
    constructor({
      position,
      velocity,
      image,
      frames = { max: 1, hold: 10 },
      sprites,
      animate = false,
      rotation = 0,
      scale = 1,
      dialogue = ['']
    }) {
      super({
        position,
        velocity,
        image,
        frames,
        sprites,
        animate,
        rotation,
        scale
      })
  
      this.dialogue = dialogue
      this.dialogueIndex = 0
    }
  }