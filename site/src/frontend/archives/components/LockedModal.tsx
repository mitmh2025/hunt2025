import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import rootUrl from "../../utils/rootUrl";
import { ModalBackdrop, ModalCloseButton, ModalContent } from "./modals";

const LockedModal = ({ unmount }: { unmount: () => void }) => {
  return (
    <ModalBackdrop onClick={unmount}>
      <ModalContent>
        <ModalCloseButton onClick={unmount}>X</ModalCloseButton>
        <AuthorsNoteBlock>
          <p>
            You’ve managed to find your way to a page that should be locked
            given your current state of progression through the Hunt. You can
            view it anyway, but keep in mind that interacting with this page
            (e.g. by guessing at the puzzle’s answer) may not work as expected.
          </p>

          <p>
            You can always <a href={`${rootUrl}/`}>return to the Hub</a> to find
            the content that should currently be available to you.
          </p>

          <p>
            If you’d like to reset your local state with everything unlocked,
            including this puzzle, you can do so on the{" "}
            <a href={`${rootUrl}/team`}>Manage Team page</a>
          </p>
        </AuthorsNoteBlock>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default LockedModal;
