import { Match, Team, Participant, getRandomTeam } from "./ribbonUtils";

export class Scheduler {
    participants: Participant[];
    playing: Match[];

    constructor(participants: Participant[]) {
        this.participants = participants;
        this.playing = []
    }

    addParticipant(participant: Participant): void {
        this.participants.push(participant)
    }

    removeParticipant(participant: Participant): void {
        const index = this.participants.findIndex(p => p.name === participant.name);
        if (index !== -1) {
            this.participants.splice(index, 1);
        }   
    }

    listParticipants(): void {
        this.participants.forEach(p => {
            const formerTeammateNames = Array.from(p.formerTeamMates).map(teammate => teammate.name).join(", ");
            console.log(`Name: ${p.name}, Präferenz: ${p.preferences}, Anzahl Spiele: ${p.playedMatches}, Bisherige Teammates: ${formerTeammateNames}`);
        });
    }

    getAvailablePlayers(): Participant[] {
        let allPlayers: Participant[] = this.participants;
        for (let m of this.playing) {
            allPlayers = allPlayers.filter(p => m.team1.participants.indexOf(p) < 0);
            allPlayers = allPlayers.filter(p => m.team2.participants.indexOf(p) < 0);
        }
        return allPlayers;
    }

    getPossibleConstillations(): Set<Team> {
        let pool = this.getAvailablePlayers();
        let teams: Set<Team> = new Set();

        for (let i = 0; i < pool.length; i++) {
            for (let j = i + 1; j < pool.length; j++) {
                if (pool[i].preferences.includes(2) && pool[j].preferences.includes(2) && pool[i]!== pool[j]) {
                    teams.add(new Team([pool[i], pool[j]]))
                }
                for (let k = j + 1; k < pool.length; k++) {
                    if (
                    pool[i].preferences.includes(3) &&
                    pool[j].preferences.includes(3) &&
                    pool[k].preferences.includes(3) 
                    ) {
                        teams.add(new Team([pool[i], pool[j], pool[k]]))
                    }
                }
            }
        }
        return teams
    }

    startMatch(match: Match): void {
        this.playing.push(match)
        for (let p of match.team1.participants) {
            p.playedMatches++;
            match.team1.participants.forEach(teammate => {
                if (teammate.name !== p.name) {
                    p.formerTeamMates.add(teammate);
                }
            });
        }
        for (let p of match.team2.participants) {
            p.playedMatches++;
            match.team2.participants.forEach(teammate => {
                if (teammate.name !== p.name) {
                    p.formerTeamMates.add(teammate);
                }
            });
        }
    }

    finishMatch(id: number): void {
        const index = this.playing.findIndex(m => m.id === id);
        if (index !== -1) {
            this.playing.splice(index, 1);
        }   
    }

    removeUnavailableTeams(teams: Set<Team>, participants: Participant[]): Set<Team> {
        const participantNames = new Set(participants.map(p => p.name));

        return new Set(Array.from(teams).filter(team => {
            return !team.participants.some(p => participantNames.has(p.name));
        }));
    }

    matchmaking() {
        let possibleTeams = this.getPossibleConstillations()
        let team1: Team = getRandomTeam(possibleTeams)
        possibleTeams = this.removeUnavailableTeams(possibleTeams, team1.participants)
        let team2 = getRandomTeam(possibleTeams); // TODO: other strategy to choose next team
        this.startMatch(new Match(Math.random(), team1, team2));
    }
}