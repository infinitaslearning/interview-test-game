precision mediump float;

uniform sampler2D   uMainSampler;
varying vec2        outTexCoord;

void main()
{
    vec2 uv = outTexCoord;

    // New resolution of (nx / ny)
    float nx = float(300);
    float ny = float(300);

    vec2 pos;
    pos.x = floor(uv.x * nx) / nx;
    pos.y = floor(uv.y * ny) / ny;
    gl_FragColor = texture2D(uMainSampler, pos);
}
