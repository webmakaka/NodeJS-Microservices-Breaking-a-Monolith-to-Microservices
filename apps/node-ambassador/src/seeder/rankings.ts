import { createClient } from 'redis';
import { createConnection, getRepository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { User } from '../entity/user.entity';

createConnection().then(async () => {
  const client = createClient({
    url: 'redis://redis:6379',
  });

  await client.connect();

  const ambassadors = await getRepository(User).find({
    is_ambassador: true,
  });

  const orderRepository = getRepository(Order);

  for (let i = 0; i < ambassadors.length; i++) {
    const orders = await orderRepository.find({
      where: {
        user_id: ambassadors[i].id,
        complete: true,
      },
      relations: ['order_items'],
    });

    const revenue = orders.reduce((s, o) => s + o.ambassador_revenue, 0);

    await client.zAdd('rankings', {
      value: ambassadors[i].name,
      score: revenue,
    });
  }

  process.exit();
});
