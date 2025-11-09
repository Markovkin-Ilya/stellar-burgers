import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectOrders } from '../../services/feed/slice'
import { useDispatch } from '../../services/store'
import { getFeed } from '../../services/feed/actions'


export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
    
  const ordersState: TOrder[] = useSelector(selectOrders)
  return (
    <>
      {ordersState.length === 0 ? (
        <Preloader />
      ) : (
        <FeedUI orders={ordersState} handleGetFeeds={() => {
      dispatch(getFeed())
      }} />
      )}
    </>
  );
};
