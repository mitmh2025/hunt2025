import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import image1 from "./assets/image1.svg";
import image2 from "./assets/image2.svg";
import image3 from "./assets/image3.svg";
import image4 from "./assets/image4.svg";
import image5 from "./assets/image5.svg";

const GreenSpan = styled.span`
  color: #6aa84f;
`;

const PrintImage = styled(LinkedImage)<{ $width: number }>`
  display: block;
  width: ${({ $width }) => $width}px;
  @media print {
    page-break-after: always;
  }
`;

const DAY_1_LINK =
  "https://gmpuzzles.com/penpa-edit/?m=solve&p=vVZZb+M2EH73rwj4TC/Ew7re0mzSl216JMViIRiBkmg3xtpWKtuNqyD723c4I9tDUkVRFKgNj6nPM98c5NDz1OxlDm+bSJNIBe9ZZt5pmVr1blawlzRK4ycZ3reL7bIpz97Xf50peb7bPrVdeSal/PnqSn6ul5tmUiXzSSW0kMNn/k08tKv7hfhWiebxS7NvF4CL+eS1/6187e/Kav4m+99Py/y0vClfQV6Xr0IlhSgr8SKklkKJOQilImQWIsY4xArI8IBYh2y4DlrNmI6NmNPEIZDQUSdPHZIwpEArhugkd4jhCGbBdRRGyLxrgzzMlzY65DHIzLLQFiNkmepZFlrN0Iozp2E1dBpWQ6eYqaeDzKw+OkcexazyyFeOufMIC4yZR0g1ZDomwXgYj0kwHk8HmVmEhqrKrRRGyHwZOi2eVZipUZgp96UwLw9B76xixoSnxUSnzphwdwztqYdEedEuewhWjFvNMAu2F4b2nSNpVOcUzxhnTrGGHoJZ8EzptPBM07BPTR7tBZ0Wzkzd5OlEudNp4THTaWF5WTobzLtNsM5cR4W7Y6PTYulssKpaOhseD1aV+6I+ZfWxtO+eTsQTnQQbdbel+4fdG5Yqz5EcvXNfOepwX1RnHiH1Kdehqh554AJWeA1/QnmFUqO8hVta9gble5QJyhnKD6hzifIjyguUFmWKOpm75yeTyv3FTHUKQWgLfrWB1TTDZwM/ADKTJKeadJwG6Cidk9EUEJvJqU0l8Dj1BGUKEHyBBUhnQmYZmhH3YJYlcpoWgxFIlZ/W0xQeiAPkgQaINP5/+v4zF3siCwALc4iGKNnaRVZASkdW+Lk4EjvqHKnHYhyolQJUBaSOhzgZAlrHIhyk5w38GaP/IRUFJQGmDBy4GsL0wH0MvmmvgkSVgcL67p0uMPG3Gxxudt3n+qGBEeEShoWz67Zb1Ut4utk9tl930fNF262bjj03623nrC/a1XO7WWwbN2mITbu82wzMJc4pErH1bnUP5hxatu3zcrH29RZf1m3XjP7kQDfXjOjft91jwP5SL5cesPljV0PAHHpYdA9LH9p2C++57rr2xUNW9fbJA+7rLYxqm6fFs88EBfID2NZ+iPXXOvC2OuX8NhF7gZ/KwDiYuTGuKPtz2f9IV+hh6pP9rzDH/VSKDW6McMNcJeCawZsBbxwNy8vT8iP+7lYXw42UwPp6WMPyEyypNncfCPmlrPpbN0zK/ge0dkuxav+EcNEMn2n8BMDt3X4Ah7AO7HAjnVO8pD0SrjmF65YUrluNhOuy+M/h8mk5CLiYv9FOJP9qjP4f7vL90G1tN9pwAI/0HKCjvTXgUXsBHjWScxj3EqAj7QRo2FEAxU0FYNRXgP1NaznWsLtcVGGDOVdRjzlXvM2q+QRX3wE=";
