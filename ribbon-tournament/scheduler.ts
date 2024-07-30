import { Match, Team, Participant } from "./ribbonUtils";

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

    getPossibleConstillations(): [Set<Team>, Set<Team>] {
        let pool = this.getAvailablePlayers();
        let teams2: Set<Team> = new Set();
        let teams3: Set<Team> = new Set();

        for (let i = 0; i < pool.length; i++) {
            for (let j = i + 1; j < pool.length; j++) {
                if (pool[i].preferences.includes(2) && pool[j].preferences.includes(2) && pool[i]!== pool[j]) {
                    teams2.add(new Team([pool[i], pool[j]]))
                }
                for (let k = j + 1; k < pool.length; k++) {
                    if (
                    pool[i].preferences.includes(3) &&
                    pool[j].preferences.includes(3) &&
                    pool[k].preferences.includes(3) 
                    ) {
                        teams3.add(new Team([pool[i], pool[j], pool[k]]))
                    }
                }
            }
        }
        return [teams2, teams3]
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

    matchmaking() {
        //pass
    }
}