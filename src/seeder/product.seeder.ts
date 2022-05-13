import {createConnections, getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import { randEmail, randFullName, randPost, randImg } from '@ngneat/falso';
import {randomInt} from "crypto";


createConnections().then(async connection =>{
    const repository = getManager().getRepository(Product)
    for (let i = 0; i<100; i++){
        await repository.save({
            title: randEmail(),
            description: randFullName(),
            image: randImg(),
            price: randomInt(10,100)
        })
    }
    process.exit(0);
})