const DAY_2_LINK =
  "https://gmpuzzles.com/penpa-edit/?m=solve&p=vVbfb9tGDH73XxHc87m4n5KltyzN9tJl3ZKhKAQjkBO1EWpHmWyvmYL0by/Jk23qpA0YMMyCad5n8iN5Ot7dQ/UsM3icklZJDY9P7RsjE6ff+Ix9wMLTV/XPTb1bV/nZ2/KvMyPP97uHps3PpJS/XMlP5XpbzQq9nBXCCNl/l9/EXbNZ1eJbIar7z9VzUwMulrOX7rf8pbvNi+Wr7H4/qYuTep2/gLzKX4RRmcgLoQSkKrRYArP1MZIoRDxH0pEN8XCbxQIRx5CMeLhXZhGxJ8SaOJY1BhEo+oS4EZLEiIsztJ54OJJqRDRHRl4LyoczL4iHZ5hRpYzHKcqQ8ThFzKxSp8iLMTtNsbiNpgxZLKcpOptVF2rnNoaYOY+leeaxwlse2MRz6DwhvK6EeHishHgGyKjSBdnwnMPaGNjQ+uFIWC0DhKJznozmmUX3YX5YFV6TDfPyOq7da6qUI2Edch4Xr0zvRrFc3Ds+JYTbhDXGeUbrB7aKKOdExSshUTQbzCsJq+4YC1pcU6N/JPkjSUPyBvYB2VmSb0kqkp7kO7K5JPmB5AVJRzIhmxR3ktmswD1sbjIIaVJppElAmy88jhP4w0uzkEHOjSMbtAAb7WxwmgPirZx78M7I3JLMAAqsMHDkhG6wdx65e7cUTFMwIieUYHDQ5ykQBA6QBxogMj4dxV8osAd+BfQaCuvpSGqmY25ahXICMUhz5AZ2q6m6qTSP7NoaUCxLto8U+BgCVmoYDCSPhxFT/PnnerQFHMNqjxX4YZQ+enhlcbUwW3ECIMMZd3zwhLret5/KuwrOoks4lc6umnZTrmF0vb9vvuxH44umfaxaNq4edy16XzSbp2Zb7yo80sS2Wd9ue+acDkRJ2ON+swJ3Dq2b5mldPw7t6s+PTVtN/oUgHqAT9qumvY/Yv5br9QDY/rEvIWEO3dXt3XoI7dp6MC7btvk6QDbl7mEArModXAm2D/XTkAkmaJjArhymWH4po2ibU82vM/Es6FtYuHakeF/I8u5cdj+FveNwvZDdr3Bh+DkXW3oxAm8NhYC9hTYI2ngMqJcn9QP9j9pFvzEp0K96HdSPoIa5uX0XkPd50d3grUV2P5A3qmLT/AnpkhuNwz0HAHxN2/2qh/vEDvywNZ2HjIP9RML2lDCqIWHUJhLGOv6ThA8XsyjhbPka3oX6Vze2/2FTf+77rWknWw7gia4DdLK7enzUYICPWgkDjrsJ0ImGAjTuKYDGbQXgqLMA+5vmQta4vzCruMUw1KjLMBRvtGI5I+07";
