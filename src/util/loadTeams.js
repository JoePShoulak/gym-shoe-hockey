import { Team } from "../lib/Hockey";

const loadTeams = async () => {
  const req = require.context("../data/", true, /\.csv$/);
  const teamCSVs = req.keys().map(key => req(key));

  return await Promise.all(teamCSVs.map(Team.parseCSV));
};

export { loadTeams };
