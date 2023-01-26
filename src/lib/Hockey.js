import { doNTimes, shuffle } from "../lib/helper";

class Player {
  constructor(fName, lName, pos, num) {
    this.fName = fName;
    this.lName = lName;
    this.fullName = `${fName} ${lName}`;

    this.pos = pos;
    this.id = num;
  }
}

class Skater extends Player {
  constructor(fName, lName, pos, num, shotPercentage, rating) {
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

    this.goals = [];

    this.takeAllShots();
    this.sortGoalsByPeriod();

    if (this.score.home === this.score.vis) this.result = "It's a draw!";
    else {
      this.winner =
        this.teams[this.score.home > this.score.vis ? "home" : "vis"];

      this.result = `${this.winner.name} won!`;
    }
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
      team.players.forEach(player => {
        doNTimes(player.shotCount, _shot => {
          if (player.takeShot()) this.newGoal(team, player);
        });
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

export { Game, Team, Skater, Goalie };
