import { DrunkEffect } from "./DrunkEffect/DrunkEffect";

export function Drunk(props) {
  const effect = new DrunkEffect(props);

  return <primitive object={effect} />;
}
