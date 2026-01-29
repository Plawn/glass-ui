#version 300 es
precision highp float;

uniform sampler2D uBackgroundTexture;
uniform float uIOR;
uniform float uThickness;
uniform float uRoughness;
uniform vec2 uResolution;
uniform float uChromaticAberration;

in vec2 vUv;
in vec3 vNormal;
in vec3 vViewPosition;

out vec4 fragColor;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// Rounded rectangle distance
float roundedBoxSDF(vec2 p, vec2 size, float radius) {
  vec2 q = abs(p) - size + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

void main() {
  vec2 screenUV = gl_FragCoord.xy / uResolution;
  vec2 localUV = vUv;
  vec2 centered = localUV - 0.5;

  // Rounded box for edge detection
  float dist = roundedBoxSDF(centered, vec2(0.48), 0.08);

  // Normal from vertex shader
  vec3 normal = normalize(vNormal);

  // Very subtle noise
  float noise = (random(gl_FragCoord.xy * 0.1) - 0.5) * uRoughness * 0.5;

  // Refraction offset
  vec2 refractionOffset = (normal.xy + noise) * uThickness * 0.012;

  // Chromatic aberration
  float ca = uChromaticAberration;
  vec2 uvR = clamp(screenUV + refractionOffset * (1.0 + ca), 0.0, 1.0);
  vec2 uvG = clamp(screenUV + refractionOffset, 0.0, 1.0);
  vec2 uvB = clamp(screenUV + refractionOffset * (1.0 - ca), 0.0, 1.0);

  // Sample background
  float r = texture(uBackgroundTexture, uvR).r;
  float g = texture(uBackgroundTexture, uvG).g;
  float b = texture(uBackgroundTexture, uvB).b;
  vec3 refractedColor = vec3(r, g, b);

  // Fresnel based on normal tilt (for hover effect)
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float NdotV = max(dot(normal, viewDir), 0.0);
  float fresnel = pow(1.0 - NdotV, 3.0);

  // Subtle inner border highlight (thin white line inside edge)
  float innerEdge = smoothstep(0.0, -0.02, dist) * smoothstep(-0.05, -0.02, dist);

  // Outer glow (soft bloom outside)
  float outerGlow = smoothstep(0.05, 0.0, dist) * 0.3;

  // Top-left specular (3D depth illusion)
  float specular = smoothstep(-0.3, 0.0, -centered.x - centered.y + 0.2);
  specular *= smoothstep(0.0, -0.1, dist); // Only inside
  specular *= 0.08;

  // Start with refracted background (transparent)
  vec3 finalColor = refractedColor;

  // Add very subtle glass tint
  finalColor = mix(finalColor, vec3(1.0), 0.02);

  // Add specular highlight
  finalColor += specular;

  // Add inner border
  finalColor += vec3(1.0) * innerEdge * 0.4;

  // Add outer glow
  finalColor += vec3(0.7, 0.8, 1.0) * outerGlow;

  // Add fresnel on hover
  finalColor += vec3(1.0) * fresnel * 0.15;

  fragColor = vec4(finalColor, 1.0);
}
