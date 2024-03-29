import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { CourseService } from './course.service';


class AngularFirestoreFilterMock {
    collection(dbPath: string) {
      return {
        snapshotChanges: () => of([
          {
            payload: {
              doc: {
                id: '1',
                data: () => ({ language: { label: 'ENGLISH' }, level: { label: 'A1' }, status: { label: 'ONGOING' } })
              }
            },
            type: 'added'
          },
          {
            payload: {
              doc: {
                id: '2',
                data: () => ({ language: { label: 'ENGLISH' }, level: { label: 'A1' }, status: { label: 'ONGOING' } })
              }
            },
            type: 'added'
          }
        ])
      };
    }
}

class AngularFirestoreMock {
  collection(dbPath: string) {
    if (dbPath === '/courses') { // dbPath kontrolü, farklı koleksiyonlar için farklı davranışlar eklemek isteyebilirsiniz.
      return {
        snapshotChanges: () => of([
          {
            payload: {
              doc: {
                id: '1', 
                data: () => ({ language: { label: 'ENGLISH' }, level: { label: 'A1' }, status: { label: 'ONGOING' } })
              }
            },
            type: 'added'
          },
          {
            payload: {
              doc: {
                id: '2',
                data: () => ({ language: { label: 'GERMAN' }, level: { label: 'B2' }, status: { label: 'PLANNING' } })
              }
            },
            type: 'added'
          }
        ])
      };
    }

    return {
      snapshotChanges: () => of([])
    };
  
  }
}

describe('CourseServiceFilter', () => {
    let service: CourseService;
    let firestore: AngularFirestore;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CourseService,
          { provide: AngularFirestore, useClass: AngularFirestoreFilterMock }
        ],
      });
      service = TestBed.inject(CourseService);
      firestore = TestBed.inject(AngularFirestore);
    });
  
    it('should filter courses by language', (done) => {
      service.filterCourses('ENGLISH', 'A1', null).subscribe((courses) => {
        expect(courses.length).toEqual(2);
        expect(courses[0].language.label).toEqual('ENGLISH');
        expect(courses[1].level.label).toEqual('A1');
        done();
      });
    });
  });

  describe('CourseService', () => {
    let service: CourseService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CourseService,
          { provide: AngularFirestore, useClass: AngularFirestoreMock }
        ],
      });
      service = TestBed.inject(CourseService);
    });
  
    it('should retrieve courses correctly', (done) => {
      service.getCourses().subscribe((courses) => {
        expect(courses.length).toEqual(2);
        expect(courses[0].id).toEqual('1');
        expect(courses[0].language.label).toEqual('ENGLISH');
        expect(courses[1].id).toEqual('2');
        expect(courses[1].language.label).toEqual('GERMAN');
        done();
      });
    });
  });
  
  