import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const lootTable = [
    {name: 'Long Sowrd', color: 'darkgrey', ascii: '/', offset: {x:6, y:3 }},
    {name: 'Healt Potion', color: 'red', ascii: '!', offset: {x:6, y:3 }},
    {name: 'Gold Coin', color: 'yellow', ascii: '$', offset: {x:3, y:3 }},
    {name: 'Ligth Armor', color: 'darkgrey', ascii: '#', offset: {x:4, y:3 }}
]

const monsterTable = [
    {name: 'Goblin', color: 'brown', ascii: '5', offset: {x:6, y:3 }, health: 3},
    {name: 'Wolf', color: 'brown', ascii: '6', offset: {x:6, y:3 }, health: 5},
    {name: 'Spider', color: 'brown', ascii: '7', offset: {x:3, y:3 }, health: 1},
    {name: 'Bat', color: 'brown', ascii: '8', offset: {x:4, y:3 }, health: 2}
]

class Spawner {
    constructor(world){
        this.world = world;

    }
    spawn(spanwCount,createEntity){
        console.log(`spawn count ${spanwCount}`)
        for (let count = 0; count < spanwCount; count++) {
            let entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
            
        }  
    }
    spawnLoot(spanwCount){
        this.spawn(spanwCount, ()=>{
            return new Loot(
                getRandomInt(this.world.width -1),
                getRandomInt(this.world.height -1), 
                this.world.tilesize, 
                lootTable[getRandomInt(lootTable.length)]);
                
        });

    } 

        spawnMonsters(spanwCount){
        this.spawn(spanwCount, ()=>{
            return new Monster(
                getRandomInt(this.world.width -1),
                getRandomInt(this.world.height -1), 
                this.world.tilesize, 
                monsterTable[getRandomInt(monsterTable.length)]);
                
        });
    }


    spawnStairs(){
        let stairs = new Stairs(this.world.width -10,this.world.height -10, this.world.tilesize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);    
    }


}

function getRandomInt(max){

    return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;