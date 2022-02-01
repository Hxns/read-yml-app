import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})

export class SocketWebService {
  public dataTemperature$: BehaviorSubject<string> = new BehaviorSubject('');
  public dataPower$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  socket = io('http://localhost:3000');

  public getTemperature = () => {
    this.socket.emit('getTemperature', '');
    this.socket.on('getTemperature', (data: any) => {
      this.dataTemperature$.next(data);
    });
    return this.dataTemperature$.asObservable();
  };
  public getPower = () => {
    this.socket.emit('getPower', '');
    this.socket.on('getPower', (data: any) => {
      this.dataPower$.next(data);
    });
    return this.dataPower$.asObservable();
  };
}
