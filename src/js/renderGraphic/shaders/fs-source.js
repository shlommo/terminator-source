import snoice from './tools/snoice';
import random from './tools/random';

const fsSource = `precision highp float;
                  varying vec2 v_texcoord;
                  uniform sampler2D u_texture;
                  uniform vec2 u_resolution;
                  uniform float u_time;

                  const float interval = 3.0;

                  ${snoice}
                  ${random}

                  void main() {
                    float strength = smoothstep(interval * 0.5, interval, interval - mod(u_time, interval));

                    vec2 shake = vec2(strength * 8.0 + 0.5) * vec2(
                      random(vec2(u_time)) * 2.0 - 1.0,
                      random(vec2(u_time * 2.0)) * 2.0 - 1.0
                    ) / u_resolution;

                    float y = v_texcoord.y * u_resolution.y;
                    float rgbWave = (
                      snoise(vec3(0.0, y * 0.01, u_time * 400.0)) * (2.0 + strength * 32.0)
                      * snoise(vec3(0.0, y * 0.02, u_time * 200.0)) * (1.0 + strength * 4.0)
                      + step(0.9995, sin(y * 0.005 + u_time * 1.6)) * 12.0
                      + step(0.9999, sin(y * 0.005 + u_time * 2.0)) * -18.0
                    ) / u_resolution.x;
                    float rgbDiff = (6.0 + sin(u_time * 500.0 + v_texcoord.y * 40.0) * (20.0 * strength + 1.0)) / u_resolution.x;
                    float rgbUvX = v_texcoord.x + rgbWave;
                    float r = texture2D(u_texture, vec2(rgbUvX + rgbDiff, v_texcoord.y) + shake).r;
                    float g = texture2D(u_texture, vec2(rgbUvX, v_texcoord.y) + shake).g;
                    float b = texture2D(u_texture, vec2(rgbUvX - rgbDiff, v_texcoord.y) + shake).b;

                    float whiteNoise = (random(v_texcoord + mod(u_time, 10.0)) * 2.0 - 1.0) * (0.1 + strength * 0.15);

                    float bnTime = floor(u_time * 20.0) * 200.0;
                    float noiseX = step((snoise(vec3(0.0, v_texcoord.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);
                    float noiseY = step((snoise(vec3(0.0, v_texcoord.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);
                    float bnMask = noiseX * noiseY;
                    float bnUvX = v_texcoord.x + sin(bnTime) * 0.2;
                    float bnR = texture2D(u_texture, vec2(bnUvX + rgbDiff, v_texcoord.y)).r * bnMask;
                    float bnG = texture2D(u_texture, vec2(bnUvX, v_texcoord.y)).g * bnMask;
                    float bnB = texture2D(u_texture, vec2(bnUvX - rgbDiff, v_texcoord.y)).b * bnMask;
                    vec4 blockNoise = vec4(bnR, bnG, bnB, 1.0);

                    float bnTime2 = floor(u_time * 25.0) * 300.0;
                    float noiseX2 = step((snoise(vec3(0.0, v_texcoord.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);
                    float noiseY2 = step((snoise(vec3(0.0, v_texcoord.y * 8.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);
                    float bnMask2 = noiseX2 * noiseY2;
                    float bnR2 = texture2D(u_texture, vec2(bnUvX + rgbDiff, v_texcoord.y)).r * bnMask2;
                    float bnG2 = texture2D(u_texture, vec2(bnUvX, v_texcoord.y)).g * bnMask2;
                    float bnB2 = texture2D(u_texture, vec2(bnUvX - rgbDiff, v_texcoord.y)).b * bnMask2;
                    vec4 blockNoise2 = vec4(bnR2, bnG2, bnB2, 1.0);

                    float waveNoise = (sin(v_texcoord.y * 1200.0) + 1.0) / 2.0 * (0.1 + strength * 0.1);

                    gl_FragColor = vec4(r, g, b, 1.0) * (1.0 - bnMask - bnMask2) + (whiteNoise + blockNoise + blockNoise2 - waveNoise);
                  }`;

export default fsSource;
