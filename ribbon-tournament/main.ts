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
    new Participant("Susi",     [3]),
    new Participant("A",        [2,3]),
    new Participant("B",        [2,3]),
    new Participant("C",        [3]),
    new Participant("D",        [2]),
    new Participant("E",        [3]),
    new Participant("F",        [2,3]),
    new Participant("G",        [2]),
    new Participant("H",        [3]),
    new Participant("I",        [2,3]),
    new Participant("J",        [2]),
    new Participant("K",        [3]),
    new Participant("L",        [2,3]),
    new Participant("M",        [3])
];

let scheduler = new Scheduler(participants);

// intial games: 3 courts to play on
scheduler.matchmaking();
scheduler.matchmaking();
scheduler.matchmaking();

for (let i=3; i<49; i++) {
    console.log(`---Round ${i+1} ---`);
    scheduler.finishMatch(scheduler.playing[0].id);
    scheduler.matchmaking();
}

scheduler.listParticipants();

// scheduler.addParticipant(new Participant("Anja", [3]));




