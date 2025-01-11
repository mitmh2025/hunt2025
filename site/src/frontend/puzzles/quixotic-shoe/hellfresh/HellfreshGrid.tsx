import React, { type CSSProperties } from "react";
import Crossword, {
  calculateNumberLabels,
} from "../../../components/Crossword";

// | means a bar to the right of the cell.
const BARS_RIGHT = `
   |    
    |   
||      
        
        
     || 
  |     
   |    
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(8, " ").split(""));

// _ means a bar below the cell.
const BARS_DOWN = `
 _    _ 
      _ 
  __    
_ _    _
    __   
 _      
 _    _ 
        
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(8, " ").split(""));

// # means the cell has a number.
const LABELS = calculateNumberLabels(
  `
# #### #
##   #  
  #   # 
#  #    
# #    #
#   ##  
#  #    
#   #   
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.padEnd(8, " ").split("")),
);

export const HellfreshGrid = ({ fill }: { fill?: string[][] }) => (
  <Crossword
    labels={LABELS}
    fill={fill}
    getAdditionalCellStyles={({ row, column }) => {
      const styles: CSSProperties = {};
      if (column === 0) {
        styles.borderLeft = "3px solid black";
      }
      if (column === 7 || BARS_RIGHT[row]?.[column] === "|") {
        styles.borderRight = "3px solid black";
      }
      if (row === 0) {
        styles.borderTop = "3px solid black";
      }
      if (row === 7 || BARS_DOWN[row]?.[column] === "_") {
        styles.borderBottom = "3px solid black";
      }
      return styles;
    }}
  />
);
