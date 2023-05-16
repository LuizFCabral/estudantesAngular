import { Estudantes } from './../estudantes';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudantesService } from '../estudantes.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent {

  estudantes: Estudantes[]  = [];
  formGroupEstudantes: FormGroup;

  constructor(private estudanteservice: EstudantesService, private formBuilder: FormBuilder) {
    this.formGroupEstudantes = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      ra: [''],
      telefone: [''],
      turma: [''],
    });
  }

  ngOnInit(): void {
    this.getEstudantes();
  }

  getEstudantes(){
    this.estudanteservice.getEstudantes().subscribe({
      next: (data) => {
        this.estudantes = data;
        console.log(this.estudantes);
      },
      error: ()=> console.log("Error to call getEstudantes")

    });
  }

  save(){
    this.estudanteservice.save(this.formGroupEstudantes.value).subscribe({
      next: data => {
        this.estudantes.push(data);
        console.log(this.estudantes);
      }
    })
    this.formGroupEstudantes.reset();
  }


}
