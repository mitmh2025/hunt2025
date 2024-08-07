import React from "react";
import { styled } from "styled-components";

const Box = styled.div`
  display: inline-flex;
  width: 32px;
  border-bottom: 1px solid black;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2px;
`;

const Row = styled.div`
  margin: 8px 0px;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Fed up with half info, it’s taking charge of what’s missing below.
      </p>
      <hr />
      <Row>
        <Box>12</Box> estate <Box>2</Box> has <Box>7</Box> <Box>14</Box>{" "}
        <Box>1</Box> <Box>6</Box> <Box>4</Box> sign
      </Row>
      <Row>
        <Box>15</Box> <Box>8</Box> <Box>1</Box> <Box>10</Box> unit of{" "}
        <Box>5</Box> inside
      </Row>
      <Row>
        <Box>4</Box> distribution tool picked up by <Box>13</Box> Confederate
      </Row>
      <Row>
        <Box>8</Box>-ringed <Box>2</Box> with <Box>15</Box> domain <Box>1</Box>{" "}
        <Box>9</Box>
      </Row>
      <Row>
        <Box>9</Box> <Box>11</Box> in <Box>16</Box>
      </Row>
      <Row>
        <Box>7</Box>-sized <Box>3</Box> in <Box>9</Box> <Box>14</Box>
      </Row>
      <Row>
        <Box>9</Box> <Box>11</Box>
      </Row>
      <hr />
      <ol>
        <li>(3)</li>
        <li>(4)</li>
        <li>(4)</li>
        <li>(5)</li>
        <li>(6)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(8)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(7)</li>
        <li>(4)</li>
        <li>(10)</li>
        <li>(5)</li>
        <li>(5)</li>
        <li>(5)</li>
      </ol>
      <hr />
      <Box>3</Box>, <Box>3</Box>, <Box>10</Box> <Box>6</Box> <Box>1</Box>{" "}
      <Box>13</Box>. <Box>5</Box>: <Box>16</Box>. <Box>4</Box> <Box>12</Box>{" "}
      <Box>15</Box> <Box>11</Box>.
    </>
  );
};

export default Puzzle;
