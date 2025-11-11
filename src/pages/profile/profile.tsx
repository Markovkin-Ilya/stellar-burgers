import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store'
import { selectUser } from '../../services/user/slice'
import { update } from '../../services/user/actions'

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  if (user) {
    const [formValue, setFormValue] = useState({
      name: user.name,
      email: user.email,
      password: ''
    });

    useEffect(() => {
      setFormValue((prevState) => ({
        ...prevState,
        name: user?.name || '',
        email: user?.email || ''
      }));
    }, [user]);

    const isFormChanged =
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      const user = {
        email: formValue.email,
        name: formValue.name,
        password: formValue.password,
      }
      dispatch(update(user))
    };

    const handleCancel = (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

    return (
      <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    );
  }
};
