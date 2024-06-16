import { useEffect, useState } from "react";

const gameIcons = ["😍", "😱", "👀"]; //, "😁", "❤", "✌", "🎁", "✨", "🎈", "👑"];

const Card = () => {
  const [card, setCard] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false); // To prevent clicking more than two cards

  const startGame = () => {
    const duplicateIcons = [...gameIcons, ...gameIcons];
    const newGameIcons = [];

    while (newGameIcons.length < gameIcons.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateIcons.length);
      newGameIcons.push({
        emoji: duplicateIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateIcons.splice(randomIndex, 1);
    }
    setCard(newGameIcons);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (data) => {
    if (disableClicks) return;
    const newCards = card.map((card) => {
      if (card.position === data.position) {
        card.flipped = !card.flipped;
      }
      return card;
    });
    setCard(newCards);
  };

  const logicofFlip = () => {
    const flippedData = card.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) {
      setDisableClicks(true);
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          setCard(
            card.map((data) => {
              if (
                data.position === flippedData[0].position ||
                data.position === flippedData[1].position
              ) {
                data.solved = true;
              }
              return data;
            })
          );
        } else {
          setCard(
            card.map((data) => {
              if (
                data.position === flippedData[0].position ||
                data.position === flippedData[1].position
              ) {
                data.flipped = false;
              }
              return data;
            })
          );
        }
        setDisableClicks(false);
      }, 500);
    }
  };

  const checkForFinish = () => {
    if (card.every((card) => card.solved)) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You solved it",

        showConfirmButton: false,
        timer: 1500,
      });
      setInterval(() => {
        location.reload();
      }, 1200);
    }
  };
  useEffect(() => {
    logicofFlip();
    if (card.length > 0) {
      checkForFinish();
    }
  }, [card]);

  return (
    <>
      {card.map((data, index) => (
        <div
          className={`card ${data.flipped ? "active" : ""}`}
          key={index}
          onClick={() => handleActive(data)}
        >
          <div className={data.solved ? "remove_card" : "card"}>
            <div className="content">
              <div className="back">
                <div className="back-content"></div>
              </div>
              <div className="front">
                <div className="img">
                  <div className="circle"></div>
                  <div className="circle" id="right"></div>
                  <div className="circle" id="bottom"></div>
                </div>
                <div className="front-content">
                  <span>{data.emoji}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
