// Loads the basic tracery example into the app
const loadChicken = (e, setOriginRule, setRules) => {
  e.preventDefault();
  setOriginRule([
    {
      name: "origin",
      contents: [
        '"Guess what?"\n"What?"\n"#Guess What#."',
        '"Guess why?"\n"Why?"\n"#Guess Why#."',
        '"Guess who?"\n"Who?"\n"#Guess Who#."',
      ],
    },
  ]);
  setRules([
    { name: "Guess What", contents: ["Chicken Butt"] },
    { name: "Guess Why", contents: ["Chicken Pot Pie", "Chicken Thigh"] },
    { name: "Guess Who", contents: ["Chicken Stew", "Chicken Cordon Bleu"] },
  ]);
};

// Loads the advanced example from the tracery tutorial into the app
const loadAdvanced = (e, setOriginRule, setRules) => {
  e.preventDefault();
  setOriginRule([
    {
      name: "origin",
      contents: ["Once upon a time, #[#setCharacter#]story#"],
    },
  ]);
  setRules([
    {
      name: "name",
      contents: [
        "Arjun",
        "Yuuma",
        "Darcy",
        "Mia",
        "Chiaki",
        "Izzi",
        "Azra",
        "Lina",
      ],
    },
    {
      name: "animal",
      contents: [
        "unicorn",
        "raven",
        "sparrow",
        "scorpion",
        "coyote",
        "eagle",
        "owl",
        "lizard",
        "zebra",
        "duck",
        "kitten",
      ],
    },
    {
      name: "occupationBase",
      contents: [
        "wizard",
        "witch",
        "detective",
        "ballerina",
        "criminal",
        "pirate",
        "lumberjack",
        "spy",
        "doctor",
        "scientist",
        "captain",
        "priest",
      ],
    },
    {
      name: "occupationMod",
      contents: [
        "occult ",
        "space ",
        "professional ",
        "gentleman ",
        "erotic ",
        "time ",
        "cyber",
        "paleo",
        "techno",
        "super",
      ],
    },
    {
      name: "strange",
      contents: ["mysterious", "portentous", "enchanting", "strange", "eerie"],
    },
    { name: "tale", contents: ["story", "saga", "tale", "legend"] },
    { name: "occupation", contents: ["#occupationMod##occupationBase#"] },
    {
      name: "mood",
      contents: [
        "vexed",
        "indignant",
        "impassioned",
        "wistful",
        "astute",
        "courteous",
      ],
    },
    {
      name: "setPronouns",
      contents: [
        "[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]",
        "[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]",
        "[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]",
      ],
    },
    {
      name: "setSail",
      contents: [
        "set sail for adventure",
        "left #heroTheir# home",
        "set out for adventure",
        "went to seek #heroTheir# forture",
      ],
    },
    {
      name: "setCharacter",
      contents: ["[#setPronouns#][hero:#name#][heroJob:#occupation#]"],
    },
    {
      name: "openBook",
      contents: [
        "An old #occupation# told #hero# a story. 'Listen well' she said to #hero#, 'to this #strange# #tale#. ' #origin#'",
        "#hero# went home.",
        "#hero# found an ancient book and opened it.  As #hero# read, the book told #strange.a# #tale#: #origin#",
      ],
    },
    {
      name: "story",
      contents: ["#hero# the #heroJob# #setSail#. #openBook#"],
    },
  ]);
};

export { loadChicken, loadAdvanced };
