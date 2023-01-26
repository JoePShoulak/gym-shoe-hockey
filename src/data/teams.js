import { Skater, Team } from "../lib/Hockey";

const info = [
  {
    name: "Sulak",
    id: "A",
  },
  {
    name: "Mikita",
    id: "B",
  },
  {
    name: "Hossa",
    id: "C",
  },
  {
    name: "Marek",
    id: "D",
  },
  {
    name: "Svoboda",
    id: "E",
  },
  {
    name: "Demitra",
    id: "F",
  },
  {
    name: "Holik, B",
    id: "G",
  },
  {
    name: "Horava",
    id: "H",
  },
];

const zlin = new Team(
  "Zlin",
  ...info.map(i => new Skater("fName", i.name, "pos", "num", 0.07, i.id))
);
const zlin2 = new Team(
  "Zlin2",
  ...info.map(i => new Skater("fName", i.name, "pos", "num", 0.07, i.id))
);

const teamData = [zlin, zlin2];

export default teamData;
