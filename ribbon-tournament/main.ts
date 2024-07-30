import { Match, Team, Participant } from "./ribbonUtils";
import { Scheduler } from "./scheduler";

let konrad = new Participant("Konrad", [3])
let participants = [konrad, new Participant("Ekki", [2,3]), new Participant("Kleesi", [3]), new Participant("Birgit", [2])]
let scheduler = new Scheduler(participants)

scheduler.addParticipant(new Participant("Anja", [2,3]))

scheduler.listParticipants()
const [teams2, teams3] = scheduler.getPossibleConstillations()

for (let t of teams3) {
    t.participants.forEach(p => console.log(p.name))
    console.log("---")
}

for (let t of teams2) {
    t.participants.forEach(p => console.log(p.name))
    console.log("---")
}

var it = teams2.values();
scheduler.startMatch(new Match(1, it.next().value, it.next().value))
scheduler.listParticipants()