import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/feed/slice';
import { useDispatch } from '../../services/store';
import { getFeed } from '../../services/feed/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const ordersState: TOrder[] = useSelector(selectFeedOrders);
  return (
    <>
      {ordersState.length === 0 ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={ordersState}
          handleGetFeeds={() => {
            dispatch(getFeed());
          }}
        />
      )}
    </>
  );
};
