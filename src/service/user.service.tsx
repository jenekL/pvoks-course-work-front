import axios from 'axios';
import {API_URL, IUser} from '../interfaces/interface';
import {Observable, of} from 'rxjs';

class UserService {
  public getUserById(id: number): Observable<IUser> {
    return of(this.get(API_URL + "/user/" + id));
  }

  // @ts-ignore
  private get(url: string): IUser {
    axios.get(url)
      .then(
        (result) => {
          console.log(result.data);
          return result.data;
        },
        (error) => {
          console.log(error);
        }
      )
  }
}

export const userService = new UserService();