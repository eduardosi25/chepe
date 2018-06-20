import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private location: Location,
    private model: ModelService,
    public session: SessionService,
    private router: Router) { }

  public segments: Segment[] = [];
  ngOnInit() {
    if (!this.session || !this.session.query || !this.session.segments || !this.session.route) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.segments = this.session.mkUnifiedSegments();

  }

  goBack(): void {
    this.location.back();
  }
  public isFirstSegment(segment: Segment): boolean {
    return (segment.n == 1);
  }
  public isLastSegment(segment: Segment): boolean {
    return (segment.n == this.segments.length);
  }


}
