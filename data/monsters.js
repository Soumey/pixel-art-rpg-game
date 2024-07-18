
const monsters = {
    Emby: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src:'./img/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball,attacks.Waterball]

    },
    Draggle: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src:'./img/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Fireball,attacks.Waterball]
    },
	Mage:{
		position: {
            x: 300,
            y: 330
        },
        image: {
            src:'./img/mageBattle.png'
        },
        frames: {
            max: 4,
            hold: 50
        },
        animate: true,
        name: 'Mage',
        isEnemy:false,
        attacks: [attacks.Fireball,attacks.Waterball]
	},

    Ninja:{
		position: {
            x: 300,
            y: 330
        },
        image: {
            src:'./img/ninjaUp.png'
        },
        frames: {
            max: 4,
            hold: 50
        },
        animate: true,
        name: 'Ninja',
        isEnemy:false,
        attacks: [attacks.Tackle,attacks.ShurikenThrow]
	}
}