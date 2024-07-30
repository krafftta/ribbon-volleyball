import { Match, Team, Participant } from "./ribbonUtils";
import { Scheduler } from "./scheduler";

let konrad = new Participant("Konrad", [2,3]);
let participants = [
    konrad, 
    new Participant("Ekki",     [2,3]), 
    new Participant("Kleesi",   [2]), 
    new Participant("Birgit",   [3]),
    new Participant("Nena",     [2]),
    new Participant("Jogy",     [2,3]),
    new Participant("Susi",     [2])
];
let scheduler = new Scheduler(participants);

console.log("---Round1---");
scheduler.matchmaking();

scheduler.addParticipant(new Participant("Anja", [3]));
scheduler.listParticipants();

console.log("---Round2---");
let match = scheduler.matchmaking();
scheduler.listParticipants();
scheduler.finishMatch(scheduler.playing[0].id);
scheduler.finishMatch(scheduler.playing[0].id);

console.log("---Round3---");
scheduler.matchmaking();
scheduler.listParticipants();

console.log("---Round4---");
scheduler.matchmaking();
scheduler.listParticipants();
scheduler.finishMatch(scheduler.playing[0].id);

console.log("---Round5---");
scheduler.matchmaking();
scheduler.listParticipants();