const DAY_3_LINK =
  "https://gmpuzzles.com/penpa-edit/?m=solve&p=vVbfb9tGDH73XxHc87nQ/dKvty7N9tJl65qhKAQjkBO1ESpbmWyvmYL0by/Jk23qpA0YMMyCaeoz+ZG8O97dQ/UkM3hsJE0kFTwuMa+0jK165TL2AQtH32h4bup9U+UXb8q/Lox8fdg/tF1+IaX85Vp+KptdtSjUalEILeTwXX0Td+1mXYtvhajuP1dPbQ24WC2e+9/y5/42L1Yvsv/9rKZn9X3+DPI6fxY6SkVeiEhAqkKJFTArhYjjiEbEMsTY0CuOEIHUzogJveIEEcURij6yyRDZCamPSEo2PJ/MhTwZMRuOkBfjMSoOMjSKbJiXURSdxTKa6uI8msaH5WwsVcpGw1iKxZktMXPEEfMIoXEeITTOPOeEauc2CdXOoyfhGJqUcuZeKcUa2VAVPJYfQzYaNiIbNvLWrx+OqLAu69cPR3Q4X1ZTzqwKa8IZtC6s3TryYjlbvw65TUy1c56Y8uF1+bXKq/BrlTOnNKecJyUbjmTEzHkymkFm4/xosOhusjKdCsfH+ZXJmN1kHTpLCBtD51cmj27DulwSzo5LKGcey68xzpOF+cQRRR8hFJ1VGkfEfMoZNiFFW9FHkj+S1CRvYKeSvSH5hmRE0pF8SzZXJD+QvCRpScZkk+Bet1gUuMsudQYhdQL56xi0ZerwPYY/nNSp9HKpLdmgBdgoa7zTEhBn5NKBd0bmhmQGkGeFF0tO6Aa7+4l7cEvANAEjckIJBkd9mQCB5wB5pAEi7ZJJ/DQCe+CPgF5BYQMdScV0zE1FvhxPDFKfuIHdKKpuLs0TuzIaFMOSHSJ5PoaAVTQOBpLHw4gJ/vxzPcoAjmGVwwrcOMoQ3U9ZWC2MVpgASH8Knx48Q98fuk/lXQWn5RWcmxfXbbcpG3h7f7hvvxwm75dtt6069l5t9x16X7abx3ZX7ys8dMWubW53A3NOR7YkbHvYrMGdQ03bPjb1dmxXf962XTX7F4J4xM/Yr9vuPmD/WjbNCNj9cSghYQ7d1d1dM4b2XT16L7uu/TpCNuX+YQSsyz1cWnYP9eOYCQZonMC+HKdYfimDaJtzzS8L8SToWxi4GCV4o8ny/p3sf/I71/ECJPt3cKX5ORc7mhiB95pCwN5CGwRtRRrUq7P6gf5H7XLYqiLQrwcd1I+g+rG5feuRX/Oiv8F7lex/IG9Uxab9E9IlN3r3NzEAcJp2h/UAD4kd+WFreu0z9vYzCZtzwqj6hFGbSRjr+E8SPl4dg4Sz1Yufi+hf3Sn/h039aei3tpttOYBnug7Q2e4a8EmDAT5pJQw47SZAZxoK0LCnAJq2FYCTzgLsb5oLWcP+wqzCFsNQky7DULzRitWCtO8=";
