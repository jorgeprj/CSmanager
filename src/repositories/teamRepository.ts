import { Team } from '../classes/Team'

const fs = require("fs");

export class TeamRepository{
    private connection = require('../database/teams.json');

    public getAll(): Team[]{
        const data = this.connection;
        let teams = new Array();
        for(let teamData of data){
            teams.push(new Team(teamData.id, teamData.name, teamData.lineup));
        }
        return teams
    }

    public getByID(id: number): Team{
        const team = this.connection[this.getIndex(id)];
        return new Team(team.id, team.name, team.lineup);
    }

    public create(entity: Team): void{
        const teams = this.getAll();
        let newID = teams.length > 0 ? teams[teams.length - 1].getID() + 1 : 1;
        entity.setID(newID);
        teams.push(entity);
        this.save(teams);
    }

    public update(id: number, entity: Team): void{
        const teams = this.getAll();
        const index = this.getIndex(id);
        teams[index] = entity;
        this.save(teams);
    }

    public delete(id: number): void{
        const teams = this.getAll();
        const index = this.getIndex(id);
        teams.splice(index, 1);
        this.save(teams);
    }

    private save(data: Team[]): void{
        fs.writeFile('src/database/players.json', JSON.stringify(data, null, '\t'), (Error: any) => {
            if (Error) throw Error; 
            console.log("Update done!"); 
        });
    }

    private getIndex(id: number): number{
        return this.connection.findIndex((i: { id: number; }) => i.id === id);
    }
}
