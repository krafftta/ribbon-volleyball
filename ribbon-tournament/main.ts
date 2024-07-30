import { Match, Team, Participant } from "./ribbonUtils";
import { Scheduler } from "./scheduler";

let konrad = new Participant("Konrad", [2,3])
let participants = [
    konrad, 
    new Participant("Ekki",     [2,3]), 
    new Participant("Kleesi",   [2,3]), 
    new Participant("Birgit",   [3]),
    new Participant("Nena",     [2]),
    new Participant("Jogy",     [2,3]),
    new Participant("Susi",     [2])
]
let scheduler = new Scheduler(participants)

scheduler.listParticipants()
console.log("---Round1---")
scheduler.matchmaking()

scheduler.addParticipant(new Participant("Anja", [3]))
scheduler.listParticipants()

console.log("---Round2---")
scheduler.matchmaking()

scheduler.listParticipants()


