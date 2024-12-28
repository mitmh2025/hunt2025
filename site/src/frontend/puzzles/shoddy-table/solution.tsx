import React from "react";
import { styled } from "styled-components";
import Spoiler from "../../components/Spoiler";
import { PuzzleAnswer } from "../../components/StyledUI";
import step1 from "./assets/step1.png";

const PreCode = styled.code`
  background-color: white;
  display: block;
  white-space: pre;
  max-width: 100%;
  overflow-x: scroll;
`;

const Solution = () => {
  const verifypuzzle_py_contents = `import openpyxl
from PIL import Image
import parse

wb = openpyxl.load_workbook(filename = '10000sheets.xlsx')

######################################################################
# step 1: image from visible numbers
######################################################################
img = Image.new('L', (100,100))
for i in range(10000):
    sheet = wb["%04d" % i]
    img.putpixel( (i%100,i//100), sheet.cell(row = i//100 + 1, column = i%100 + 1).value )
img.save("step1.png")

######################################################################
# step 2: evaluate SUM(A01:Z26) on each sheet, convert to letters
######################################################################
pieces = []
bigs = ""

for i in range(10000):
    sheet = wb["%04d" % i]
    s = 0
    for row in sheet.iter_rows(min_row = 1, max_row = 26, max_col = 26):
        for cell in row:
            if cell.value is not None and isinstance(cell.value, int):
                s += cell.value
    bigs += chr(s//100 + 64) + chr(s%100 + 64)

# put punctuation/digits back in the equations
replacements = {}
for line in open("substitutions.txt"):
    line = line.strip()
    replacements[line[2:]] = line[0]

for a in replacements:
    bigs = bigs.replace(a, replacements[a])

formulas = bigs.split("=")[1:]  # there's an empty string one at the start

######################################################################
# step 3: evaluate each formula
######################################################################
STEP3_EXPECTED = ["C","O","N","D","I","T","I","O","N","A","L","F","O","R","M","A","T","T","I","N","G",
                  "F","I","L","L","C","O","L","O","R","O","N","S","H","E","E","T","S",649,1566,2891,
                  3776,4230,5268,6338,6944,7500,8827,9598]

s3 = []
for f in formulas:
    # see appendix for the formula parser
    node = parse.parse(f, 0, len(f)) 
    val = node.eval(wb)
    s3.append(val)

assert len(s3) == len(STEP3_EXPECTED)
for i in range(len(s3)):
    assert s3[i] == STEP3_EXPECTED[i]

######################################################################
# step 4: check conditional formatting
######################################################################
dxfLookup = {}
dsl = wb._differential_styles

for idx in range(dsl.count):
    st = dsl[idx]   
    val = st.fill.fgColor.rgb
    v1 = int(val[2:4], 16)
    v2 = int(val[4:6], 16)
    v3 = int(val[6:8], 16)
    dxfLookup[idx] = v1

result = ""
for sn in STEP3_EXPECTED[-11:]:  # the last eleven values are the sheet numbers
    sheet = wb["%04d" % sn]
    for cf in sheet.conditional_formatting:
        for rr in cf.rules:
            dxfId = rr.dxfId
            result += chr(dxfLookup[dxfId] + 64)

print("Final result: %s" % result)
`;
  const parse_py_contents = `import math

def ltoc(c):
    c = c.upper()
    if len(c) == 1:
        return ord(c) - 64
    elif len(c) == 2:
        if c[0] == 'A': return 26 + ord(c[1]) - 64
        elif c[0] == 'B': return 52 + ord(c[1]) - 64
        elif c[0] == 'C': return 78 + ord(c[1]) - 64
        else: raise Exception("got ltoc with %s" % c)
    else:
        raise Exception("got ltoc with %s" % c)

def parse_cell(cellname):
    if cellname[1] in "0123456789":
        return (ltoc(cellname[0]), int(cellname[1:]))
    else:
        return (ltoc(cellname[0:2]), int(cellname[2:]))

class N(object):
    pass

class O(N):
    def __init__(self, op, *args):
        assert(len(args) == 2)
        self.op = op
        self.args = list(args)
    def __str__(self):
        return "Op(%s,%s,%s)" % (self.op, self.args[0], self.args[1])
    def __repr__(self):
        return str(self)
    def eval(self, wb):
        a = int(self.args[0].eval(wb))
        b = int(self.args[1].eval(wb))
        if self.op == '+':
            return a+b
        if self.op == '*':
            return a*b
        if self.op == '^':
            return a**b
        raise Exception("unknown op '%s'" % self.op)

class FC(N):
    def __init__(self, fn, *args):
        self.fn = fn
        self.args = args
    def __str__(self):
        return "Fn(%s,%s)" % (self.fn, ",".join(map(str, self.args)))
    def __repr__(self):
        return str(self)
    def eval(self, wb):
        if self.fn == "MID":
            assert len(self.args) == 3
            a = str(self.args[0].eval(wb))
            b = int(self.args[1].eval(wb))
            c = int(self.args[2].eval(wb))
            return a[b-1:b+c-1]
        elif self.fn == "CHAR":
            assert len(self.args) == 1
            a = int(self.args[0].eval(wb))
            return chr(a)
        elif self.fn == "EXP":
            assert len(self.args) == 1
            a = float(self.args[0].eval(wb))
            return math.exp(a)
        elif self.fn == "FLOOR":
            assert len(self.args) == 2
            a = float(self.args[0].eval(wb))
            b = float(self.args[1].eval(wb))
            assert abs(b - 1) < 0.00001
            return math.floor(a)
        elif self.fn == "CEILING":
            assert len(self.args) == 2
            a = float(self.args[0].eval(wb))
            b = float(self.args[1].eval(wb))
            assert abs(b - 1) < 0.00001
            return math.ceil(a)
        elif self.fn == "PI":
            assert len(self.args) == 0
            return math.pi
        raise Exception("unknown fn '%s'" % self.fn)

class CR(N):
    def __init__(self, s, c, r):
        self.s = s
        self.c = c
        self.r = r
    def __str__(self):
        return "'%04d'!%d %d"%(self.s,self.c,self.r)
    def __repr__(self):
        return str(self)
    def eval(self, wb):
        return wb['%04d' % self.s].cell(row = self.r, column = self.c).value

def parse(s, a, b):
    assert a < b

    if s[a] == '(' and s[b-1] == ')':
        # parenthesized expression; look for binary op
        pc = 0
        for idx in range(a+1, b-1):
            if s[idx] == '(': pc += 1
            elif s[idx] == ')': pc -= 1

            if pc == 0 and s[idx] in "+-*/^&":
                args = [ (a+1,idx), (idx+1, b-1) ]
                return O(s[idx], *list(map(lambda z: parse(s, z[0], z[1]), args)))

    else:
        # function call OR cell ref OR number OR string
        fp = s.find('(', a)
        if fp != -1 and fp < b:
            if s[a] in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
                fn = s[a:fp]
                assert s[b-1] == ')'

                last = fp+1
                pc = 0
                args = []
                for idx in range(fp+1, b-1):
                    if s[idx] == ',' and pc == 0:
                        args.append( (last,idx) )
                        last = idx + 1
                    elif s[idx] == '(': pc += 1
                    elif s[idx] == ')': pc -= 1
                if b-1 > last:
                    args.append( (last, b-1) )
                return FC(fn, *list(map(lambda z: parse(s, z[0], z[1]), args)))
        else:
            ex = s.find('!',a)
            sn = int(s[a+1:ex-1])
            cr = s[ex+1:b]
            c, r = parse_cell(cr)
            return CR(sn, c, r)
`;
  const substitutions_txt_contents = `=,EQUALS
(,LEFTPAREN
),RIGHTPAREN
<,LESSTHAN
>,GREATERTHAN
!,EXCLAMATIONMARK
@,ATSIGN
#,POUND
$,DOLLARSIGN
%,PERCENT
^,CARET
&,AMPERSAND
*,ASTERISK
-,HYPHEN
_,UNDERSCORE
+,PLUS
[,LEFTBRACKET
],RIGHTBRACKET
{,LEFTCURLYBRACE
},RIGHTCURLYBRACE
:,COLON
;,SEMICOLON
',APOSTROPHE
",QUOTATIONMARK
,,COMMA
.,PERIOD
/,FORWARDSLASH
?,QUESTIONMARK
\\,BACKSLASH
|,VERTICALBAR
~,TILDE
\`,BACKTICK
1,ONE
2,TWO
3,THREE
4,FOUR
5,FIVE
6,SIX
7,SEVEN
8,EIGHT
9,NINE
0,ZERO
`;

  const indirect_code = `=INDIRECT("'" & TEXT(((ROW()-1) * 100 + COLUMN() - 1), "0000") & "'!R" & ROW() & "C" & COLUMN(), FALSE)`;

  return (
    <>
      <p>
        As indicated, this puzzle does indeed involve an Excel file with 10000
        worksheets! The sheets are named “0000”, “0001”, …, all the way up to
        “9999”, and each is 100 rows by 100 columns.
      </p>

      <h4>Step 1</h4>
      <p>
        As hinted by the flavortext, start by looking at what you can see (the
        visible data). There’s only one visible number on each sheet. In sheet
        0000, the number is in cell A1, in sheet 0001, the number is in cell A2,
        and so on, looping around to cell B1 at sheet 0100. The numbers all lie
        between 0 and 255. This suggests that combining the data in all these
        cells will give a 100x100 grayscale image:
      </p>

      <img
        src={step1}
        alt="Grayscale with light background and three rows of dark characters. The three rows read: =SUM, (A01:, and Z26)"
      />

      <p>
        (Note: it is possible to generate this image directly in Excel by using
        the INDIRECT formula and then applying a conditional formatting gradient
        to the numbers you get. You can gather the data with something like{" "}
        <code>{indirect_code}</code>
        .)
      </p>

      <h4>Step 2</h4>
      <p>
        This is an Excel formula that sums the cells between A01 and Z26. If you
        apply this formula to each sheet, the first few sums are 517, 2101,
        1219, 308, 118, 1205, 620, 1601, 1805, 1412, …
      </p>
      <p>
        All of the numbers are three or four digits long. As hinted by the
        formula, we can convert each number to two letters using the A=1, B=2,
        …, Z=26 encoding (padding with leading zeros where necessary). The first
        few bigrams are: EQ, UA, LS, CH, AR, LE, FT, PA, RE, NL, EF, …
      </p>
      <p>
        Note that this string starts with the word “EQUALS”, which is how a
        formula is entered into Excel. This hints that the string consists of
        several formulas, except that all of the punctuation has been spelled
        out in words. The 20000-letter string can therefore be converted into
        roughly 50 different formulas, each starting with an equals sign. (The{" "}
        <code>SUBSTITUTE</code> function in Excel can be used for this purpose.)
      </p>

      <h4>Step 3</h4>
      <p>
        Evaluate the formulas! The first 38 give one letter apiece, and the last
        11 give numbers, spelling out the message:
      </p>

      <p>
        <code>
          CONDITIONAL FORMATTING FILL COLOR ON SHEETS 649 1566 2891 3776 4230
          5268 6338 6944 7500 8827 9598
        </code>
      </p>

      <h4>Step 4</h4>
      <p>
        Look at the conditional formatting on each of the indicated sheets. The
        rule that indicates whether the formatting applies is FALSE(), so the
        formatting isn’t visible. However, the fill color for each has equal
        R/G/B components, and the values are all quite small. Interpret these
        one more time as A = 1, Z = 26:
      </p>

      <table>
        <thead>
          <tr>
            <th>Sheet</th>
            <th>Fill Color (Hex)</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>649</td>
            <td>080808</td>
            <td>H</td>
          </tr>
          <tr>
            <td>1566</td>
            <td>0D0D0D</td>
            <td>M</td>
          </tr>
          <tr>
            <td>2891</td>
            <td>131313</td>
            <td>S</td>
          </tr>
          <tr>
            <td>3776</td>
            <td>010101</td>
            <td>A</td>
          </tr>
          <tr>
            <td>4230</td>
            <td>0C0C0C</td>
            <td>L</td>
          </tr>
          <tr>
            <td>5268</td>
            <td>030303</td>
            <td>C</td>
          </tr>
          <tr>
            <td>6338</td>
            <td>010101</td>
            <td>A</td>
          </tr>
          <tr>
            <td>6944</td>
            <td>131313</td>
            <td>S</td>
          </tr>
          <tr>
            <td>7500</td>
            <td>141414</td>
            <td>T</td>
          </tr>
          <tr>
            <td>8827</td>
            <td>0F0F0F</td>
            <td>O</td>
          </tr>
          <tr>
            <td>9598</td>
            <td>0E0E0E</td>
            <td>N</td>
          </tr>
        </tbody>
      </table>

      <p>
        The answer is <PuzzleAnswer>HMS ALCASTON</PuzzleAnswer>.
      </p>

      <h3>Author notes</h3>
      <p>
        During testing for the Stakeout meta, a number of fake puzzle titles
        were created to simulate the existence of an entire round. For the
        answer <Spoiler>PIVOT TABLE</Spoiler> (hover to view spoiler), I came up
        with the title “The 10000-Sheet Excel File” as a haha-throwaway-joke
        reference to the{" "}
        <a href="https://puzzles.mit.edu/2018/full/puzzle/the_10000_puzzle_tesseract.html">
          previous installments
        </a>{" "}
        of the{" "}
        <a href="https://puzzles.mit.edu/2024/mythstoryhunt.world/puzzles/the-10000-commit-git-repository">
          10000-puzzle
        </a>{" "}
        series… until it wasn’t a throwaway anymore.
      </p>

      <p>In the course of implementing this puzzle, I ended up:</p>
      <ul>
        <li>
          diving into the ECMAScript specs in order to create a bunch of
          spreadsheet XML via direct string manipulation
        </li>
        <li>
          creating a randomizer to generate formulas with several layers of
          nested calls (and then needed to run that on loop until the length of
          all the formulas was exactly 20000 letters)
        </li>
        <li>
          implementing a (thankfully limited subset of) Excel formulas in order
          to verify the file programmatically
        </li>
        <li>
          crashing my computer several times trying to load the full file in
          LibreOffice due to lack of RAM.
        </li>
      </ul>

      <h3>Appendix</h3>
      <p>
        For verification purposes, the following reference implementation is
        provided that can pull the data from the spreadsheet file, parse and
        execute the formulas, and verify that the conditional formatting
        extracts to the correct values.
      </p>

      <p>
        Place all of the files in the same directory along with the
        10000sheets.xlsx file, and make sure that you have <code>pillow</code>{" "}
        and <code>openpyxl</code> installed The program will take some time to
        run (roughly 2.5 minutes for the author).
      </p>

      <p>
        <code>verifypuzzle.py</code>
      </p>
      <PreCode>{verifypuzzle_py_contents}</PreCode>

      <p>
        <code>parse.py</code>
      </p>
      <PreCode>{parse_py_contents}</PreCode>

      <p>
        <code>substitutions.txt</code>
      </p>
      <PreCode>{substitutions_txt_contents}</PreCode>
    </>
  );
};

export default Solution;
