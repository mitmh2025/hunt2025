"use client";

import React, { Component } from "react";
import { Tinderable } from "./tinderable";
import { data } from "./constants";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import borderTop from "../public/assets/border-top.png";
import borderLeft from "../public/assets/border-left.png";
import borderRight from "../public/assets/border-right.png";
import borderBottom from "../public/assets/border-bottom.png";

const cards: Record<string, any> = {};
data.forEach((c) => {
  cards[c.index] = c;
});

export function App(props) {
  return <AppInner {...props} />;
}

export class AppInner extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCard: cards["node1"] };

    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.alertNotPossible = this.alertNotPossible.bind(this);
    this.onAnimationDone = this.onAnimationDone.bind(this);
    this.resetStack = this.resetStack.bind(this);
    this.onAnimateLeft = this.onAnimateLeft.bind(this);
    this.onAnimateRight = this.onAnimateRight.bind(this);
  }

  setCard(id) {
    if (id !== undefined && cards[id] !== undefined) {
      this.setState({ currentCard: cards[id] });
    } else {
      this.alertNotPossible();
    }
  }

  onSwipeLeft() {
    this.setCard(this.state.currentCard.left);
  }

  onSwipeRight() {
    this.setCard(this.state.currentCard.right);
  }

  onAnimateLeft() {
    const nextId = this.state.currentCard.left;
    if (nextId !== undefined && cards[nextId] !== undefined) {
      this.setState({ animation: "swipe-left" });
    } else {
      this.alertNotPossible();
    }
  }

  onAnimateRight() {
    const nextId = this.state.currentCard.right;
    if (nextId !== undefined && cards[nextId] !== undefined) {
      this.setState({ animation: "swipe-right" });
    } else {
      this.alertNotPossible();
    }
  }

  alertNotPossible() {
    this.setState({ animation: "shaking" });
  }

  onAnimationDone(animation) {
    switch (this.state.animation) {
      case "swipe-left":
        this.onSwipeLeft();
        break;
      case "swipe-right":
        this.onSwipeRight();
        break;
      default:
      // nothing
    }

    this.setState({
      animation: null,
    });
  }

  resetStack(ev) {
    this.setCard("node1");
  }

  render() {
    const tooltip = (
      <Tooltip id="start-again-tooltip" positionTop="50px">
        Start again
      </Tooltip>
    );

    return (
      <div className="app-vertical">
        <img id="app-border-top" src={borderTop} alt="" />
        <div className="app-horizontal">
          <img id="app-border-left" src={borderLeft} alt="" />
          <div id="app-content">
            <Tinderable
              currentCard={this.state.currentCard}
              onSwipeLeft={this.onSwipeLeft}
              onSwipeRight={this.onSwipeRight}
              animation={this.state.animation}
              onAnimationDone={this.onAnimationDone}
            />
            <span className="app-buttons">
              <button onClick={this.onAnimateLeft}>
                <i className="fa fa-arrow-left"></i>
              </button>
              <button onClick={this.onAnimateRight}>
                <i className="fa fa-arrow-right"></i>
              </button>
            </span>
          </div>
          <img id="app-border-right" src={borderRight} alt="" />
        </div>
        <div id="app-bottom">
          <img id="app-border-bottom" src={borderBottom} alt="" />
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <button onClick={this.resetStack}></button>
          </OverlayTrigger>
        </div>
      </div>
    );
  }
}