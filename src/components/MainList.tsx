import React, {FC, useEffect, useState} from 'react';
import {API_URL, IUser} from '../interfaces/interface';
import axios from 'axios';

interface IOwnProps {
  userId: number
}

const MyComponent: FC<IOwnProps> = ({userId}) => {

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      const result = await axios.get(API_URL + "/user/" + userId);
      setUser(result.data);
    })();
  }, [userId]);

  // useEffect(() => {
  //   // userService.getUserById(userId)
  //   //   .pipe(take(1))
  //   //   .subscribe((data: IUser) => {
  //   //     console.log(data);
  //   //     setUser(data);
  //   //   })
  //   axios.get(API_URL + "/user/" + userId)
  //     .then(
  //       (result) => {
  //         console.log(result.data);
  //         setUser(result.data);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }, [userId]);

  return (
    <p>
      {user?.email}
    </p>
  );
}

export default MyComponent;