const DAY_4_LINK =
  "https://gmpuzzles.com/penpa-edit/?m=solve&p=vVbfb9s2EH73XxHwmS74U7L01qXZXrpsXTIUhWAEcqI2QmWrk+w1U5D+7T0eZftEagMGDLPg8/Hz3Xd3JI/iY/XEM3iM4FpwCY9N9SvFEyNf2Yx8wMLiV4zPbb1vqvziTfnXheGvD/vHtssvOOe/XPOPZdNXi0KuFwVTjI/f9Td23243NftWsOrhU/XU1oCz9eJ5+C1/Hu7yYv3Ch9/P6uqs3uTPIK/zZ6aEZXnBJINUQa6BWSQOsRRJHaIpkoVeUjgEUjsj0iE94+qEqNBLY3TKrDE6RQwyUyRBhPIkyGwoosPoSRQrWYWVJlFdK7ShXllUV4axaO0ZxiLMWuIckgy1DGNphcwkllbh6miF80NiaYPRKbNBL4pYZJ4gOGOkCm0jnhS9aKwUbWiGqYm8wv2j06j2FUanNqtwvXQWro4RYT5GhPkYv1cFRXCeSXTjdybl8TuTRDcq4tFoQ738XiWrY3S4W4yNEL9XaawE55DyJGHHGT8/NLrfmbSuDHnIjNmoLivDWFbibiHM1u9MUrv1PUi9TLiC1iAzjWUww4lXxJxGzNEes36PUSQLeRIRnj+JCM+EREz3KhyBEg/CDyh/RKlQ3sI5yQeN8g1KgdKifIs2Vyjfo7xEaVAmaJO6k3axKNwZv1QZhFQpzIxKQFuurBsn8IflasW9XCqDNs4CbKTR3mkJiNV8acE7Q3ONMgPIs8LAoJNzg3fLiXt0S8E0BSN0chIMjvoyBQLPAfJIA0TKplH8lQB74BdAL6GwkQ6lJLrLTQpfjicGqU7cwK4lVjeX5oldagWKJsmOkTwfQcBKTIOBpPFcxNT9/HM9UgPuwkrrKrDTKGN0v2RhtTBbYQIg/R3g9Lg3+M2h+1jeV/CuvoK39sV1223LBkY3h4f28yEaX7bdrurIuNrtO+d92W6/tH29r9wrn/Vtc9ePzDleGDhiu8N2A+4Uatr2S1Pvpnb1p13bVbN/OdBdMGbsN233ELB/LZtmAvR/HEpImEL3dXffTKF9V0/GZde1XyfIttw/ToBNuYcrU/9Yf5kywQRNE9iX0xTLz2UQbXuu+WXBnhh+Cw3XstTdp7J8eMeHn/z5crx+8eEdXKh+zlmPC8PcrapgcLbgAYFHmgL16qy+x/+ddjkeeQL061EH9QOofm7u3nrk17wYbt2tjg8/oLdT2bb9E9JFNxz7eyAAbpn6w2aEx8SO/HA0vfYZe/uZhPU5Yaf6hJ02k7Cr4z9J+HhxDRLO1i9+LcS/utH+D4f609hvbTfbcgDPdB2gs9014lGDAR61kgsYdxOgMw0FaNhTAMVtBWDUWYD9TXM51rC/XFZhi7lQUZe5ULTRivUCte8=";
