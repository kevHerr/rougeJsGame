import React, { useEffect, useRef, useState } from "react";
import InputManager from "./inputManager";

import World from "./World";
import Spawner from "./Spawnner";

    


const ReactRouge = ({width, height, tilesize}) =>{

    const canvasRef = useRef();
    //const  [player, setPlayer] = useState(new Player(1,2, tilesize) );
    const [world, setWorld] = useState(new World(width, height, tilesize));
    let inputManager = new InputManager();


    const handleInput = (action, data ) => {
        console.log(`handle input : ${action}:${JSON.stringify(data)}`)
        let newWorld = new World();
        Object.assign(newWorld, world);
        
        newWorld.movePlayer(data.x, data.y);
        setWorld(newWorld);
        

        
        

    }
    

    useEffect(()=>{
        console.log('create map');
        let newWorld =new World();
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(world.player);
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(14);
        spawner.spawnMonsters(6);
        spawner.spawnStairs();
        setWorld(newWorld);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        console.log('binding input')
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () =>{
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        }
    });


    const [cameraX, setCameraX] = useState(0);
    const [cameraY, setCameraY] = useState(0);


    useEffect(()=>{
        console.log('Draw to the canvas')
    
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0,0, width * tilesize, height * tilesize);
        const bigCanvas = document.createElement('canvas');
        bigCanvas.width = world.width * tilesize;
        bigCanvas.height = world.height * tilesize;
        const bigCtx = bigCanvas.getContext('2d');
        world.draw(bigCtx);
        ctx.drawImage(
            bigCanvas,
            cameraX, cameraY,
            width * tilesize, height *tilesize,
            0,0,
            width *tilesize, height *tilesize
        );
    
        
        //player.draw(ctx);
    }, [cameraX,cameraY, world]);

    const viewportWidth = 500;
    const viewportHeight = 500;
    const canvasWidht = width * tilesize;
    const canvasHeight = height * tilesize;



    return(
    <> 
    <canvas 
        ref= {canvasRef}
        width= {viewportWidth} 
        height={viewportHeight}
        
        style={{border: '1px solid black', background: 'DimGray'}}>

    </canvas>
    <ul>
        {world.player.inventory.map((item, index)=> (<li key={index}>{item.attributes.name} </li>))}
    </ul>

    <ul>
        {world.history.map((item, index)=> (<li key={index}>{item} </li>))}
    </ul>
    </>    
)};


export default ReactRouge;