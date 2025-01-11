import { calculateNumberLabels } from "../../../components/Crossword";

export const HARDLYSAFE_LABELS = calculateNumberLabels(
  `
####.###.####..
#   .#  #    #.
#   #         #
#     .#  ..#  
#  .# #  .##   
#  #.#  .#     
#   #.# #   ...
#    # .#   ###
...#   # .#    
###   .# #.#   
#    .#   #.#  
#  ..#  .# #   
#  ##   #      
.#        .#   
..#   .#  .#   
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.padEnd(15, " ").split("")),
);
