import { randomInt } from 'crypto';
import * as faker from 'faker';
import { createConnection, getRepository } from 'typeorm';
import { Product } from '../entity/product.entity';

createConnection().then(async () => {
  const repository = getRepository(Product);

  for (let i = 0; i < 30; i++) {
    await repository.save({
      title: faker.lorem.words(2),
      description: faker.lorem.words(10),
      image: faker.image.imageUrl(200, 200, '', true),
      price: randomInt(10, 100),
    });
  }

  process.exit();
});
