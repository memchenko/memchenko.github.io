varying float y;
varying float x;

uniform float time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vec2(x, y);
    uv.x += time;
    uv.y += time;

    float transparency = step(0.8, sin(y * 20.0));
    transparency *= step(0.8, sin(x * 20.0));

    // float intensity = 1.0 + noise(uv * 4.0) * 2.0 * sin(time);
    // float intensity = 1.0 + step(0.0, sin(y * 4.0 + time * 5.0)) * 0.5;
    float intensity = 1.0 + sin(y * 4.0 - time * 20.0) * 0.5;

    gl_FragColor = vec4(6.0 * intensity, 0.2 * intensity, 0.5 * intensity, transparency);
}