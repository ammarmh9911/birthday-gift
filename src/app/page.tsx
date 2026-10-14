"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  {
    image: "/memories/memory1.jpg",
    title: "Our first photo",
    text: "Isn't this our first photo together, look at you so cute and happy🥹",
  },
  {
    image: "/memories/memory2.jpg",
    title: "My favorites🙈",
    text: "I don't know babe, if you realize how much these photoes really means to me.",
  },
  {
    image: "/memories/memory3.jpg",
    title: "Your letter",
    text: "Still one of the best and cutest thing you gave me",
  },
];

const thingsILove = [
  {
    title: "Your smile😘",
    text: "I don't think you realize how easily your smile can make a so happyyyy.",
  },
  {
    title: "Your eyes🥹",
    text: "One of the noticible thing is your eyes, oooh that cute big round eyes omg🥹🙈",
  },
  {
    title: "Your shyness😝",
    text: "I loved to see you get shy, its soooo cute, sometimes I just want bite your cheeks😋",
  },
  {
    title: "Being yourself 🫂",
    text: "One of my favorite things about you is that you are unapologetically you.",
  },
  {
    title: "Us",
    text: "Out of all the people in this world, I'm really glad I get to call you mine, and I love being ourselves.",
  },
];

type Section =
  | "intro"
  | "birthday"
  | "memories"
  | "love"
  | "letter"
  | "final";

