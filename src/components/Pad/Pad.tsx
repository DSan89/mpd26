import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import "./Pad.style.css";
import { ReactNode } from "react";

type Props = {
  id: string;
  editMode: boolean;
  configurator: ReactNode;
  onClick: () => void;
  onCloseDetail: () => void;
};

function Pad(props: Props) {
  return (
    <>
      <Dialog.Root open={props.editMode}>
        <Dialog.Trigger asChild>
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "grey",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
            }}
            onClick={props.onClick}
          >
            {/* {noteKey} */}
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Edit pad {props.id}
            </Dialog.Title>
            <Dialog.Description className="DialogDescription"></Dialog.Description>
            {props.configurator}
            <Dialog.Close asChild onClick={props.onCloseDetail}>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default Pad;
