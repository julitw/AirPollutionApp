import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AirPollutionWorldService } from '../air-pollution-world.service';

@Component({
  selector: 'app-air-pollution-world-filter',
  templateUrl: './air-pollution-world-filter.component.html',
  styleUrls: ['./air-pollution-world-filter.component.css']
})
export class AirPollutionWorldFilterComponent implements AfterViewInit {

  @ViewChild("slider_co_min", { static: false }) slider_co_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_co_max", { static: false }) slider_co_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_no_min", { static: false }) slider_no_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_no_max", { static: false }) slider_no_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_no2_min", { static: false }) slider_no2_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_no2_max", { static: false }) slider_no2_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_o3_min", { static: false }) slider_o3_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_o3_max", { static: false }) slider_o3_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_so2_min", { static: false }) slider_so2_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_so2_max", { static: false }) slider_so2_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_pm2_5_min", { static: false }) slider_pm2_5_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_pm2_5_max", { static: false }) slider_pm2_5_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_pm10_min", { static: false }) slider_pm10_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_pm10_max", { static: false }) slider_pm10_max: ElementRef<HTMLInputElement>;

  @ViewChild("slider_nh3_min", { static: false }) slider_nh3_min: ElementRef<HTMLInputElement>;
  @ViewChild("slider_nh3_max", { static: false }) slider_nh3_max: ElementRef<HTMLInputElement>;


  form: FormGroup;
  initialFormValues: any;

  constructor(private formBuilder: FormBuilder, private airPollutionWorldSerice: AirPollutionWorldService) {
    this.form = this.formBuilder.group({
      co_min: [0, Validators.required],
      slider_co_min: [0, Validators.required],
      co_max: [2000, Validators.required],
      slider_co_max: [2000, Validators.required],

      no_min: [0, Validators.required],
      slider_no_min: [0, Validators.required],
      no_max: [1000, Validators.required],
      slider_no_max: [1000, Validators.required],

      no2_min: [0, Validators.required],
      slider_no2_min: [0, Validators.required],
      no2_max: [1000, Validators.required],
      slider_no2_max: [1000, Validators.required],

      o3_min: [0, Validators.required],
      slider_o3_min: [0, Validators.required],
      o3_max: [1000, Validators.required],
      slider_o3_max: [1000, Validators.required],

      so2_min: [0, Validators.required],
      slider_so2_min: [0, Validators.required],
      so2_max: [1000, Validators.required],
      slider_so2_max: [1000, Validators.required],

      pm2_5_min: [0, Validators.required],
      slider_pm2_5_min: [0, Validators.required],
      pm2_5_max: [1000, Validators.required],
      slider_pm2_5_max: [1000, Validators.required],

      pm10_min: [0, Validators.required],
      slider_pm10_min: [0, Validators.required],
      pm10_max: [1000, Validators.required],
      slider_pm10_max: [1000, Validators.required],

      nh3_min: [0, Validators.required],
      slider_nh3_min: [0, Validators.required],
      nh3_max:[1000, Validators.required],
      slider_nh3_max: [1000, Validators.required],

      

    });

    this.initialFormValues = { ...this.form.value }
    
    this.form.get("slider_co_min").valueChanges.subscribe(val => {
      this.form.get("co_min").setValue(val);
    });

    this.form.get("slider_co_max").valueChanges.subscribe(val => {
      this.form.get("co_max").setValue(val);
    });

    this.form.get("slider_no_min").valueChanges.subscribe(val => {
      this.form.get("no_min").setValue(val);
    });

    this.form.get("slider_no_max").valueChanges.subscribe(val => {
      this.form.get("no_max").setValue(val);
    });

    this.form.get("slider_no2_min").valueChanges.subscribe(val => {
      this.form.get("no2_min").setValue(val);
    });

    this.form.get("slider_no2_max").valueChanges.subscribe(val => {
      this.form.get("no2_max").setValue(val);
    });

    this.form.get("slider_o3_min").valueChanges.subscribe(val => {
      this.form.get("o3_min").setValue(val);
    });

    this.form.get("slider_o3_max").valueChanges.subscribe(val => {
      this.form.get("o3_max").setValue(val);
    });

    this.form.get("slider_so2_min").valueChanges.subscribe(val => {
      this.form.get("so2_min").setValue(val);
    });

    this.form.get("slider_so2_max").valueChanges.subscribe(val => {
      this.form.get("so2_max").setValue(val);
    });

    this.form.get("slider_pm2_5_min").valueChanges.subscribe(val => {
      this.form.get("pm2_5_min").setValue(val);
    });

    this.form.get("slider_pm2_5_max").valueChanges.subscribe(val => {
      this.form.get("pm2_5_max").setValue(val);
    });

    this.form.get("slider_pm10_min").valueChanges.subscribe(val => {
      this.form.get("pm10_min").setValue(val);
    });

    this.form.get("slider_pm10_max").valueChanges.subscribe(val => {
      this.form.get("pm10_max").setValue(val);
    });

    this.form.get("slider_nh3_min").valueChanges.subscribe(val => {
      this.form.get("nh3_min").setValue(val);
    });

    this.form.get("slider_nh3_max").valueChanges.subscribe(val => {
      this.form.get("nh3_max").setValue(val);
    });
  }

  ngAfterViewInit() {
    this.setupSlider(this.slider_co_min);
    this.setupSlider(this.slider_co_max);
    this.setupSlider(this.slider_no_min);
    this.setupSlider(this.slider_no_max);
    this.setupSlider(this.slider_no2_min);
    this.setupSlider(this.slider_no2_max);
    this.setupSlider(this.slider_o3_min);
    this.setupSlider(this.slider_o3_max);
    this.setupSlider(this.slider_so2_min);
    this.setupSlider(this.slider_so2_max);
    this.setupSlider(this.slider_pm2_5_min);
    this.setupSlider(this.slider_pm2_5_max);
    this.setupSlider(this.slider_pm10_min);
    this.setupSlider(this.slider_pm10_max);
    this.setupSlider(this.slider_nh3_min);
    this.setupSlider(this.slider_nh3_max);
  }

  private setupSlider(slider: ElementRef<HTMLInputElement>) {
    slider.nativeElement.oninput = () => {
      const sliderValue = slider.nativeElement as HTMLInputElement;
      sliderValue.style.background = `linear-gradient(to right, #f36621 0%, #f36621 ${sliderValue.value}%, #eeeeee ${sliderValue.value}%, #eeeeee)`;
    };
  }

  changeInputTip(value: any) {
    this.form.get("slider_co_min").setValue(+value);
  }

  changeInputTip2(value: any) {
    this.form.get("slider_co_max").setValue(+value);
  }

  changeInputNo(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputNoMax(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputNo2(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputNo2Max(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputo3(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputo3Max(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputso2(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputso2Max(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputpm2_5(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputpm2_5Max(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputpm10(value: any) {
    this.form.get("slider_no_min").setValue(+value);
  }

  changeInputpm10Max(value: any) {
    this.form.get("slider_no_max").setValue(+value);
  }

  changeInputnh3(value: any) {
    this.form.get("slider_nh3_min").setValue(+value);
  }

  changeInputnh3Max(value: any) {
    this.form.get("slider_nh3_max").setValue(+value);
  }

  

  onSubmit() {
    if (this.form.valid) {
      const currentFormValues = this.form.value;
      const changedFields: any = {};

      for (const key of Object.keys(currentFormValues)) {
          if (currentFormValues[key] !== this.initialFormValues[key]) {
              changedFields[key] = currentFormValues[key];
          } else {
              changedFields[key] = false;
          }
      }


      const formKeys = Object.keys(changedFields);
      const filteredFormValues: any = {};

      for (const key of formKeys) {
          if (!key.includes('slider')) {
                  filteredFormValues[key] = changedFields[key];
              }
      }

      const fieldsObject: any = {
        co_min: filteredFormValues.co_min,
        co_max: filteredFormValues.co_max,
        no_min: filteredFormValues.no_min,
        no_max: filteredFormValues.no_max,
        no2_min: filteredFormValues.no2_min,
        no2_max: filteredFormValues.no2_max,
        o3_min: filteredFormValues.o3_min,
        o3_max: filteredFormValues.o3_max,
        pm2_5_min: filteredFormValues.pm2_5_max,
        pm2_5_max: filteredFormValues.pm2_5_min,
        pm10_min: filteredFormValues.pm10_min,
        pm10_max: filteredFormValues.pm10_max,
        so2_min: filteredFormValues.so2_min,
        so2_max: filteredFormValues.so2_max,
        nh3_min: filteredFormValues.nh3_min,
        nh3_max: filteredFormValues.nh3_max
    };
      


      this.airPollutionWorldSerice.filterTable(fieldsObject);
  } else {
      console.log("Form invalid. Please check your inputs.");
  }

     

  }

  resetFilters(){
    this.airPollutionWorldSerice.resetFilters();
    this.form.get("slider_co_min").setValue(0);
    this.form.get("slider_co_max").setValue(2000);
    this.form.get("slider_no_min").setValue(0);
    this.form.get("slider_no_max").setValue(1000);
    this.form.get("slider_no2_min").setValue(0);
    this.form.get("slider_no2_max").setValue(1000);
    this.form.get("slider_o3_min").setValue(0);
    this.form.get("slider_o3_max").setValue(1000);
    this.form.get("slider_so2_min").setValue(0);
    this.form.get("slider_so2_max").setValue(1000);
    this.form.get("slider_pm2_5_min").setValue(0);
    this.form.get("slider_pm2_5_max").setValue(1000);
    this.form.get("slider_pm10_min").setValue(0);
    this.form.get("slider_pm10_max").setValue(1000);
    this.form.get("slider_nh3_min").setValue(0);
    this.form.get("slider_nh3_max").setValue(1000);
  }
}
