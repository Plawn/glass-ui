#version 300 es

// Geometry attributes
in vec3 aPosition;
in vec2 aTexCoord;

// Instance attributes (per-element)
in mat4 aModelMatrix;
in vec2 aRotation;

uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;

out vec2 vUv;
out vec3 vNormal;
out vec3 vViewPosition;

void main() {
  vUv = aTexCoord;

  // Build rotation from euler angles
  float rx = aRotation.x;
  float ry = aRotation.y;

  float cx = cos(rx), sx = sin(rx);
  float cy = cos(ry), sy = sin(ry);

  // Rotation matrix (Y * X)
  mat3 rotMat = mat3(
    cy,      sx * sy,  -cx * sy,
    0.0,     cx,        sx,
    sy,     -sx * cy,   cx * cy
  );

  // Apply rotation to position
  vec3 rotatedPos = rotMat * aPosition;

  // Transform position
  vec4 worldPos = aModelMatrix * vec4(rotatedPos, 1.0);
  vec4 viewPos = uViewMatrix * worldPos;
  vViewPosition = viewPos.xyz;

  // Normal starts as (0, 0, 1) facing camera, then rotated
  // For the glass effect, we want a simple normal that's mostly facing the viewer
  // with slight variation based on rotation
  vec3 baseNormal = vec3(0.0, 0.0, 1.0);
  vNormal = rotMat * baseNormal;

  gl_Position = uProjectionMatrix * viewPos;
}
