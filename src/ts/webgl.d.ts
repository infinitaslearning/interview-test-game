// We are using webpack that has loaders that do a tree shake and only takes files that are really used by the game.
// Fragment and Vertex shaders are loaded from an external file to have editor support. The raw-loader takes these
// files during compilation and inputs them as string in the requesting module.

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}