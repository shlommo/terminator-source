const vsSource = `attribute vec2 coordinates;
                    attribute vec2 texture_coordinates;
                    varying vec2 v_texcoord;
                    void main() {
                      gl_Position = vec4(coordinates, 0.0, 1.0);
                      v_texcoord = texture_coordinates;
                    }`;

export default vsSource;
