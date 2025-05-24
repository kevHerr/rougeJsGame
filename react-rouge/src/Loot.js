import Entity from "./Entities";


class Loot extends Entity{
    action(verb, world){
        if (verb === 'bump'){
            console.log('pick up', this);
            world.player.add(this);
            world.remove(this);
        }
        if (verb === 'drop'){
            console.log('drop', this);
        }
    }

}

export default Loot;