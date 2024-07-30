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
            console.log(`Name: ${p.name}, Präferenz: ${p.preferences}, Anzahl Spiele: ${p.playedMatches}`);
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

    newMatch() {
        //pass
    }
}