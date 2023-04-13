# Code Documentation

***Important Notice: This Code Document is subject to change throughout the game development process. New classes, methods and functions can be added or removed to enhance the player's experience. This document should be used as a general guide and should not be considered as the final version of the code.***

## Overview

This document aims to document the source code of "Counter Strike Manager" in its entirety. Classes, as well as their attributes, methods, and relationships. Functions and their logic are also documented.

### Class Diagram

:::mermaid
classDiagram
    class Player{
        -id: number
        -name: string
        -nickname: string
        -age: number
        -skills: number
    }

    class Team{
        -id: number
        -name: string
        -lineup: number[]
    }

    class MatchMapTeam{
        -id: number
        -players: MatchMapPlayer[]
        +filterAlivePlayers(): MatchMapTeam
        +selectRandomPlayer(): MatchMapPlayer
        +isTeamDead(): boolean
        +resetPlayersHealth: void
    }

    class MatchMapPlayer{
        -id: number
        -health: number
        +kill(): void
        +resetHealth(): void
        +isDead(): boolean
    }

    class MatchMap{
        -id: number
        -idTeamA: number;
        -idTeamB: number;
        -scoreTeamA: number
        -scoreTeamB: number
        +getWinner(): string
        +play(): void
        -playOvertime(): void
        -playRound(playersTeamA: MatchMapTeam, playersTeamB: MatchMapTeam): void
        -playEncounter(playerCT: MatchMapPlayer, playerT: MatchMapPlayer): void
        -printKill(idKiller: number, idKilled: number): void
    }

    class Match{
        -id: number
        -idTeamA: number
        -idTeamB: number
        -scoreTeamA: number
        -scoreTeamB: number
        -mapsPlayed: MatchMap[]
        +getScore(): void
    }

    Team *-- Player
    Match *-- MatchMap
    Match <|-- "Play" Team
    MatchMapTeam *-- MatchMapPlayer
    MatchMapTeam --> "Play" MatchMap
:::


## Class ``Player``
- Location: [``src/classes/player.ts``](/src/classes/player.ts)

Represents a counter strike player in the system.

### Attributes
- ``id: number`` - The player's id.
- ``name: string`` - The player's name.
- ``nickname: string`` - The player's nickname.
- ``age: number`` - The player's age.
- ``skills: number`` - The player's skills *(single value)*.

### Methods

- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the player's `id`.

- ``getName()`` e ``setName(name: string)`` Getter and setter methods for the player's `name`.

- ``getNickname()`` e ``setNickname(nickname: string)`` Getter and setter methods for the player's `nickname`.

- ``getAge()`` e ``setAge(age: number)`` Getter and setter methods for the player's `age`.

- ``getSkills()`` e ``setSkills(skills: number)`` Getter and setter methods for the player's `skills`.

### Relations
- *Player* plays for a *Team*.


## Class ``Team``
- Location: [``src/classes/team.ts``](/src/classes/team.ts)

Represents a counter strike team in the system.

### Attributes
- ``id: number`` - The team's name.
- ``name: string`` - The team's age.
- ``lineup: number[]`` - The id of the team's players.
  
### Methods
- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the team's `id`.

- ``getName()`` e ``setName(name: string)`` Getter and setter methods for the team's `name`.

- ``getLineup()`` Getter method for the team's `lineup`.
- ``addPlayer(playerID: number)`` Method to add a player to the team's `lineup`.
- ``removePlayer(playerID: number)`` Method to remove a player from the team's `lineup`.

### Relations
- *Team* has *Players* represented by the players id in *lineup*.


## Class ``MatchMapPlayer``
- Location: [``src/classes/match.ts``](/src/classes/match.ts)

Represents a player during a counter strike match map in the system

### Attributes
- ``id: number`` - The team's id.
- ``health: number`` - Player's health.
  
### Methods
- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the player's `id`.

- ``getHealth()`` e ``setHealth(health: number)`` Getter and setter methods for the player's `health`.

- ``kill()`` Method that sets the player's `health` to 0, effectively killing them. 
  
- ``resetHealth()`` Method that sets the player's `health` back to 100.

- ``selectRandomPlayer(): MatchMapPlayer`` Method that returns a randomly-selected `MatchMapPlayer` object from the current team. 
  
