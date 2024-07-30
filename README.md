# ribbon-volleyball / Schleifchenturnier

## Requirements:
- Teams of 2 or 3
- Matches: 2x2, 2x3, 3x3
- Slots: variable number
- Participants: list, variable length, can change over time as players join and leave

- Game plan considers:
	- participant states what constellations they prefer: 2 or 3 or both
	- amount of inserts should be fair
	- constellations should be as different as possible, participants should not be teamed up with the same people too often/ minimize repetitions

- game plan serves as a queue from which 2 teams are taken whenever a slot is available


#### Description:
We are designing the scheduling algorithm for a volleyball match. We have x slots and n participants. We don’t have static teams but each player „plays for themselves“ pointswise - although points are not necessary for our algorithm. We are interested in distributing the participants across teams of 2 or 3 and whenever a slot is free the next two teams are chosen to play a match of 2x2, 2x3 or 3x3. Players that are currently playing a match are unavailable. For more details see above.