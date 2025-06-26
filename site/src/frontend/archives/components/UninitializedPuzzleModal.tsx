import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import rootUrl from "../../utils/rootUrl";
import { ModalBackdrop, ModalContent, ModalCloseButton } from "./modals";

const UninitializedPuzzleModal = ({ unmount }: { unmount: () => void }) => {
  return (
    <ModalBackdrop onClick={unmount}>
      <ModalContent>
        <ModalCloseButton onClick={unmount}>X</ModalCloseButton>
        <AuthorsNoteBlock>
          <p>Welcome to the 2025 MIT Mystery Hunt archives!</p>

          <p>
            If you’d just like to view this puzzle, feel free to close this
            dialog and do so. However, this archival site also supports as much
            of the original Hunt unlock structure as we were able to manage. If
            you’d like to experience the Hunt from the beginning, you can do so
            by <a href={`${rootUrl}/`}>visiting the Hub</a>.
          </p>
        </AuthorsNoteBlock>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default UninitializedPuzzleModal;