export default function Home() {
  const [section, setSection] = useState<Section>("intro");
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [loveIndex, setLoveIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);

  const nextSection = (next: Section) => {
    setSection(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
  switch (section) {
    case "birthday":
      setSection("intro");
      break;

    case "memories":
      if (memoryIndex > 0) {
        setMemoryIndex((prev) => prev - 1);
      } else {
        setSection("birthday");
      }
      break;

    case "love":
      if (loveIndex > 0) {
        setLoveIndex((prev) => prev - 1);
      } else {
        setMemoryIndex(memories.length - 1);
        setSection("memories");
      }
      break;

    case "letter":
      setLoveIndex(thingsILove.length - 1);
      setSection("love");
      break;

    case "final":
      setSection("letter");
      break;

    default:
      break;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <main className="birthday-page">

      {section !== "intro" && (
        <BackButton onClick={goBack} />
      )}

      {/* MUSIC */}
      <audio
        id="birthday-music"
        loop
        src="/music/song.mp3"
      />

      {/* INTRO */}
      <AnimatePresence mode="wait">
        {section === "intro" && (
          <motion.section
            className="screen intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="stars" />

            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <p className="small-text">A little present for you...</p>

              <h1>
                Maplu made
                <br />
                something
                <br />
                <span>    </span>
                <span>for you😋</span>
              </h1>

              <p className="subtext">
                Take a moment. Don't rush this, okey Sundari
              </p>

              <button
                className="glow-button"
                onClick={() => {
                  nextSection("birthday");

                  if (!musicOn) {
                    const audio = document.getElementById(
                      "birthday-music"
                    ) as HTMLAudioElement;

                    audio?.play();
                    setMusicOn(true);
                  }
                }}
              >
                Enter →
              </button>
            </motion.div>
          </motion.section>
        )}

        {/* BIRTHDAY */}
        {section === "birthday" && (
          <motion.section
            className="screen birthday-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="stars" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="cake">🎂</div>

              <p className="small-text">This day a princess born into this world</p>

              <h1 className="birthday-title">
                Happy Birthday,
                <br />
                <span>ZMABI🥹</span>
              </h1>

              <p className="subtext">
                And I wanted to make something that was just for you.
              </p>

              <button
                className="glow-button"
                onClick={() => nextSection("memories")}
              >
                click here, nook😚
              </button>
            </motion.div>
          </motion.section>
        )}

        {/* MEMORIES */}
        {section === "memories" && (
          <motion.section
            className="content-screen"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <SectionHeader
              number="01"
              title="Our memories"
              subtitle="Some things I never want to forget."
            />

            <div className="memory-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={memoryIndex}
                  className="memory-card"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="photo-container">
                    <img
                      src={memories[memoryIndex].image}
                      alt={memories[memoryIndex].title}
                    />
                  </div>

                  <div className="memory-info">
                    <p className="memory-number">
                      {String(memoryIndex + 1).padStart(2, "0")} /{" "}
                      {String(memories.length).padStart(2, "0")}
                    </p>

                    <h2>{memories[memoryIndex].title}</h2>

                    <p>{memories[memoryIndex].text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="button-row">
                {memoryIndex < memories.length - 1 ? (
                  <button
                    className="glow-button"
                    onClick={() => setMemoryIndex(memoryIndex + 1)}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="glow-button"
                    onClick={() => nextSection("love")}
                  >
                    Please continue baby →
                  </button>
                )}
              </div>
            </div>
          </motion.section>
        )}


        {/* THINGS I LOVE */}
        {section === "love" && (
          <motion.section
            className="content-screen love-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SectionHeader
              number="03"
              title="Things I love about you"
              subtitle="And I could probably make this list much longer."
            />

            <div className="love-card-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loveIndex}
                  className="love-card"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="love-icon">♡</span>

                  <p className="memory-number">
                    {String(loveIndex + 1).padStart(2, "0")}
                  </p>

                  <h2>{thingsILove[loveIndex].title}</h2>

                  <p>{thingsILove[loveIndex].text}</p>
                </motion.div>
              </AnimatePresence>

              {loveIndex < thingsILove.length - 1 ? (
                <button
                  className="glow-button"
                  onClick={() => setLoveIndex(loveIndex + 1)}
                >
                  There's more →
                </button>
              ) : (
                <button
                  className="glow-button"
                  onClick={() => nextSection("letter")}
                >
                  One last thing →
                </button>
              )}
            </div>
          </motion.section>
        )}

        {/* LETTER */}
        {section === "letter" && (
          <motion.section
            className="letter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="letter">
              <p className="small-text">One last thing...</p>

              <h1>My letter to you.</h1>

              <p className="small-text">The one that I couldnt reply to you.</p>

              <div className="letter-text">
                <p>
                  I don't always know how to put everything I feel
                  into words.
                </p>

                <p>
                  But let me try, these are the things I want you to know today,
                  Firstly, it's how grateful I am that you are in my life.
                  Alhamdulillah, secondly that I love you more than anything in this world
                  and laslty I'm going to marry you one day Inshaallah. Very lastly Allah loves you
                  and he is with you all the time. Also,<br /> I really am the luckiest one to have to you in this world🙈
                </p>

                <p>
                  You've given me so many memories, so many reasons
                  to smile, and so many moments that I wouldn't trade
                  for anything in this world, so many love that made me forget my bad days,
                  so many lessons that made a better person,
                  so many hugs when the whole world felt heavy,
                  so many memories that I will never forget...no matter what.
                </p>

                <p>
                  I pray this next year of your life brings you
                  everything you've been wishing for, and also get
                  closer to everything we are wishing for. live your life nicely
                  until I get you, after that I can make your life very nice.
                  dont ever ever give up.
                </p>

                <p>
                  lastly I want you to know that I deeply, very deeply through my flesh and bones, 
                  regret all the time I hurt you, Zma, I AM SORRY, when I say this know that 
                  I sincerely and genuinely mean it, I AM SORRY my love. For me you are suppose to be perfect 
                  regardless of who is in wrong, I never wanted to blame or accuse you of doing anything wrong,
                  because you are perfect, but I always failed to surpass my anger, my ego and my frastrations. 
                  Now I ask you to forgive me with all your heart. For I have regreted my life long till now and forever 
                  for hurting you. 
                </p>

                <p>
                  May Allah bless you, may Allah have mercy upon you,
                  may Allah forgive you, may Allah grant you the highest level of jannah,
                  may Allah make you my wife, may allah make me your husband,
                  may Allah make us together till death and in the hereafter.
                  <br>

                  </br>
                  AMEEN YA RABBIL AALAMEEN🫂
                </p>

                <p className="signature">
                  Happy Birthday, my love.
                  <br />
                  ❤️
                </p>
              </div>

              <button
                className="glow-button"
                onClick={() => nextSection("final")}
              >
                There's one more thing →
              </button>
            </div>
          </motion.section>
        )}

        {/* FINAL */}
        {section === "final" && (
          <motion.section
            className="final-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="stars final-stars" />

            <motion.div
              className="final-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              <div className="heart">♥</div>

              <p className="small-text" >
                If I could give you one thing in this world...
              </p>

              <h1>
                I would give you
                <br />
                my life as it belongs to you and also many

                <br />
                <span>memories that we haven't made yet.</span>
              </h1>

              <p className="final-message">
                Happy Birthday, beautiful.
                Don't forget to love me tomorrow. 
              </p>

              <p className="signature">
                — AMMAR ❤️
              </p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-header">
      <p className="section-number">{number}</p>

      <h1>{title}</h1>

      <p>{subtitle}</p>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="back-button"
      onClick={onClick}>
      ← Back 
    </button>
  );
}
