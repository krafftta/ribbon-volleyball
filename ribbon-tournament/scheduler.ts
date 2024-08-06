import { Match, Team, Participant, shuffle } from "./ribbonUtils";

export class Scheduler {
    participants: Participant[];
    playing: Match[];
    globalId: number = 1;

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
                if (pool[i].preferences.includes(2) && pool[j].preferences.includes(2)) {
                    let teamMembers = [pool[i], pool[j]];
                    teams.add(new Team(teamMembers));
                }
                for (let k = j + 1; k < pool.length; k++) {
                    if (
                        pool[i].preferences.includes(3) &&
                        pool[j].preferences.includes(3) &&
                        pool[k].preferences.includes(3)
                    ) {
                        let teamMembers = [pool[i], pool[j], pool[k]];
                        teams.add(new Team(teamMembers));
                    }
                }
            }
        }
        return teams;
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

    getFairnessScore(availableParticipants: Participant[], team: Team):number {
        let fairnessFactor: boolean[] = [];
        const average = availableParticipants.reduce((total, next) => total + next.playedMatches, 0) / availableParticipants.length;
        let count = 0;
        for (let p of team.participants) {
            if (p.playedMatches > average) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
        }
        if (team.participants.length == 2) {
            if (team.participants[0].formerTeamMates.has(team.participants[1])) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
            count = fairnessFactor.filter(Boolean).length;
        }

        if (team.participants.length == 3) {
            if (team.participants[0].formerTeamMates.has(team.participants[1])) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
            if (team.participants[0].formerTeamMates.has(team.participants[2])) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
            if (team.participants[1].formerTeamMates.has(team.participants[2])) {
                fairnessFactor.push(false);
            } else {
                fairnessFactor.push(true);
            }
            count = fairnessFactor.filter(Boolean).length * 0.5;
        }
        return count;
    }

    getPossibleMatches(possibleTeams: Set<Team>): Set<Match> {
        let possibleMatches: Set<Match> = new Set<Match>;
        for (let t of possibleTeams) {
            for (let s of possibleTeams) { 
                if (s != t) {
                    const participantNamesOfS = new Set(s.participants.map(p => p.name));
                    if (!t.participants.some(p => participantNamesOfS.has(p.name))) {
                        possibleMatches.add(new Match(this.globalId++,t,s));
                    } 
                }
            }
        }
        return possibleMatches;
    }

    getFairestMatch(availableParticipants: Participant[] ,possibleMatches: Set<Match>): Match {
        let fairnessPerMatch : { matchId: number, fairnessScore: number }[] = [];
        let possibleMatchesArray = Array.from(possibleMatches)
        for (let m of possibleMatchesArray) {
            let mid = m.id
            fairnessPerMatch.push({'matchId' : mid, 'fairnessScore' : this.getFairnessScore(availableParticipants, m.team1) + this.getFairnessScore(availableParticipants, m.team2)})
        }
        // Get smallest fairnessScore
        fairnessPerMatch.sort((a, b) => b.fairnessScore - a.fairnessScore);
        let index = possibleMatchesArray.findIndex(p => p.id === fairnessPerMatch[0].matchId);
        return possibleMatchesArray[index];
    }

    matchmaking(): Match | undefined {
        let availableParticipants = this.getAvailableParticipants();
        let possibleTeams = this.getPossibleConstillations(shuffle(availableParticipants));

        if (availableParticipants.length >= 4) {
            let possibleMatches = this.getPossibleMatches(possibleTeams);
            console.log(`Participants: ${availableParticipants.length}, Possible Teams: ${possibleTeams.size},Possible Matches: ${possibleMatches.size}`);

            if (possibleMatches.size >= 1) {
                let choosenMatch = this.getFairestMatch(availableParticipants, possibleMatches)
                console.log(choosenMatch.team1.participants.length, "x", choosenMatch.team2.participants.length)
                this.startMatch(choosenMatch);
                return choosenMatch
                
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