- ``isDead(): boolean`` Method that returns a boolean indicating whether the player is dead or not, based on their current `health` points (health <= 0).

### Relations
- *MatchMapPlayer* represents a *Player* during the match.
- *MatchMapPlayer* plays for a *MatchMapTeam*.
- *MatchMapPlayer* plays a *MatchMap*.


## Class ``MatchMapTeam``
- Location: [``src/classes/match.ts``](/src/classes/match.ts)

Represents a team during a counter strike match map in the system

### Attributes
- ``id: number`` The team's id.
- ``players: MatchMapPlayer[]`` Team's players.
  
### Methods
- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the team's `id`.

- ``getPlayers()`` Getter method for the team's `players`.

- ``setPlayers()`` Method that sets the team's `players` by fetching their IDs from a `TeamService`, creating new `MatchMapPlayer` objects for each ID.
  
- ``filterAlivePlayers(): MatchMapTeam`` Method that returns a new `MatchMapTeam` object with only the alive players from the current team. It does this by filtering out any `MatchMapPlayer` objects whose `isDead()` method returns `true`.

- ``selectRandomPlayer(): MatchMapPlayer`` Method that returns a randomly-selected `MatchMapPlayer` object from the current team. 
  
- ``isDead(): boolean`` Method that returns a boolean value indicating whether all the players on the team are dead. It does this by checking whether every `MatchMapPlayer` object in the `players` array has `isDead()` equal to `true`.

- ``resetPlayersHealth(): void`` Method that resets the health of all the players on the team. It does this by calling the `resetHealth()` method on each `MatchMapPlayer` object in the `players` array.


### Relations
- *MatchMapTeam* represents a *Team* during the match.
- *MatchMapTeam* is made up of *MatchMapPlayers*.
- *MatchMapTeam* plays a *MatchMap*.


## Class ``MatchMap``
- Location: [``src/classes/match.ts``](/src/classes/match.ts)

Represents a map of a counter strike match in the system.

### Attributes
- ``id: number`` The match map's id.
- ``idTeamA: number`` The Team A's id.
- ``idTeamB: number`` The Team B's id.
- ``scoreTeamA: number`` Team A's score on the match map.
- ``scoreTeamB: number`` Team B's score on the match map.
  
### Methods
- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the match map's `id`.

- ``getIDTeamA()`` e ``setIDTeamA(id: number)`` Getter and setter methods for the `idTeamA`.

- ``getIDTeamB()`` e ``setIDTeamB(id: number)`` Getter and setter methods for the `idTeamB`.

- ``getScoreTeamA()`` e ``setScoreTeamA(score: number)`` Getter and setter methods for the `scoreTeamA`.
- ``addScoreTeamA()`` Method that increments the value of `scoreTeamA` by 1.

- ``getScoreTeamB()`` e ``setScoreTeamB(score: number)`` Getter and setter methods for the `scoreTeamB`.
- ``addScoreTeamB()`` Method that increments the value of `scoreTeamB` by 1.

- ``getWinner()`` Method that compares the scores of Team A and Team B and returns the letter *"A"* if Team A has a higher score, and *"B"* if Team B has a higher score.

- ``play()`` Method simulates a game between the two teams, with a maximum of 30 rounds. The method creates instances of the `MatchMapTeam` class for each team, and sets their players. It then plays rounds by calling the `playRound()` method until one team reaches a score of 16. If both teams reach 15 points, it calls the `playOvertime()` method.

- ``playOvertime()`` Method simulates a overtime between the two teams, with a maximum of 6 rounds. It then plays rounds by calling the `playRound()` method until one team reaches a score of 4. If both teams reach 3 points, it calls the `playOvertime()` method again.

- ``playRound(playersTeamA: MatchMapTeam, playersTeamB: MatchMapTeam)`` Method plays one round of the match. It selects a random player from each team and simulates an encounter between them using the `playEncounter() ` method. It then checks if any players have been killed and updates the scores accordingly. At the end, the health of all players is reset.

- ``playEncounter(playerCT: MatchMapPlayer, playerT: MatchMapPlayer)`` Method randomly determines which player wins the encounter and kills the other player. It prints a message to the console with the names of the players involved.

- ``printKill(idKiller: number, idKilled: number)`` Method prints out a message to the console using the nicknames of the killer and the killed players, indicating that the killer has killed the killed player.


