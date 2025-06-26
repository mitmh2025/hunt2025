import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, { calculateNumberLabels } from "../../components/Crossword";
import { AuthorsNote } from "../../components/PuzzleLayout";

export const LABELS = calculateNumberLabels(
  `
# # ## ## # 
## # #   # #
  #   #     
#    #      
#    ###    
#  # #   #  
##     #  # 
# #   # #   
#   # # #  #
 #    #     
#      #    
#   #   #   
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.padEnd(12, " ").split("")),
);

// | means a bar to the right of this cell
export const BARS_RIGHT = `
   |   |    
    |       
||   |    | 
   ||       
     |      
    |       
      |     
     |      
      ||   
|    |   || 
      |     
   |   |    
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(12, " ").split(""));

// _ means a bar below this cell
export const BARS_DOWN = `
 _ _  _  _ _
      _     
            
_    _ _    
_  _     _  
 _        _ 
  _     _  _
    _ _    _
            
     _      
_ _  _  _ _ 

`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(12, " ").split(""));

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const CluesWrapper = styled.div`
  flex: 0 0 50%;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNote>
        This puzzle was written and tested but held in reserve in case we needed
        to make a last-minute swap, but was not released during Mystery Hunt. As
        such, it has a placeholder answer and will not grant you a key for
        solving.
      </AuthorsNote>
      <StyledCrossword
        labels={LABELS}
        labelsForEmptyCopy={LABELS}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (BARS_RIGHT?.[row]?.[column] === "|" || column === 11) {
            styles.borderRightWidth = "3px";
          }
          if (BARS_DOWN?.[row]?.[column] === "_" || row === 11) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          return styles;
        }}
      />
      <FlexWrapper>
        <CluesWrapper>
          <h3>Arscos</h3>
          <div>1. Tihs awnesr’s psiootin in the pzluze, hrozlitolnay</div>
          <div>3. A yunog bvnioe amnail</div>
          <div>6. Cpaoruntret to the rdiuas</div>
          <div>8. Bzriaalin dncae sltye</div>
          <div>11. A poeird of tmie atefr the cetiossan of cfnoclit</div>
          <div>14. Ststoorhp Tnreur</div>
          <div>15. Cnocneotr beweten sihn and foot</div>
          <div>16. Tinahald’s fremor allaeppotin</div>
          <div>17. Ctiy wrhee adndrios mhigt bmocee hmaun</div>
          <div>18. Sngalliy, a dmenad to sltete a dbet (2 wrdos)</div>
          <div>20. As a pceruaiotn (2 wdors)</div>
          <div>22. Smtoeinhg an ifulneecnr mhigt be cnhisag</div>
          <div>24. Sencice fiocitn ahuotr who wtroe for Satr Terk</div>
          <div>26. Urnedrtwier or grauaontr</div>
          <div>28. Wulod-be dcespriotr of Ayra Sratk (2 wdors)</div>
          <div>30. Spratmnhoe poohtarpgh, smmteeios</div>
          <div>32. “Fidary Nghit ______” (flbotaol damra)</div>
          <div>
            34. Waht an Itsnaargm rdano mhigt be wehn tehy lkie ftory bcaeh
            ptcireus in tehre mniuets
          </div>
          <div>37. Perdinesaitl rgiht to ordverie Csgonres</div>
          <div>39. Lkie cyrtasl and unlkie mud</div>
          <div>40. Sothnmeig a steakbreador mgiht gnrid dwon</div>
          <div>
            41. Entsnoglthiiiuc rogien in the Gertaer Caauucss Mnnuiaots
          </div>
          <div>42. Fresot flilres</div>
          <div>43. Crenay, Gerknufal, and Siepelgamn</div>
          <div>44. Tehy daebbltay jstufiy the mneas</div>
          <div>45. Spmsoin sbinlig</div>
        </CluesWrapper>
        <CluesWrapper>
          <h3>Dwon</h3>
          <div>1. Pzuleitr Pzrie wiinnng neovl by Adrenw Saen Gerer</div>
          <div>2. Waht lvoe may be, ptrauicarlly scnoed-hnad</div>
          <div>
            3. Vtieary of achtaté taht otfen sreevd as oicifafl cvoer for tshoe
            ivonveld in episognae
          </div>
          <div>4. Stohuren Cialf. law eonfcerenmt ooigatazrinn</div>
          <div>5. Sapsnih wrod for a cyhrsnaemhtum or mrailogd</div>
          <div>6. Dcesirtpor for a mermoaiilezd siloder in Ainrlogtn</div>
          <div>7. Gertaset pranetr?</div>
          <div>9. Spawmy Liioasuna bdoy of wtear</div>
          <div>10. Ilfneutinal durm baerk form a 1699 snog by The Wnitsnos</div>
          <div>
            12. Mmeahattcail fcntoiun uesd in tteelmmcciioounans taht can be
            nezrmolaid or unnezrmolaid
          </div>
          <div>13. Eampzithe (wtih)</div>
          <div>15. Tloiieevsn annneta taht riceeevs Bcirtmos?</div>
          <div>19. Wluod rtaehr</div>
          <div>21. Mlecoleus wchih may tgeirgr inumme rseeopsns</div>
          <div>22. Mntoe _____ swinadch</div>
          <div>23. Bralebl bsoretos, for emaxlpe</div>
          <div>
            25. Mnreilas woshe mkoneir llteialry tantsealrs as “egg snoets”
          </div>
          <div>27. Crsoae-gariend meatphormic rcok</div>
          <div>29. Oepn-edend sruevy otiopn</div>
          <div>31. Esssfflortnees</div>
          <div>33. Psssoes</div>
          <div>35. Sacbblre nsseectiy</div>
          <div>36. Lnog, wnniidg, qestunabioly paluislbe srtoy</div>
          <div>38. Wkrolpcae sftaey acgney (averbbaiiton)</div>
        </CluesWrapper>
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
