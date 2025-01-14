import { calculateNumberLabels } from "../../../components/Crossword";

export const DRAUGHTQUEENS_LABELS = calculateNumberLabels(
  `
# # #.# # .
 . . . . .#
#    .#    
 . ... . . 
##  #    # 
. .. . .. .
# #     # #
 . . ... .
#    .#    
 . . . . .
.#   .#    
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.padEnd(11, " ").split("")),
);
