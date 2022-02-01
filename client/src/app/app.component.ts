import { Component, OnInit } from '@angular/core';

import { SocketWebService } from './services/socket-web.service';

import { ChartDataSets, ChartOptions } from 'chart.js';

import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  myArray: any = [];
  resultData: any = [];
  lineChartData: ChartDataSets[] = [
    { data: [this.myArray], label: 'Energy' },
    { data: [], label: 'Temperature' },
  ];
  label = 0;

  lineChartLabels: any[] = [0, 0];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(255,255,0,0.28)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgb(123,156,239)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: any = 'line';
  requestInterval: any;
  result: any;
  lastTemperature: number;
  lastPower: number;
  constructor(private socket: SocketWebService) {
    this.lastTemperature = 0;
    this.lastPower = 0;
  }

  ngOnInit() {
    this.getTemperature();
    this.getPower();
  }

  getTemperature() {
    this.socket.getTemperature().subscribe(async (data: any) => {
      if (data) {
        data = JSON.parse(data);
        this.lineChartLabels.push(this.label + 50);
        this.lineChartData[1].data?.push(data.value);
        this.lastTemperature = data.value;
      }
    });
  }

  getPower() {
    this.socket.getPower().subscribe(async (data: any) => {
      if (data) {
        data = JSON.parse(data);
        this.lineChartData[0].data?.push(data.value);
        this.lastPower = data.value;
      }
    });
  }

  sleep = async (timeout: any) => {
    return await new Promise((resolve) => setTimeout(resolve, timeout));
  };
}

