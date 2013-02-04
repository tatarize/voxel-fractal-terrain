var voxel = require('voxel')
var fract = require('fractal-terrain-generator')

module.exports = function generate(opts) {
  if (!opts) opts = {}
  if (typeof opts === 'string') opts = {seed: opts}
  var chunkDistance = opts.chunkDistance || 2
  var chunkSize = opts.chunkSize || 32

  var width = chunkDistance * 2 * chunkSize
  
  if (!opts.smoothness) opts.smoothness = 1;
  if (!opts.zdepth) opts.zdepth = 20;
  var terrain = fract.generateTerrain(width, width, opts.smoothness);
  
  return function getChunk(l, h) {
    return voxel.generate(l, h, function(x, y, z, n) {
      return getMaterialIndex(terrain, opts.zdepth, x, y, z)
    })
  }
}

function getMaterialIndex(terrain, zdepth, x, y, z) {
    return (y > (((terrain[Math.abs(x) % terrain.length][Math.abs(z) % terrain.length]+1)*zdepth) -50))?0:1;
} //I'm cheating. The world is looped.
