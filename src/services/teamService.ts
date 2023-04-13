import { Team } from "../classes/team";
import { TeamRepository } from "../repositories/teamRepository";
import { InvalidIdException } from "./exceptions";

export class TeamService{
    private repository = new TeamRepository();

    public getAll(): Team[]{
        return this.repository.getAll()
    }

    public getByID(id: number): Team{
        this.validateID(id);
        return this.repository.getByID(id);
    }

    public create(Team: Team): void{
        this.repository.create(Team)
        console.log(`(#${(Team.getID())}) ${Team.getName()} has been inserted!`);
    }

    public update(id: number, Team: Team): void{
        this.validateID(id);
        this.repository.update(id, Team);
    }

    public delete(id: number): void{
        this.validateID(id);
        this.repository.delete(id);
    }

    public validateID(id: number){
        if (!this.repository.getByID(id))
            throw new InvalidIdException(`Team with ID ${id} not found!`);
    }
}