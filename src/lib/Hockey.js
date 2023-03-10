import { doNTimes, shuffle } from "../lib/helper";
import Papa from "papaparse";

class Player {
  static parseCSV = player => {
    const data = [
      player["F NAME"],
      player["L NAME"],
      player["POS"],
      player["#"],
      player["SH% / SV%"] / 100,
    ];

    return new (player["SK / G"] === "SK" ? Skater : Goalie)(...data);
  };

  constructor(fName, lName, pos, num) {
    this.fName = fName;
    this.lName = lName;
    this.fullName = `${fName} ${lName}`;

    this.pos = pos;
    this.id = num;
  }
}

class Skater extends Player {
  constructor(fName, lName, pos, num, shotPercentage, rating = "G") {
    super(fName, lName, pos, num);

    this.shotRate = shotPercentage ?? 0.07;

    switch (rating) {
      case "A":
        this.shotCount = 5;
        break;
      case "B":
      case "C":
        this.shotCount = 4;
        break;
      case "D":
      case "E":
      case "F":
        this.shotCount = 3;
        break;
      case "G":
      case "H":
      case "I":
        this.shotCount = 2;
        break;
      case "J":
      case "K":
      default:
        this.shotCount = 1;
        break;
    }
  }

  takeShot() {
    return Math.random() < this.shotRate;
  }
}

class Goalie extends Player {
  constructor(fName, lName, pos, num, blockPercentage) {
    super(fName, lName, pos, num);

    this.blockPercentage = blockPercentage;
  }
}

class Team {
  static async parseCSV(file) {
    let data;
    if (typeof file === "string" || file instanceof String)
      data = await fetch(file);
    else data = file;

    const csv = await data.text();
    const titleData = Papa.parse(csv, { preview: 1 });

    const playerData = Papa.parse(csv, {
      comments: "//",
      header: true,
    });

    const title = titleData.data[0][1];
    const players = playerData.data.map(Player.parseCSV);

    return new Team(title, ...players);
  }

  constructor(name, ...players) {
    this.name = name;
    this.players = players;

    this.skaters = this.players.filter(p => p instanceof Skater);
    this.goalies = this.players.filter(p => p instanceof Goalie);
  }
}

class Goal {
  constructor(team, player) {
    this.team = team;
    this.player = player;
    this.period = Math.ceil(Math.random() * 3);
  }
}

class Game {
  constructor(visTeam, homeTeam) {
    this.teams = {
      home: homeTeam,
      vis: visTeam,
    };

    this.play();
  }

  play() {
    this.goals = [];

    this.takeAllShots();
    this.sortGoalsByPeriod();

    if (this.score.home === this.score.vis) this.result = "It's a draw!";
    else {
      this.winner =
        this.teams[this.score.home > this.score.vis ? "home" : "vis"];

      this.result = `${this.winner.name} won!`;
    }

    return this;
  }

  /* == HELPERS == */
  get score() {
    return {
      home: this.teamGoals("home").length ?? 0,
      vis: this.teamGoals("vis").length ?? 0,
    };
  }

  teamGoals(teamType) {
    return this.goals.filter(g => g.team.name === this.teams[teamType].name);
  }

  periodGoals(period) {
    return this.goals.filter(g => g.period === period);
  }

  newGoal(team, player) {
    this.goals.push(new Goal(team, player));
  }

  /* == ACTIONS == */
  takeAllShots() {
    [this.teams.home, this.teams.vis].forEach(team => {
      team.skaters.forEach(sk => {
        doNTimes(sk.shotCount, () => sk.takeShot() && this.newGoal(team, sk));
      });
    });
  }

  sortGoalsByPeriod() {
    shuffle(this.goals);

    const sortedGoals = [
      ...this.periodGoals(1),
      ...this.periodGoals(2),
      ...this.periodGoals(3),
    ];

    this.goals = sortedGoals;
  }
}

export { Game, Team, Player, Skater, Goalie };
