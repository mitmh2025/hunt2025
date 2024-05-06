"use client"

import React, { Component, useCallback, useRef } from "react";
import Hammer from "./Hammer";

const Card = ({image, text = "Default text"}) => {
  return (
    <div className="card">
      <div className="image">
        <img
          src={image}
          alt="If you don't see this image, please check your internet connection."
        />
      </div>
      <p>Screenname: {text}</p>
    </div>
  );
}

//class Card extends Component {
//  render() {
//  }
//}
//
//Card.defaultProps = {
//  index: "",
//  title: "Default title",
//  text: "Default text",
//  image: "",
//  left: null,
//  right: null,
//};

const Tinderable = ({ onSwipeLeft, onSwipeRight, onAnimationDone, animation, currentCard, ...rest }) => {

  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0});

  const resetPosition = useCallback(() => {
    setPos({ x: 0, y: 0});
  }, []);

  const handleSwipe = useCallback((ev) => {
    resetPosition()
    if (ev.direction === 2) {
      onSwipeLeft();
    } else if (ev.direction === 4) {
      onSwipeRight();
    }
  }, []);

  const onAnimationDoneCb = useCallback((ev) => {
    onAnimationDone(ev.animationName);
  });
  const handlePan = useCallback((ev) => {
    setPos({ x: ev.deltaX, y: ev.deltaY });
  }, []);
  const handlePanEnd = useCallback((ev) => {
    resetPosition();
    if (ev.deltaX > 150) {
      onSwipeRight();
    } else if (ev.deltaX < -150) {
      onSwipeLeft();
    }
  }, [resetPosition]);
  //handlePanCancel(ev) {
  //  this.resetPosition();
  //}

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("animationend", onAnimationDoneCb);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("animationend", onAnimationDoneCb);
      }
    };
  });


  const hammerOptions = {
    swipe: {
      threshold: 0,
    },
  };

  const x = Math.min(Math.max(-200, pos.x), 200);
  const y = Math.min(Math.max(-200, pos.y), 200);

  const position = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };

  return (
    <div
      ref={cardRef}
      className={`screen ${animation}`}
      style={position}
    >
      <Hammer
        options={hammerOptions}
        onSwipe={handleSwipe}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onPanCancel={resetPosition}
        key={`hammer-${currentCard.index}`}
      >
        <Card
          {...currentCard}
          key={`card-${currentCard.index}`}
        />
      </Hammer>
    </div>
  );
};

/*
class Tinderable extends Component {
  constructor(props) {
    super(props);
    this.state = { pos: { x: 0, y: 0 } };
    this.handleSwipe = this.handleSwipe.bind(this);
    this.onAnimationDone = this.onAnimationDone.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePanCancel = this.handlePanCancel.bind(this);
  }

  onAnimationDone(ev) {
    this.props.onAnimationDone(ev.animationName);
  }

  componentDidMount() {
    const c = this.refs.card;
    c.addEventListener("animationend", this.onAnimationDone);
  }

  componentWillUnmount() {
    const c = this.refs.card;
    c.removeEventListener("animationend", this.onAnimationDone);
  }

  resetPosition() {
    this.setState({ pos: { x: 0, y: 0 } });
  }

  handleSwipe(ev) {
    this.resetPosition();
    if (ev.direction === 2) {
      this.props.onSwipeLeft();
    } else if (ev.direction === 4) {
      this.props.onSwipeRight();
    }
  }

  handlePan(ev) {
    this.setState({ pos: { x: ev.deltaX, y: ev.deltaY } });
  }

  handlePanEnd(ev) {
    this.resetPosition();
    if (ev.deltaX > 150) {
      this.props.onSwipeRight();
    } else if (ev.deltaX < -150) {
      this.props.onSwipeLeft();
    }
  }

  handlePanCancel(ev) {
    this.resetPosition();
  }

  render() {
    const hammerOptions = {
      swipe: {
        threshold: 0,
      },
    };

    const x = Math.min(Math.max(-200, this.state.pos.x), 200);
    const y = Math.min(Math.max(-200, this.state.pos.y), 200);

    const position = {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };

    return (
      <div
        ref="card"
        className={`screen ${this.props.animation}`}
        style={position}
      >
        <Hammer
          options={hammerOptions}
          onSwipe={this.handleSwipe}
          onPan={this.handlePan}
          onPanEnd={this.handlePanEnd}
          onPanCancel={this.handlePanCancel}
          key={`hammer-${this.props.currentCard.index}`}
        >
          <Card
            {...this.props.currentCard}
            key={`card-${this.props.currentCard.index}`}
          />
        </Hammer>
      </div>
    );
  }
}
*/

export default Tinderable;
