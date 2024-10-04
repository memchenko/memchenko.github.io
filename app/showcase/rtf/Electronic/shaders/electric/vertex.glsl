varying float y;
varying float x;

void main() {
    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    y = gl_Position.y;
    x = gl_Position.x;
}