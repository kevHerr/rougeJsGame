import Entity from "./Entities";
import Spawner from "./Spawnner";


class Stairs extends Entity { 
    attributes = {name: 'Stairs', color: 'black', ascii: '>', offset:{x:2, y:2}}

    action(verb, world){
        if (verb === 'bump'){
            world.addToHistory('You moved Downstaris');
            world.createCellularMap();
            world.player.x = 0;
            world.player.y =0;
            world.moveToSpace(world.player);
            world.entities = world.entities.filter(e => e === world.player);
            let spawner = new Spawner(world);
            spawner.spawnLoot(10);
            spawner.spawnMonsters(6);
            spawner.spawnStairs();
        }
    }
}

export default Stairs