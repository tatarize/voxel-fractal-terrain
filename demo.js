var createGame = require('voxel-engine')
var chunkSize = 32
var chunkDistance = 3

var fractal = require('voxel-fractal-terrain');

window.generator = fractal({
    chunkDistance: chunkDistance,
    smoothness: 1.5,
    zdepth: 50
})

var createGame = require('voxel-engine')

var game = createGame({
    texturePath: '/textures/',
    generateVoxelChunk: generator,
    controlOptions: {
        jump: 15
    }
})

game.controls.pitchObject.rotation.x = -1.5;
game.appendTo('#container');
window.game = game;


// obtain pointer lock
container.addEventListener('click', function() {
    game.requestPointerLock(container);
});