const DAY_5_LINK =
  "https://gmpuzzles.com/penpa-edit/?m=solve&p=vVbfb9tGDH73X2Hc87m4n5Klty7N9tJl65KhKAQjkBM1ESpbmSSvmYL0by/Jk+3TSRswYJgF07zP5Efyzjz6sXjmCTxGcC24hMfG+o3ikZFvbOK9wMLSWwzPTdlVRbp8l/+1tPztoXusm3TJOf/lin/Oq7ZYZHKzyJhifHhvvrG7erct2beMFfcPxXNdAs42i5f+t/Slv02zzSvvfz+r67N6nb6AvEpfmBIRSzNmGaTKJNsAs1gjAkFOiBSICA/RBhHpIUaGSGRDnnUS2iTk5UdP1AShWD5PEmaoJcXyvLSkulrG1Qmh6MazUTqoS6sJjyEeP5ah6L6Npf3RPkI8PnNMdfk8cRzyxJO61rQ/Xs7GndcICb2MIsSLbjRFHyG0q150o4nZq8Jo2jGf2Ya1m4iY/Xwi2lVv5000YY6odt9rHZ6Fcb8WP1YS7rNxvw3PxirKx7OxJqzdmvB0rKF8fMSdjpdhJMLfaiTC2iNB+ZwQaDJJrfaJ5I8kFckb6ETea5LvSAqSluR7srkk+ZHkBUlDMiKbGHt5scjwFlmpBEKqGPZcRaCt1hbXEXxhuVpzJ1fKkA1agI002jmtALGaryx4J2SuSSYAOVZYGHJCN7i9TtyDWwymMRiRE0owOOqrGAgcB8gjDRApG0/irwXYA78AegmFDXQkpadjblK4chwxSHXiBnYtqbq5NE/sUitQtJfsEMnxeQhYiXEwkH48jBjjxz/XIzXgGFZarMCOowzR3ZGF1cJuhQmAdFPm9OCMuD40n/O7AqbBJcyF5VXd7PIKVteH+/rLYbK+qJt90XjrYt816H1R757qtuwKHCqsravbdmBOaSRxwvaH3Rbcfaiq66eq3I/tyod93RSzXyGII2zGfls39wH717yqRkD7xyGHhH3ormzuqjHUNeVonTdN/XWE7PLucQRs8w6GcvtYPo2ZYIPGCXT5OMX8Sx5E251rfl2wZ0bvTMPgj3FiJ2n/gfc/udv2OOB5/wFG9s8pa+lgGM7tjMHdQhcEDVIF6uVZ/Ujfo3YxDFoB+tWgg/oJVLc3t+8d8mua9Tf4v4H3P5A3qmxX/wnpkhut3T8NAPCY2sN2gIfEjvxwNb11GTv7mYT1OWFUXcKozSSMdfwnCR//GgUJJ5tXdxbiX/1n+h8u9eeh3+pmtuUAnuk6QGe7a8AnDQb4pJUw4LSbAJ1pKEDDngJo2lYATjoLsL9pLmQN+wuzClsMQ026DEP5jZZtFqR9Bw==";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        Farmer Joe’s flock of 15 sheep are peacefully grazing in the meadow.
        They are well protected from the 11 wolves that roam nearby by a fence
        that runs in a single closed loop along the dotted lines of the grid.
        The sheep are always inside the fence, and the wolves outside of it.
        Numbers in grid cells indicate how many edges of that cell are used by
        the fence. The green symbols <GreenSpan>“s”</GreenSpan> and{" "}
        <GreenSpan>“w”</GreenSpan> indicate cells that contain sheep and wolves
        respectively. (Not all of their positions are given: sheep and wolves
        can also be in cells that contain numbers, or in empty cells.)
      </p>
      <AuthorsNote>
        (Links to Penpa versions of the grids are provided in case you find that
        interface helpful; but you may find it more efficient to use drawing
        software, a tablet note-taking app, or just solve on paper.)
      </AuthorsNote>
      <p>
        On the first day, the wolves are all standing at the edge of the
        surrounding forest, except for two that have already ventured into the
        meadow:
      </p>
      <p>
        <strong>Day 1</strong> (
        <a href={DAY_1_LINK} target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={715}
        src={image1}
        alt="A hexagonal grid sparsely filled with numbers and green S’s and W’s."
      />
      <p>Every night, three things happen successively, in this order:</p>
      <ol>
        <li>
          First, all the sheep move to new spots inside the fenced area. Each
          sheep travels by a distance of at most 3 grid cells, staying within
          the fence. All the sheep end up in positions that were not occupied by
          sheep during the day; no two sheep end up in the same position; and no
          sheep ends up immediately next to a wolf.
        </li>
        <li>
          Next, Farmer Joe rebuilds the fence along a different loop, in such a
          way that all the sheep are still inside and all the wolves remain
          outside.
        </li>
        <li>
          Finally, each wolf looks for the sheep that lies closest to it
          directly along one of the six directions of the grid (if there are
          several, it chooses one of them at random), and moves in a straight
          line towards that sheep until it is blocked by the fence. The wolves
          always see at least one sheep; they are always able to move by at
          least one cell in their chosen direction; and the paths traced by the
          different wolves over the successive nights do not overlap with one
          another (however a wolf can retrace its own path).
        </li>
      </ol>
      <p>
        Farmer Joe would like your help—figuring out the day-to-day movements of
        all these wolves around the clock is a lot of work!
      </p>
      <p>
        <strong>Day 2</strong> (
        <a href={DAY_2_LINK} target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image2}
        alt="A hexagonal grid sparsely filled with numbers."
      />
      <p>
        <strong>Day 3</strong> (
        <a href={DAY_3_LINK} target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image3}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
      <p>
        <strong>Day 4</strong> (
        <a href={DAY_4_LINK} target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image4}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
      <p>
        <strong>Day 5</strong> (
        <a href={DAY_5_LINK} target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image5}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
    </>
  );
};

export default Puzzle;
