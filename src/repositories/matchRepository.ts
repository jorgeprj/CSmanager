import { Match } from '../classes/match/Match'

const fs = require("fs");

export class MatchRepository{
    private connection = require('../database/matches.json');

    public getAll(): Match[]{
        const data = this.connection;
        let matches = new Array();
        for(let matchData of data){
            matches.push(new Match(matchData.id, matchData.idTeamA, matchData.idTeamB, matchData.scoreTeamA, matchData.scoreTeamB, matchData.maps));
        }
        return matches
    }

    public getByID(id: number): Match{
        const match = this.connection[this.getIndex(id)];
        return new Match(match.id, match.idTeamA, match.idTeamB, match.scoreTeamA, match.scoreTeamB, match.maps);
    }

    public create(match: Match): void{
        const matches = this.getAll();
        let newID = matches.length > 0 ? matches[matches.length - 1].getID() + 1 : 1;
        match.setID(newID);
        matches.push(match);
        this.save(matches);
    }

    public update(id: number, match: Match): void{
        const matches = this.getAll();
        const index = this.getIndex(id);
        matches[index] = match;
        this.save(matches);
    }

    public delete(id: number): void{
        const matches = this.getAll();
        const index = this.getIndex(id);
        matches.splice(index, 1);
        this.save(matches);
    }

    private save(data: Match[]): void{
        fs.writeFile('src/database/matches.json', JSON.stringify(data, null, '\t'), (Error: any) => {
            if (Error) throw Error; 
            console.log("Update done!"); 
        });
    }

    private getIndex(id: number): number{
        return this.connection.findIndex((i: { id: number; }) => i.id === id);
    }
}
