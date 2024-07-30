import { Match, Team, Participant, getRandomTeam } from "./ribbonUtils";

let globalId: number = 1;

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

    getAvailableParticipants(): Participant[] {
        let allPlayers: Participant[] = this.participants;
        for (let m of this.playing) {
            allPlayers = allPlayers.filter(p => m.team1.participants.indexOf(p) < 0);
            allPlayers = allPlayers.filter(p => m.team2.participants.indexOf(p) < 0);
        }
        return allPlayers;
    }

    getPossibleConstillations(pool: Participant[]): Set<Team> {
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

    isFair(availableParticipants: Participant[], team: Team):boolean {
        let fairnessFactor: boolean[] = [];
        const average = availableParticipants.reduce((total, next) => total + next.playedMatches, 0) / availableParticipants.length;
        for (let p of team.participants) {
            if (p.playedMatches > average) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
            for (let q of team.participants) { 
                if (p != q) {
                    if (p.formerTeamMates.has(q)) {
                        fairnessFactor.push(false);
                    } else {
                        fairnessFactor.push(true);
                    }
                } 
            }
        }
        const count = fairnessFactor.filter(Boolean).length;
        return count < 2;
    }

    matchmaking(): Match | undefined {
        let availableParticipants = this.getAvailableParticipants();
        let possibleTeams = this.getPossibleConstillations(availableParticipants);

        if (availableParticipants.length >= 4) {
            let team1: Team = getRandomTeam(possibleTeams);
            possibleTeams = this.removeUnavailableTeams(possibleTeams, team1.participants);
            if (possibleTeams.size >= 1) {
                let team2 = getRandomTeam(possibleTeams);
                this.isFair(availableParticipants, team2);
                let match = new Match(globalId++, team1, team2)
                this.startMatch(match);
                return match
            } else {
                console.log("Not enough possible team combinations. Try again.");
                // throw new Error(`Not enough possible team combinations.`);
            }
        } else {
            console.log("Not enough players.");
            // throw new Error(`Not enough players.`);
        }
    }
}