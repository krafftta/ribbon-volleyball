export class Participant {
    name: string;
    preferences: (2 | 3)[];
    playedMatches: number;
    formerTeamMates: Participant[]
  
    constructor(name: string, preferences: (2 | 3)[]) {
      this.name = name;
      this.preferences = preferences;
      this.playedMatches = 0;
      this.formerTeamMates = [];
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
    team1: Team;
    team2: Team;

    constructor(team1: Team, team2:Team) {
        this.team1 = team1;
        this.team2 = team2;
    }
}
