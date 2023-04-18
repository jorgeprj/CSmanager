import { Team } from '../classes/team/Team'
import { PlayerRepository } from './PlayerRepository';

const fs = require("fs");

export class TeamRepository{
    private connection = require('../database/teams.json');

    public getAll(): Team[]{
        const data = this.connection;
        let teams = new Array();
        for(let team of data){
            teams.push(this.getByID(team.id));
        }
        return teams
    }

    public getByID(id: number): Team{
        const player_repository = new PlayerRepository();
        const team = this.connection[this.getIndex(id)];
        const players = new Array();
        for(let playerID of team.roster){
            players.push(player_repository.getByID(playerID))
        }
        return new Team(team.id, team.name, players)
    }

    public create(team: Team): void{
        const teams = this.connection;
        let newID = teams.length > 0 ? teams[teams.length - 1].id + 1 : 1;
        team.setID(newID);
        let dbTeam = { 
                        id: team.getID(),
                        name: team.getName(),
                        roster: team.getRosterIDs(),
                     }
        teams.push(dbTeam);
        this.save(teams);
    }

    public update(id: number, team: Team): void{
        const teams = this.getAll();
        const index = this.getIndex(id);
        teams[index] = team;
        this.save(teams);
    }

    public delete(id: number): void{
        const teams = this.getAll();
        const index = this.getIndex(id);
        teams.splice(index, 1);
        this.save(teams);
    }

    private save(data: Team[]): void{
        fs.writeFile('src/database/teams.json', JSON.stringify(data, null, '\t'), (Error: any) => {
            if (Error) throw Error; 
            console.log("Update done!"); 
        });
    }

    private getIndex(id: number): number{
        return this.connection.findIndex((i: { id: number; }) => i.id === id);
    }
}
