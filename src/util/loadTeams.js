import Papa from "papaparse";
import { Player, Team } from "../lib/Hockey";

async function parseCSV(file) {
  const response = await fetch(file);
  const data = await response.text();

  const titleData = Papa.parse(data, { preview: 1 });

  const playerData = Papa.parse(data, {
    comments: "//",
    header: true,
  });

  const title = titleData.data[0][1];
  const players = playerData.data.map(Player.parseCSV);

  return new Team(title, ...players);
}

const parseUpload = async file => {
  const data = await file.text();
  const titleData = Papa.parse(data, { preview: 1 });

  const playerData = Papa.parse(data, {
    comments: "//",
    header: true,
  });

  const title = titleData.data[0][1];
  const players = playerData.data.map(Player.parseCSV);

  return new Team(title, ...players);
};

const loadTeams = async () => {
  const req = require.context("../data/", true, /\.csv$/);
  const teamCSVs = req.keys().map(key => req(key));

  return await Promise.all(teamCSVs.map(parseCSV));
};

export { loadTeams, parseCSV, parseUpload };
