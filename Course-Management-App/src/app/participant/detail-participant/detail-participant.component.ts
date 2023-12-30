import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-detail-participant',
  templateUrl: './detail-participant.component.html',
  styleUrls: ['./detail-participant.component.scss']
})
export class DetailParticipantComponent {
  selectedStudent: any;
  selectedStudentId:string = "";
    
  constructor(
    private participantService: ParticipantService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedStudentId = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.participantService
      .getParticipant(this.selectedStudentId)
      .subscribe((student) => {
        this.selectedStudent = student;
        
      });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

}
