import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit {

  categories: any;
  private _category = inject(CategoryService);
  private _snack = inject(MatSnackBar);

  ngOnInit(): void {

    this._category.categories().subscribe(

      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open("Error occurred while loading data.", "", {
          duration: 3000
        });
      }
    );

  }

  // for mobile usr
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
      this.sidebarVisible = false;
    }
  }

  // Close sidebar when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sidebar-card') && !target.closest('.mobile-menu-button')) {
      this.sidebarVisible = false;
    }
  }


}
