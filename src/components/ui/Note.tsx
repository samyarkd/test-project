import { type ReactNode } from "react";
import "~/styles/Note.css";

const Note = (props: { children: ReactNode }) => {
  return <p className="note">{props.children}</p>;
};

export default Note;
