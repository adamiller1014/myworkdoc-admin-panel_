import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'app/core/api/profile.service';
import {
    ChartComponent,
  
  } from "ng-apexcharts";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent {
    @ViewChild('chartObj') chart: ChartComponent;

    profilesDateRange = {
        name: '30 Days',
        value: 30
    };

    profilesDateRangeOptions = [{
        name: '30 Days',
        value: 30
    }, {
        name: '60 Days',
        value: 60
    }, {
        name: '90 Days',
        value: 90
    }, {
        name: '2 Days',
        value: 2
    }]

    profile_total = 0;
    conversions = {
        labels: [
        ],
        series: [
            {
                name: 'Profiles Added',
                data: []
            }
        ]
    }
    // profiles
    chartConversions = {
        chart: {
            animations: {
                enabled: false
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'area',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#38BDF8'],
        fill: {
            colors: ['#38BDF8'],
            opacity: 0.5
        },
        series: this.conversions.series,
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            followCursor: true,
            theme: 'dark'
        },
        xaxis: {
            type: 'category',
            categories: this.conversions.labels
        },
        yaxis: {
            labels: {
                formatter: (val): string => val.toString()
            }
        }
    };


    chartAge = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#DD6B20', '#F6AD55'],
        labels: ['Over 30', 'Under 30'],
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%'
                }
            }
        },
        series: [],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
            custom: ({
                seriesIndex,
                w
            }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                            </div>`
        }
    };
    /**
     * Constructor
     */
    
    constructor(private _profileService: ProfileService) {
        this.getProfileCounts(this.profilesDateRange.value);
        this.getProfileAge(30);
    }
    getTotal(marks: any) {
        let total = 0;

        marks.forEach((item: number) => {
            total += Number(item);
        });

        return total;
    }

    getProfileCounts(range: Number) {
        this._profileService.a_count_profiles(range).subscribe((data) => {
            if (data.success) {

                data.results.forEach(result => {
                    this.conversions.series[0].data.push(Number(result.profiles))
                    this.conversions.labels.push(new Date(result.date).toLocaleDateString())
                });


                this.chart.updateOptions({
                    chart: {
                        animations: {
                            enabled: false
                        },
                        fontFamily: 'inherit',
                        foreColor: 'inherit',
                        height: '100%',
                        type: 'area',
                        sparkline: {
                            enabled: true
                        }
                    },
                    colors: ['#38BDF8'],
                    fill: {
                        colors: ['#38BDF8'],
                        opacity: 0.5
                    },
                    series: this.conversions.series,
                    stroke: {
                        curve: 'smooth'
                    },
                    tooltip: {
                        followCursor: true,
                        theme: 'dark'
                    },
                    xaxis: {
                        type: 'category',
                        categories: this.conversions.labels
                    },
                 
                });

                this.profile_total = this.conversions.series[0].data.reduce((a, b) => a + b, 0);

            }
        })
    }
    changeProfilesDateRange(item: any) {
        this.conversions.labels = [];
        this.conversions.series[0].data = [];
        this.profilesDateRange = item;
        
        this.getProfileCounts(this.profilesDateRange.value);

    }
    getProfileAge(age: Number) {
        this._profileService.a_count_age(age).subscribe((data) => {
            if (data.success) {

                this.chartAge.series.push(Number(data.results.older_than))
                this.chartAge.series.push(Number(data.results.under))

            }
        })
    }
}
