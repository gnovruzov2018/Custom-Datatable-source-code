import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name: string;
  private users: User[] = [
    new User('qadir', 'password'),
    new User('test', 'password'),
    new User('jack', 'password')
  ];


constructor() { }

login(model: any): boolean {
  for (let i = 0; i < this.users.length; i++) {
    if (this.users[i].username === model.username && this.users[i].password === model.password) {
      localStorage.setItem('username', model.username);
      this.name = model.username;
      return true;
    }
  }
  return false;
}

loggedIn() {
  const username = localStorage.getItem('username');
  return !!username;
}

}
