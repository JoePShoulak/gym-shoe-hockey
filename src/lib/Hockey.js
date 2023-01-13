import shuffle from "../lib/helper";

class Player {
  constructor() {
    this.shotPercentage = 7;
    this.shotCount = 4;
    this.name = "BENCH";

    this.scoredGoals = 0;
  }

  takeShot() {
    const shot = Math.floor(Math.random() * 100);

    const scored = shot < this.shotPercentage;
    if (scored) this.scoredGoals++;

    return scored;
  }

  takeAllShots() {
    return Array(this.shotCount)
      .fill()
      .reduce((shots, _val) => {
        let newShots = [...shots];

        if (this.takeShot())
          newShots.push({
            player: this.name,
            team: this.team,
            period: Math.ceil(Math.random() * 3),
          });

        return newShots;
      }, []);
  }
}

class ActivePlayer extends Player {
  constructor(name, id) {
    super();

    this.name = name;
    this.id = id;
    this.shotPercentage = 7 + Math.floor(Math.random() * 7);
    this.shotCount = this.getShotCount();
  }

  getShotCount() {
    let numShots = 5;

    if (["B", "C"].includes(this.id)) numShots = 4;
    else if (["D", "E", "F"].includes(this.id)) numShots = 3;
    else if (["G", "H"].includes(this.id)) numShots = 2;

    return numShots;
  }
}

class Team {
  constructor(name, ...players) {
    this.name = name;
    this.players = players;
    this.bench = new Player();
    [...this.players, this.bench].forEach(player => (player.team = this.name));
  }

  takeAllShots() {
    return [...this.players, this.bench].reduce(
      (all, player) => [...all, ...player.takeAllShots()],
      []
    );
  }
}

class Game {
  constructor(visitingTeam, homeTeam) {
    this.teams = {
      visitors: visitingTeam,
      home: homeTeam,
    };

    this.goals = {
      visitors: this.teams.visitors.takeAllShots(),
      home: this.teams.home.takeAllShots(),
    };

    this.details = [
      ...this.getGoals(1),
      ...this.getGoals(2),
      ...this.getGoals(3),
    ];

    this.score = {
      visitors: this.goals.visitors.length,
      home: this.goals.home.length,
    };

    this.winner = null;

    if (this.score.visitors === this.score.home) this.result = "It's a draw!";
    else {
      this.winner =
        this.score.visitors > this.score.home
          ? this.teams.visitors.name
          : this.teams.home.name;

      this.result = `${this.winner} won!`;
    }
  }

  getGoals = (period, team = null) => {
    return team
      ? this.goals[team].filter(goal => goal.period === period)
      : [
          ...this.getGoals(period, "home"),
          ...this.getGoals(period, "visitors"),
        ];
  };
}

export { ActivePlayer, Team, Game };