### Logic
The logic of the match simulation, ``play()`` method, through the methods: ``playRound()``, ``playEncounter()`` and ``playOvertime()``.

1. **Initialization:** At the beginning of the play() method, two teams are created using an instance of the MatchMapTeam class, with their players being defined by the setPlayers() method. Additionally, the maximum number of rounds is set to 30 using the MAX_ROUNDS constant, and the currentRound variable is initialized to one.
   
2. **Round Loop:** The `play()` method executes a while loop to simulate each round of the game. While the current round number is less than or equal to the *MAX_ROUNDS* constant, the loop continues to simulate rounds. For each round, it calls the `playRound()` method, passing the lineups of Teams A and B as arguments.

3. **Round Simulation:** The `playRound()` method is responsible for simulating a round of the game. It initiates a while loop to simulate encounters between the players of each team. For each iteration of the loop, the `playEncounter()` method is called, passing as parameters two randomly selected players from each team. At the end, the health of all players is reset.

4. **Score Verification:** After simulating the round, it is verified whether one of the teams has reached the maximum score of 16 points. If so, the match is ended and the final result is displayed with the message *"Map ended. [scoreTeamA] x [scoreTeamB]"*. Otherwise, the loop continues to the next round.

5. **Tie Verification:** If the result after 30 rounds is a tie of 15-15, the `play()` method calls the `playOvertime()` method to decide the winner. Otherwise, the game ends with the team that reached 16 points first as the winner.

6. **Overtime:** If there is a tie of 15-15, the `play()` method calls the `playOvertime()` method to decide the winner. The `playOvertime()` method simulates an overtime round by calling the `playRound()` method again, which calls the `playEncounter()` function to simulate the encounter between one player from each team. The process of simulating rounds is repeated until one team wins 4 rounds. If there is another tie, the `playOvertime()` method is called again.

7. **End:** At the end of the game, the `play()` method is finished.

### Relations
- *MatchMap* is played by *MatchMapTeam*.
- *MatchMap* is played within a *Match*.


## Class ``Match``
- Location: [``src/classes/match.ts``](/src/classes/match.ts)

Represents a complete Match of a counter strike in the system.

### Attributes
- ``id: number`` The match's id.
- ``idTeamA: number`` The Team A's id.
- ``idTeamB: number`` The Team B's id.
- ``scoreTeamA: number`` Team A's score in the match (number of maps won).
- ``scoreTeamB: number`` Team B's score in the match (number of maps won).
- ``maps: MatchMap[]`` Maps played during the match.
  
### Methods
- ``getID()`` e ``setID(id: number)`` Getter and setter methods for the match's `id`.

- ``getIDTeamA()`` e ``setIDTeamA(id: number)`` Getter and setter methods for the match's `idTeamA`.

- ``getIDTeamB()`` e ``setIDTeamB(id: number)`` Getter and setter methods for the match's `idTeamB`.

- ``getScoreTeamA()`` e ``setScoreTeamA(score: number)`` Getter and setter methods for the match's `scoreTeamA`.
- ``addScoreTeamA()`` Method that increments the value of `scoreTeamA` by 1.

- ``getScoreTeamB()`` e ``setScoreTeamB(score: number)`` Getter and setter methods for the match's `scoreTeamB`.
- ``addScoreTeamB()`` Method that increments the value of `scoreTeamB` by 1.

- ``setScore(map: MatchMap)`` Method that adds the score for the winning team of the map given as a parameter.

- ``getMaps()`` Getter method for the match's `maps`.
- ``addMap()`` Method that adds a `MatchMap` to be played.
- ``removeMap()`` Method that removes the last `MatchMap` from `maps`.

- ``play(numberOfMaps: number)`` Method that plays a complete match with a maximum *numberOfMaps* that must be played.


## Project Structure
To learn more about the project structure, check out the [STRUCTURE.md](docs/STRUCTURE.md) file, which describes how the project is organized and divided into its different parts.


## Contributing
If you would like to contribute to the development of "Counter Strike Manager", please read the instructions in [CONTRIBUTING.md](docs/contributing/CONTRIBUTING.md) before getting started. There you will find information on how to contribute code, contribute to documentation, and report issues. We appreciate any kind of help, from bug fixes to new features!