import { Match, Team, Participant } from "./ribbonUtils";
import { Scheduler } from "./scheduler";

let konrad = new Participant("Konrad", [2,3])
let participants = [konrad, new Participant("Ekki", [2,3]), new Participant("Kleesi", [3]), new Participant("Birgit", [2]),new Participant("Nena", [2]),new Participant("Jogy", [2,3]),new Participant("Susi", [2,3])]
let scheduler = new Scheduler(participants)

scheduler.addParticipant(new Participant("Anja", [2,3]))

scheduler.listParticipants()
console.log("---Round1---")
scheduler.matchmaking()

scheduler.listParticipants()

console.log("---Round2---")
scheduler.matchmaking()

scheduler.listParticipants()


