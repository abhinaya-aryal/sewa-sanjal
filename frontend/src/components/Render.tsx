import type { ReactNode } from "react";

type RenderProps = {
  when: boolean;
  children: ReactNode;
};

export default function Render({ when, children }: RenderProps) {
  return when ? <>{children}</> : null;
}
