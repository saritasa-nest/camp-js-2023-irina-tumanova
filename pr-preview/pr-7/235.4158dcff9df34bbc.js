"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[235],{3235:(lt,w,i)=>{i.r(w),i.d(w,{AuthModule:()=>mt});var f=i(89),d=i(2074),E=i(2355),m=i(2369),a=i(6652),c=i(1300),Z=i(2151),u=i(6789),P=i(4926),t=i(4355),x=i(5081);class J{constructor({email:o,password:e}){this.email=o,this.password=e}}var h,_=i(4121),T=i(8168),C=i(3568),I=i(4945),v=i(5490),N=i(9787);class b{constructor({attr:o,code:e,detail:n}){this.attr=o,this.code=e,this.detail=n}}(h||(h={})).fromDto=function o(e){return new b({attr:e.attr,code:e.code,detail:e.detail})};var F=i(6738);let y=(()=>{class r{getErrors(e){return e instanceof F.UA&&e.error.errors instanceof Array?e.error.errors.map(n=>h.fromDto(n)):[]}showErrorsToForm(e,n){e.forEach(s=>{null!==s.attr&&s.attr in n.controls&&n.controls[s.attr].setErrors({...n.controls[s.attr].errors,[s.code]:s.detail})})}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var p,r;(r=p||(p={})).MIN_PASSWORD_LENGTH=8,r.passwordRepetition=function o(){return e=>{if(e instanceof a.cw){const{password:n,repeatedPassword:s}=e.controls;if(s.value.length<r.MIN_PASSWORD_LENGTH)return null;s.setErrors(n.value!==s.value?{passwordDoesNotMatch:!0}:null)}return null}};var S=i(8598);function U(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter password"),t.qZA())}function M(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Min 8 characters"),t.qZA())}function R(r,o){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=o.ngIf;t.xp6(1),t.Oqu(e)}}function Q(r,o){if(1&r){const e=t.EpF();t.TgZ(0,"mat-form-field",1)(1,"mat-label"),t._uU(2,"Password"),t.qZA(),t._UZ(3,"input",2),t.TgZ(4,"button",3),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.changePasswordVisibility())}),t.TgZ(5,"mat-icon"),t._uU(6),t.qZA()(),t.YNc(7,U,2,0,"mat-error",4),t.YNc(8,M,2,0,"mat-error",4),t.YNc(9,R,2,1,"mat-error",4),t.qZA()}if(2&r){const e=t.oxw();t.xp6(3),t.Q6J("formControl",e.control)("type",e.shouldPasswordBeHidden?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",e.shouldPasswordBeHidden),t.xp6(2),t.Oqu(e.shouldPasswordBeHidden?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",e.control.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.control.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.control.getError("password_too_common"))}}let A=(()=>{class r{constructor(){this.shouldPasswordBeHidden=!0,this.control=new a.NI("")}changePasswordVisibility(){this.shouldPasswordBeHidden=!this.shouldPasswordBeHidden}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-password-field"]],inputs:{control:"control"},decls:1,vars:1,consts:[["class","password-field",4,"ngIf"],[1,"password-field"],["matInput","",3,"formControl","type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],[4,"ngIf"]],template:function(e,n){1&e&&t.YNc(0,Q,10,8,"mat-form-field",0),2&e&&t.Q6J("ngIf",n.control)},dependencies:[f.O5,a.Fj,a.JJ,a.oH,m.KE,m.hX,m.TO,m.R9,d.Nt,c.RK,Z.Hw],styles:[".password-field[_ngcontent-%COMP%]{width:100%}"]}),r})();function q(r,o){if(1&r&&(t.TgZ(0,"p",7),t._uU(1),t.qZA()),2&r){const e=o.$implicit;t.xp6(1),t.hij(" ",e.detail," ")}}function L(r,o){if(1&r&&(t.ynx(0),t.YNc(1,q,2,1,"p",6),t.BQk()),2&r){const e=o.ngIf,n=t.oxw();t.xp6(1),t.Q6J("ngForOf",e)("ngForTrackBy",n.trackErrorByCode)}}function O(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter email"),t.qZA())}function Y(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Invalid email"),t.qZA())}function D(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Email"),t.qZA(),t._UZ(3,"input",8),t.YNc(4,O,2,0,"mat-error",2),t.YNc(5,Y,2,0,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("email"))}}function B(r,o){1&r&&t._UZ(0,"camp-shadow-spinner")}let H=(()=>{class r{constructor(){this.isSubmitting$=new _.X(!1),this.loginErrors$=new _.X([]),this.formBuilder=(0,t.f3M)(a.j3),this.authService=(0,t.f3M)(x.e),this.errorService=(0,t.f3M)(y),this.router=(0,t.f3M)(u.F0),this.untilDestroyed=(0,N.t)(),this.form=this.createForm()}ngOnInit(){this.form.valueChanges.pipe(this.untilDestroyed()).subscribe(()=>this.loginErrors$.next([]))}handleSubmit(){"VALID"===this.form.status&&(this.isSubmitting$.next(!0),this.authService.login(this.mapFormValuesForSubmit(this.form.value)).pipe((0,T.b)(()=>this.router.navigate(["anime"])),(0,C.K)(e=>(0,I.of)(this.handleError(e))),(0,v.x)(()=>this.isSubmitting$.next(!1)),this.untilDestroyed()).subscribe())}createForm(){return this.formBuilder.group({email:["",[a.kI.required,a.kI.email]],password:["",[a.kI.required,a.kI.minLength(p.MIN_PASSWORD_LENGTH)]]})}handleError(e){this.loginErrors$.next(this.errorService.getErrors(e))}mapFormValuesForSubmit(e){return new J({email:e.email??"",password:e.password??""})}trackErrorByCode(e,n){return n.code}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-login-page"]],decls:13,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],[3,"control"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signup","mat-button",""],["class","auth-form__error",4,"ngFor","ngForOf","ngForTrackBy"],[1,"auth-form__error"],["matInput","","placeholder","example@gmail.com",3,"formControl"]],template:function(e,n){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Sign in"),t.qZA(),t.TgZ(2,"form",1),t.NdJ("ngSubmit",function(){return n.handleSubmit()}),t.YNc(3,L,2,2,"ng-container",2),t.ALo(4,"async"),t.YNc(5,D,6,3,"mat-form-field",2),t._UZ(6,"camp-password-field",3),t.TgZ(7,"button",4),t._uU(8,"Sign in"),t.qZA()(),t.TgZ(9,"a",5),t._uU(10,"Sign up"),t.qZA(),t.YNc(11,B,1,0,"camp-shadow-spinner",2),t.ALo(12,"async")),2&e&&(t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(1),t.Q6J("ngIf",t.lcZ(4,5,n.loginErrors$)),t.xp6(2),t.Q6J("ngIf",n.form.controls.email),t.xp6(1),t.Q6J("control",n.form.controls.password),t.xp6(5),t.Q6J("ngIf",t.lcZ(12,7,n.isSubmitting$)))},dependencies:[f.sg,f.O5,S.e,u.rH,a._Y,a.Fj,a.JJ,a.JL,a.oH,a.sg,m.KE,m.hX,m.TO,d.Nt,c.zs,c.lW,A,f.Ov],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),r})();class j{constructor(o){this.email=o.email,this.firstName=o.firstName,this.lastName=o.lastName,this.password=o.password}}function $(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter email"),t.qZA())}function V(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Invalid email"),t.qZA())}function k(r,o){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=o.ngIf;t.xp6(1),t.Oqu(e)}}function G(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Email"),t.qZA(),t._UZ(3,"input",6),t.YNc(4,$,2,0,"mat-error",2),t.YNc(5,V,2,0,"mat-error",2),t.YNc(6,k,2,1,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("email")),t.xp6(1),t.Q6J("ngIf",e.getError("unique"))}}function X(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter first name"),t.qZA())}function z(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"First name"),t.qZA(),t._UZ(3,"input",7),t.YNc(4,X,2,0,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required"))}}function K(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter last name"),t.qZA())}function W(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Last name"),t.qZA(),t._UZ(3,"input",8),t.YNc(4,K,2,0,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required"))}}function tt(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter repeated password"),t.qZA())}function rt(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Min 8 characters"),t.qZA())}function et(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1,"Repeated password doesn't match"),t.qZA())}function ot(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Re-type password"),t.qZA(),t._UZ(3,"input",9),t.YNc(4,tt,2,0,"mat-error",2),t.YNc(5,rt,2,0,"mat-error",2),t.YNc(6,et,2,0,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.hasError("passwordDoesNotMatch"))}}function nt(r,o){1&r&&t._UZ(0,"camp-shadow-spinner")}let at=(()=>{class r{constructor(){this.isSubmitting$=new _.X(!1),this.formBuilder=(0,t.f3M)(a.j3),this.authService=(0,t.f3M)(x.e),this.errorService=(0,t.f3M)(y),this.router=(0,t.f3M)(u.F0),this.changeDetectorRef=(0,t.f3M)(t.sBO),this.untilDestroyed=(0,N.t)(),this.form=this.createForm()}handleSubmit(){"VALID"===this.form.status&&(this.isSubmitting$.next(!0),this.authService.register(this.mapFormValuesForSubmit(this.form.value)).pipe((0,T.b)(()=>this.router.navigate(["anime"])),(0,C.K)(e=>(0,I.of)(this.handleError(e))),(0,v.x)(()=>this.isSubmitting$.next(!1)),this.untilDestroyed()).subscribe())}handleError(e){const n=this.errorService.getErrors(e);this.errorService.showErrorsToForm(n,this.form),this.changeDetectorRef.markForCheck()}createForm(){const e=this.formBuilder.group({email:["",[a.kI.required,a.kI.email]],firstName:["",[a.kI.required]],lastName:["",[a.kI.required]],password:["",[a.kI.required,a.kI.minLength(p.MIN_PASSWORD_LENGTH)]],repeatedPassword:["",[a.kI.required,a.kI.minLength(p.MIN_PASSWORD_LENGTH)]]});return e.setValidators(p.passwordRepetition()),e}mapFormValuesForSubmit(e){return new j({email:e.email??"",firstName:e.firstName??"",lastName:e.lastName??"",password:e.password??""})}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-register-page"]],decls:14,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],[3,"control"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signin","mat-button",""],["matInput","","placeholder","example@gmail.com",3,"formControl"],["matInput","","placeholder","John",3,"formControl"],["matInput","","placeholder","Doe",3,"formControl"],["matInput","","type","password",3,"formControl"]],template:function(e,n){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Sign up"),t.qZA(),t.TgZ(2,"form",1),t.NdJ("ngSubmit",function(){return n.handleSubmit()}),t.YNc(3,G,7,4,"mat-form-field",2),t.YNc(4,z,5,2,"mat-form-field",2),t.YNc(5,W,5,2,"mat-form-field",2),t._UZ(6,"camp-password-field",3),t.YNc(7,ot,7,4,"mat-form-field",2),t.TgZ(8,"button",4),t._uU(9,"Sign up"),t.qZA()(),t.TgZ(10,"a",5),t._uU(11,"Sign in"),t.qZA(),t.YNc(12,nt,1,0,"camp-shadow-spinner",2),t.ALo(13,"async")),2&e&&(t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(1),t.Q6J("ngIf",n.form.controls.email),t.xp6(1),t.Q6J("ngIf",n.form.controls.firstName),t.xp6(1),t.Q6J("ngIf",n.form.controls.lastName),t.xp6(1),t.Q6J("control",n.form.controls.password),t.xp6(1),t.Q6J("ngIf",n.form.controls.repeatedPassword),t.xp6(5),t.Q6J("ngIf",t.lcZ(13,7,n.isSubmitting$)))},dependencies:[f.O5,S.e,u.rH,a._Y,a.Fj,a.JJ,a.JL,a.oH,a.sg,m.KE,m.hX,m.TO,d.Nt,c.zs,c.lW,A,f.Ov],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),r})();const it=[{path:"",redirectTo:"signin",pathMatch:"prefix"},{path:"signin",title:"Sign In",component:H,canActivate:[P.J]},{path:"signup",title:"Sign Up",component:at,canActivate:[P.J]}];let st=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[u.Bz.forChild(it),u.Bz]}),r})(),mt=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[{provide:m.o2,useValue:{appearance:"outline"}}],imports:[f.ez,E.m,st,a.u5,a.UX,m.lN,d.c,c.ot,Z.Ps]}),r})()}}]);