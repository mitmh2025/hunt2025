import React from "react";
import LinkedImage from "../../components/LinkedImage";
import barcode from "./assets/barcode.png";
import chart from "./assets/chart.jpg";
import highlightedChart from "./assets/highlighted-chart.jpg";
import mosaicRib1 from "./assets/mosaic-rib-1.jpg";
import mosaicRib2 from "./assets/mosaic-rib-2.jpg";
import pearlChartedSpread from "./assets/pearl-charted-spread.jpg";
import pearlCharted from "./assets/pearl-charted.jpg";
import qrCode from "./assets/qrcode.png";
import streetChartedSpread from "./assets/street-charted-spread.jpg";
import streetCharted from "./assets/street-charted.jpg";
import { styled } from "styled-components";

const SizedImage = styled(LinkedImage)`
  display: block;
  margin: auto;
  width: 400px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is initially presented as a set of knitting instructions for
        a black-and-white striped scarf. If the scarf is knit (or charted), it
        looks like a 1D Code-128 barcode. If that barcode is scanned, it reads
        to a second URL on the Hunt website:{" "}
        <a href="/i_kid_ewe_knot" target="_blank" rel="noreferrer">
          https://two-pi-noir.agency/i_kid_ewe_knot
        </a>
        .
      </p>
      <p>
        This URL leads to a second set of instructions, this time for a 37x37
        black-and-white swatch. If this swatch is knit (or charted), it looks
        like a 2D QR code. If that QR code is scanned, it reads to a third URL
        on the Hunt website:{" "}
        <a href="/stitchy_situation" target="_blank" rel="noreferrer">
          https://two-pi-noir.agency/stitchy_situation
        </a>
        .
      </p>
      <p>
        This URL leads to a <em>third</em> set of instructions, still in
        black-and-white. Charting these instructions will not be useful to
        solvers, as they result in a ribbed finished object that will only
        result in an answer when allowed to scrunch into a ribbed shape. The
        complete knit object reads <code>PEARL</code> on the right side and{" "}
        <code>STREET</code> on the wrong side, for a final answer of{" "}
        <code>
          <strong>PEARL STREET</strong>
        </code>
        .
      </p>
      <p>
        This puzzle uses three increasingly complicated knitting colorwork
        methods to create black and white encodings in 1, then 2, then 3
        dimensions. The name of the puzzle is a hint to this progression -
        weirDo threaDeD DooDaDs.
      </p>
      <h3>Doodad 1 Solution</h3>
      <li>
        We didn’t tell you where the row breaks in this pattern were, but we
        hope it was intuitive. The instructions are for stockinette stitch, knit
        flat, one of the most basic knitting patterns. So every time you switch
        from knits to purls, that’s a new row. You’re knitting a scarf! A scarf
        with nearly 500 rows, so it’s probably best to map this one out.
      </li>
      <li>
        According to the pattern, you only switch colors on the right side of
        the work. So each section of white or black is at least two rows, one
        right-side row and one wrong side row, or a multiple of those two rows.
        Therefore, let’s consider two rows (i.e. k25p25) to be the smallest unit
        of section thickness, 1 kpRow.
      </li>
      <li>
        If you start to map out the thicknesses of the black and white stripes,
        you’ll notice they’re always 1, 2, 3, or 4 kpRows thick. As you draw the
        scarf described by the instructions, you’ll see a long, stripey scarf
        with alternating black and white stripes in those thicknesses.
      </li>
      <li>
        The scarf can be interpreted as a barcode. As the instruction specifies,
        if you’ve drawn the barcode out, you need to make sure the bar height is
        high enough- it needs to be at least 15% of the barcode length in order
        to be scannable. Your completed barcode should look like this:
      </li>
      <LinkedImage src={barcode} alt="A 1D barcode" />
      <p>
        This is a Code 128 barcode, which scans with any barcode reader
        (including smartphone app barcode readers) to give a url:
        <a href="/i_kid_ewe_knot" target="_blank" rel="noreferrer">
          https://two-pi-noir.agency/i_kid_ewe_knot
        </a>
      </p>
      <p>
        Follow that link, and you’ll find the instructions for{" "}
        <a href="/i_kid_ewe_knot" target="_blank" rel="noreferrer">
          Doodad 2
        </a>
        .
      </p>
      <h3>Doodad 2 Solution</h3>
      <p>
        Doodad 2 is a square potholder, knit using{" "}
        <a
          href="https://nimble-needles.com/tutorials/fair-isle-knitting-tutorial-for-beginners/"
          target="_blank"
          rel="noreferrer"
        >
          Fair Isle
        </a>{" "}
        knitting. Usually, this type of colorwork includes a chart, showing the
        pattern in two dimensions and the contrasting colors. But if we gave you
        the chart, you’d already have the answer, so you’ll need to create the
        chart for yourself.
      </p>
      <p>
        This is a stockinette stitch pattern, like most Fair Isle patterns,
        which means the knit sides are worked from the right side of the
        finished work from right to left, and the purl rows from left to right
        of the finished work.{" "}
      </p>
      <p>
        The first instruction is for the bottom row (as is normal for flat-knit
        pieces) and you work from bottom to top. (This does not actually matter,
        though, since the QR codes are made such that they can be read from any
        orientation—it will read correctly even if you snake down from the top.)
      </p>
      <p>
        When you draw out the pattern (snaking back and forth across the rows)
        and force it to a square aspect ratio, it should look like this:
      </p>
      <SizedImage src={qrCode} alt="A 2D barcode, or QR code" />
      <p>
        Which is, of course, a QR code. Scan it, and you get:
        <a href="/stitchy_situation">
          https://two-pi-noir.agency/stitchy_situation
        </a>{" "}
        where you’ll find instructions for Doodad 3.
      </p>
      <h3>Doodad 3 Solution</h3>
      <p>
        This part of the puzzle is best solved by actually knitting according to
        the instructions. After casting on and completing the setup row, savvy
        knitters will recognize that you’ve been given a modified{" "}
        <a
          href="https://www.knitpicks.com/learning-center/mosaic-knitting-slipping-stitches?srsltid=AfmBOopqQZrAgiaew6Vntt5XKjLPzWWaoLsqsK9Zjo9qfR-7kEFGf3Da"
          target="_blank"
          rel="noreferrer"
        >
          Mosaic knitting
        </a>{" "}
        pattern, in which the yarn color alternates every right side row, but
        slipped stitches from the row below provide the contrasting color.
      </p>
      <p>
        A few things should come clear after knitting (or mapping) the first few
        rows:
      </p>
      <ol>
        <li>
          Wrong-side rows are rest rows- you’re just repeating the same stitches
          you just made in the previous right-side row. This is typical for
          mosaic knitting.
        </li>
        <li>
          In addition to the mosaic colorwork, you’re developing a 2x2 rib
          stitch texture. Normally, this would be a basic pattern of k2 p2 k2
          p2, but because of the slipped stitches used in mosaic colorwork, any
          of the k or p stitches may be a slipped stitch instead. Still, as the
          rows start to stack up, a rib texture should emerge.
        </li>
        <li>
          When slipping, the yarn is always held to the purl side of that rib
          stitch. This helps the readability of the final pattern.
        </li>
      </ol>
      <p>
        If you’re mapping out the pattern’s stitch colors, you’ll be developing
        something that looks like this:
      </p>
      <LinkedImage
        src={chart}
        alt="A knitting chart with seemingly random blocks of black and white"
      />
      <p>
        …which isn’t very useful yet. Here’s that pattern with the rib stitch
        overlaid. From the right side, the purl parts of the rib are highlighted
        in red:
      </p>
      <LinkedImage
        src={highlightedChart}
        alt="A knitting chart with seemingly random blocks of black and white. Every other block of two columns is highlighted in red."
      />
      <p>
        Is anything jumping out at you? This is actually two patterns,
        interlaced. Here they are teased apart. The right-side knits, in white
        above:
      </p>
      <LinkedImage
        src={pearlChartedSpread}
        alt="A knitting chart in black and white. It kind of reads PEARL if all the letters had been chopped in half and spread out."
      />
      <p>
        And the right-side purls (which are the wrong-side knits), in red above:
      </p>
      <LinkedImage
        src={streetChartedSpread}
        alt="A knitting chart in black and white. It kind of reads STREET if all the letters had been written backwards, then chopped in half and spread out."
      />
      <p>Let’s collapse those, removing the empty spaces:</p>
      <LinkedImage
        src={pearlCharted}
        alt="A knitting chart in black and white, reading PEARL"
      />
      <LinkedImage
        src={streetCharted}
        alt="A knitting chart in black and white, reading STREET with all its letters written backwards"
      />
      <p>
        So the piece spells out <code>PEArL</code> on the right side, and{" "}
        <code>STrEET</code> on the wrong side (when you flip it over), giving
        the final answer{" "}
        <code>
          <strong>PEARL STREET</strong>
        </code>
        .
      </p>
      <p>
        Of course, if you actually knit the piece, you’ll have a much easier
        time. You’ll see the rib stitch naturally scrunch up in 3 dimensions
        (especially when you follow the instruction to stretch the work
        vertically). No purl stitches are visible from either side. The yarn
        held to the purl side while slipping disappears. Your final product
        should look like this, with <code>PEArL</code> and <code>STrEET</code>{" "}
        appearing plain as day on either side:
      </p>
      <LinkedImage src={mosaicRib1} alt="A knitting rectangle, reading PEARL" />
      <LinkedImage
        src={mosaicRib2}
        alt="A knitting rectangle, reading STREET"
      />
    </>
  );
};

export default Solution;
