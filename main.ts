controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    scene.cameraShake(4, 500)
    otherSprite2.destroy(effects.disintegrate)
    sprite2.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
info.onScore(20, function () {
    asteroids = [img`
        . 9 9 9 9 9 9 c c c a c 9 9 . . 
        9 9 c c b b b a c a a a c 9 9 . 
        9 c c a b a c b a a a b c c 9 . 
        9 c a b c f f f b a b b b a 9 9 
        9 c a c f f f 8 a b b b b b a 9 
        9 c a 8 f f 8 c a b b b b b a 9 
        c c c a c c c c a b c f a b c c 
        c c a a a c c c a c f f c b b a 
        c c a b 6 a c c a f f c c b b a 
        c a b c 8 6 c c a a a b b c b c 
        c a c f f a c c a f a c c c b 9 
        c a 8 f c c b a f f c b c c c 9 
        9 c b c c c c b f c a b b a c 9 
        9 9 a b b b b b b b b b b b c 9 
        . 9 9 c c c c b b b b b c c 9 9 
        . . 9 9 9 9 9 9 c b b c 9 9 9 . 
        `, img`
        . 9 9 9 9 9 9 c c c a c 9 9 . . 
        9 9 c c b b b a c a a a c 9 . . 
        9 c c a b a c b a a a b c 9 9 . 
        9 c a b c f f f b a b b b a 9 9 
        9 c a c f f f 8 a b b b b b a 9 
        9 c a 8 f f 8 c a b b b b b a 9 
        c c c a c c c c a b c f a b c c 
        c c a a a c c c a c f f c b b a 
        c c a b 6 a c c a f f c c b b a 
        c a b c 8 6 c c a a a b b c b c 
        c a c f f a c c a f a c c c b 9 
        c a 8 f c c b a f f c b c c c 9 
        9 c b c c c c b f c a b b a c 9 
        9 9 a b b b b b b b b b b b c 9 
        . 9 9 c c c c b b b b b c 9 9 9 
        . . 9 9 9 9 9 9 9 b b c 9 9 . . 
        `, img`
        9 9 9 9 9 9 9 9 c c c c 9 9 9 9 
        9 9 9 9 c c c c c c c c c 9 9 9 
        9 9 9 c f c c a a a a c a c 9 9 
        9 9 c c f f f f a a a c a a c 9 
        9 9 c c a f f c a a f f f a a c 
        9 9 c c a a a a b c f f f a a c 
        9 c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a 9 
        9 c c b b b b b b b a c c b a 9 
        9 9 c c c b c c c b a a b c 9 9 
        9 9 9 9 c b a c c b b b c 9 9 9 
        9 9 9 9 c b b a a 6 b c 9 9 9 9 
        9 9 9 9 9 9 b 6 6 c c 9 9 9 9 9 
        `]
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
let projectile: Sprite = null
let ship: Sprite = null
let asteroids: Image[] = []
asteroids = [
sprites.space.spaceSmallAsteroid1,
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid0,
sprites.space.spaceAsteroid1,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid3,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
ship = sprites.create(sprites.space.spaceRedShip, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
