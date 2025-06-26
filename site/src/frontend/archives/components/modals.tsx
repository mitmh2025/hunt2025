import { styled } from "styled-components";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 80%;
  max-height: 80%;
  max-width: 500px;
  position: relative;
  overflow-y: auto;

  ${AuthorsNoteBlock} {
    margin: 0;
    padding: 2rem;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export { ModalBackdrop, ModalContent, ModalCloseButton };
