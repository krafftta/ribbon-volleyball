export class Participant {
    name: string;
    preferences: (2 | 3)[];
    playedMatches: number;
    formerTeamMates: Set<Participant>
  
    constructor(name: string, preferences: (2 | 3)[]) {
      this.name = name;
      this.preferences = preferences;
      this.playedMatches = 0;
      this.formerTeamMates = new Set();
    }    
  }

export class Team {
    participants: Participant[];

    constructor(participants: Participant[]) {
        this.participants = participants;
    }

    containsParticipant(participant: Participant): boolean {
        return this.participants.some(p => p.name === participant.name);
    }
}

export class Match {
    id: number;
    team1: Team;
    team2: Team;

    constructor(id: number, team1: Team, team2:Team) {
        this.id = id;
        this.team1 = team1;
        this.team2 = team2;
    }
}

export function getRandomTeam(set: Set<Team>): Team {
    let items = Array.from(set);
    if (items.length == 1) {
        return items[0]
    } else {
        return items[Math.floor(Math.random() * items.length)];
    }
}

export function getRandomMatch(set: Set<Match>): Match {
    let items = Array.from(set);
    if (items.length == 1) {
        return items[0]
    } else {
        return items[Math.floor(Math.random() * items.length)];
    }
}

