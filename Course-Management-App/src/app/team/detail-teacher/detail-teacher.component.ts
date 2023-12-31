import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html',
  styleUrls: ['./detail-teacher.component.scss']
})
export class DetailTeacherComponent {

  selectedTeacher: any;
  selectedTeacherId:string = "";
    
  constructor(
    private teamService: TeamService,
   
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedTeacherId = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.teamService.getTeacher(this.selectedTeacherId)
      .subscribe((teacher) => {
  
        this.selectedTeacher = teacher;
        
      });
 
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }


}
