import Papa from "papaparse";
import { Player, Team } from "../lib/Hockey";

async function parseCSV(file) {
  const response = await fetch(file);
  const data = await response.text();

  const titleData = Papa.parse(data, {
    preview: 1,
  });

  const playerData = Papa.parse(data, {
    comments: "//",
    header: true,
  });

  const title = titleData.data[0][1];
  const players = playerData.data.map(Player.parseCSV);

  return new Team(title, ...players);
}

const getTeams = async () => {
  const file1 = require("../data/Jihlava.csv");
  const file2 = require("../data/Kladno.csv");

  return await Promise.all([parseCSV(file1), parseCSV(file2)]);
};

export { getTeams };
