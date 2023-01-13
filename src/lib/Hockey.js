class Player {
  constructor() {
    this.shotPercentage = 7;
    this.shotCount = 4;

    this.scoredGoals = 0;
  }

  takeShot() {
    const shot = Math.floor(Math.random() * 100);

    const scored = shot < this.shotPercentage;
    if (scored) this.scoredGoals++;

    return scored;
  }

  takeAllShots() {
    const result = Array(this.shotCount)
      .fill()
      .reduce(acc => acc + this.takeShot(), 0);

    return result;
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
  }

  takeAllShots() {
    return [...this.players, this.bench].reduce(
      (acc, val) => acc + val.takeAllShots(),
      0
    );
  }
}

export { Player, ActivePlayer, Team };
