import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { selectFeeds, selectFeedOrders } from '../../services/feed/slice'

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const ordersState = useSelector(selectFeedOrders)
  const feedState = useSelector(selectFeeds)
  if (feedState) {
    const orders = ordersState;
    const feed = feedState;

    const readyOrders = getOrders(orders, 'done');
    const pendingOrders = getOrders(orders, 'pending');
    return (
      <FeedInfoUI
        readyOrders={readyOrders}
        pendingOrders={pendingOrders}
        feed={feed}
      />
    );
  };
};
