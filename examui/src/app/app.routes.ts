import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },

            {
                path: 'update-user/:username',
                component: UpdateUserComponent
            },
            {
                path: 'update-password/:username',
                component: UpdatePasswordComponent
            },
            {
                path: 'categories',
                component: ViewCategoriesComponent
            },
            {
                path: 'add-category',
                component: AddCategoryComponent
            },
            {
                path: 'quizzes',
                component: ViewQuizzesComponent
            },
            {
                path: 'add-quiz',
                component: AddQuizComponent
            },
            {
                path: 'quiz/:qid',
                component: UpdateQuizComponent
            },
            {
                path: 'view-questions/:qid/:title',
                component: ViewQuizQuestionsComponent
            },
            {
                path: 'add-question/:qid/:title',
                component: AddQuestionComponent
            },
            {
                path: 'question/:qid',
                component: UpdateQuestionComponent
            },
            {
                path: 'category/:cid',
                component: UpdateCategoryComponent
            }
        ]
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [normalGuard],
        children: [
            {
                path: ':cid',
                component: LoadQuizComponent
            },
            {
                path: 'instructions/:qid',
                component: InstructionsComponent
            }
        ]
    },
    {
        path: 'start/:qid',
        component: StartComponent,
        canActivate: [normalGuard]
    },
    {
        path: 'user-profile',
        component: ProfileComponent,
        canActivate: [normalGuard]
    },
    {
        path: 'update-user/:username',
        component: UpdateUserComponent,
        canActivate: [normalGuard]
    },
    {
        path: 'update-password/:username',
        component: UpdatePasswordComponent,
        canActivate: [normalGuard]
    }
];
