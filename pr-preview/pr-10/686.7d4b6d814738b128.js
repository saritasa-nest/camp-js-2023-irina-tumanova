"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[686],{4686:(gt,g,a)=>{a.r(g),a.d(g,{AuthModule:()=>dt});var f=a(89),u=a(2074),N=a(2355),s=a(3810),i=a(6652),l=a(1300),_=a(2151),m=a(6789),h=a(4926),t=a(4355),x=a(1507),d=a(4121),J=a(9676),T=a(8168),Z=a(3568),P=a(5490),v=a(3787),C=a(2522),y=a(447),c=a(5498);let A=(()=>{class r{mapQueryParamsToUrl(e,n){return decodeURIComponent(e[n]??"")}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var I=a(8598),S=a(9779),b=a(8801);let w=(()=>{class r extends S.y{constructor(e){super(),this._focusMonitor=e,this.autocomplete="",this.controlType="password-input",this.isPasswordHidden=!0,e.monitor(this._elementRef,!0).subscribe(n=>{this.focused&&!n&&this.onTouched(),this.focused=!!n,this.stateChanges.next()})}checkValueIsEmpty(e){return null===e||0===e.trim().length}changePasswordVisibility(){this.isPasswordHidden=!this.isPasswordHidden}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(b.tE))},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-password-field"]],inputs:{autocomplete:"autocomplete"},features:[t._Bn([{provide:s.Eo,useExisting:r}]),t.qOj],decls:4,vars:6,consts:[["matInput","",3,"type","autocomplete","formControl"],["mat-icon-button","","matSuffix","","type","button",1,"password-visibility-button",3,"click"]],template:function(e,n){1&e&&(t._UZ(0,"input",0),t.TgZ(1,"button",1),t.NdJ("click",function(){return n.changePasswordVisibility()}),t.TgZ(2,"mat-icon"),t._uU(3),t.qZA()()),2&e&&(t.Q6J("type",n.isPasswordHidden?"password":"text")("autocomplete",n.autocomplete)("formControl",n.formControl),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",n.isPasswordHidden),t.xp6(2),t.Oqu(n.isPasswordHidden?"visibility_off":"visibility"))},dependencies:[i.Fj,i.JJ,i.oH,s.R9,u.Nt,l.RK,_.Hw],styles:[".password-visibility-button[_ngcontent-%COMP%]{position:absolute;right:0;top:4px}.password-visibility-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:#fff}"],changeDetection:0}),r})();var E=a(2302);function Q(r,o){if(1&r&&(t.ynx(0),t.TgZ(1,"p",6),t._uU(2),t.qZA(),t.BQk()),2&r){const e=o.ngIf;t.xp6(2),t.hij(" ",e.errors.common," ")}}function L(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","email")))}function R(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"email")))}function O(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Email"),t.qZA(),t._UZ(3,"input",7),t.YNc(4,L,3,4,"mat-error",2),t.YNc(5,R,3,3,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("email"))}}function M(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","password")))}function Y(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.hij("",t.lcZ(2,1,"minlength")," 8"))}function F(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"passwordRepetition","password")))}function j(r,o){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=o.ngIf;t.xp6(1),t.Oqu(e)}}function H(r,o){if(1&r&&(t.TgZ(0,"mat-form-field",8)(1,"mat-label"),t._uU(2,"Password"),t.qZA(),t._UZ(3,"camp-password-field",9),t.YNc(4,M,3,4,"mat-error",2),t.YNc(5,Y,3,3,"mat-error",2),t.YNc(6,F,3,4,"mat-error",2),t.YNc(7,j,2,1,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.hasError("passwordRepetition")),t.xp6(1),t.Q6J("ngIf",e.getError("serverError"))}}function B(r,o){1&r&&t._UZ(0,"camp-shadow-spinner")}let D=(()=>{class r{constructor(){this.isSubmitting$=new d.X(!1),this.loginErrors$=new d.X(null),this.formBuilder=(0,t.f3M)(i.j3),this.authService=(0,t.f3M)(x.e),this.untilDestroyed=(0,C.t)(),this.router=(0,t.f3M)(m.F0),this.route=(0,t.f3M)(m.gz),this.queryParamsService=(0,t.f3M)(A),this.form=this.createForm()}ngOnInit(){this.form.valueChanges.pipe(this.untilDestroyed()).subscribe(()=>this.loginErrors$.next(null))}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],password:["",[i.kI.required,i.kI.minLength(c.m.MIN_PASSWORD_LENGTH)]]})}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.login(this.form.getRawValue()).pipe((0,J.P)(),(0,T.b)(()=>this.navigateToNextUrl()),(0,Z.K)(e=>this.handleError(e)),(0,P.x)(()=>this.isSubmitting$.next(!1)),this.untilDestroyed()).subscribe())}navigateToNextUrl(){this.router.navigateByUrl(this.queryParamsService.mapQueryParamsToUrl(this.route.snapshot.queryParams,"next"))}handleError(e){return e instanceof y.k&&this.loginErrors$.next(e??null),(0,v._)(()=>e)}trackErrorByIndex(e){return e}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-login-page"]],decls:13,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signup","mat-button",""],[1,"auth-form__error"],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],[1,"password-field"],["autocomplete","current-password",3,"formControl"]],template:function(e,n){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Sign in"),t.qZA(),t.TgZ(2,"form",1),t.NdJ("ngSubmit",function(){return n.handleSubmit()}),t.YNc(3,Q,3,1,"ng-container",2),t.ALo(4,"async"),t.YNc(5,O,6,3,"mat-form-field",2),t.YNc(6,H,8,5,"mat-form-field",3),t.TgZ(7,"button",4),t._uU(8,"Sign in"),t.qZA()(),t.TgZ(9,"a",5),t._uU(10,"Sign up"),t.qZA(),t.YNc(11,B,1,0,"camp-shadow-spinner",2),t.ALo(12,"async")),2&e&&(t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(1),t.Q6J("ngIf",t.lcZ(4,5,n.loginErrors$)),t.xp6(2),t.Q6J("ngIf",n.form.controls.email),t.xp6(1),t.Q6J("ngIf",n.form.controls.password),t.xp6(5),t.Q6J("ngIf",t.lcZ(12,7,n.isSubmitting$)))},dependencies:[f.O5,I.e,m.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,s.KE,s.hX,s.TO,u.Nt,l.zs,l.lW,w,f.Ov,E.m],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),r})();var $=a(4924);function X(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","email")))}function V(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"email")))}function G(r,o){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=o.ngIf;t.xp6(1),t.Oqu(e)}}function K(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Email"),t.qZA(),t._UZ(3,"input",6),t.YNc(4,X,3,4,"mat-error",2),t.YNc(5,V,3,3,"mat-error",2),t.YNc(6,G,2,1,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("email")),t.xp6(1),t.Q6J("ngIf",e.getError("serverError"))}}function W(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","first name")))}function k(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"First name"),t.qZA(),t._UZ(3,"input",7),t.YNc(4,W,3,4,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required"))}}function tt(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","last name")))}function rt(r,o){if(1&r&&(t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2,"Last name"),t.qZA(),t._UZ(3,"input",8),t.YNc(4,tt,3,4,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required"))}}function et(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","password")))}function ot(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.hij("",t.lcZ(2,1,"minlength")," 8"))}function nt(r,o){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=o.ngIf;t.xp6(1),t.Oqu(e)}}function it(r,o){if(1&r&&(t.TgZ(0,"mat-form-field",9)(1,"mat-label"),t._uU(2,"Password"),t.qZA(),t._UZ(3,"camp-password-field",10),t.YNc(4,et,3,4,"mat-error",2),t.YNc(5,ot,3,3,"mat-error",2),t.YNc(6,nt,2,1,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.getError("serverError"))}}function at(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"required","repeated password")))}function st(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.hij("",t.lcZ(2,1,"minlength")," 8"))}function mt(r,o){1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.ALo(2,"fieldErrorText"),t.qZA()),2&r&&(t.xp6(1),t.Oqu(t.xi3(2,1,"passwordRepetition","repeated password")))}function lt(r,o){if(1&r&&(t.TgZ(0,"mat-form-field",9)(1,"mat-label"),t._uU(2,"Re-type password"),t.qZA(),t._UZ(3,"camp-password-field",10),t.YNc(4,at,3,4,"mat-error",2),t.YNc(5,st,3,3,"mat-error",2),t.YNc(6,mt,3,4,"mat-error",2),t.qZA()),2&r){const e=o.ngIf;t.xp6(3),t.Q6J("formControl",e),t.xp6(1),t.Q6J("ngIf",e.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.hasError("passwordRepetition"))}}function ft(r,o){1&r&&t._UZ(0,"camp-shadow-spinner")}const ut=[{path:"",redirectTo:"signin",pathMatch:"prefix"},{path:"signin",title:"Sign In",component:D,canActivate:[h.e]},{path:"signup",title:"Sign Up",component:(()=>{class r{constructor(){this.isSubmitting$=new d.X(!1),this.formBuilder=(0,t.f3M)(i.j3),this.authService=(0,t.f3M)(x.e),this.router=(0,t.f3M)(m.F0),this.route=(0,t.f3M)(m.gz),this.queryParamsService=(0,t.f3M)(A),this.untilDestroyed=(0,C.t)(),this.form=this.createForm()}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],firstName:["",[i.kI.required]],lastName:["",[i.kI.required]],password:["",[i.kI.required,i.kI.minLength(c.m.MIN_PASSWORD_LENGTH)]],repeatedPassword:["",[i.kI.required,i.kI.minLength(c.m.MIN_PASSWORD_LENGTH)]]},{validators:[c.m.passwordRepetition("password","repeatedPassword")]})}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.register(this.form.getRawValue()).pipe((0,T.b)(()=>this.navigateToNextUrl()),function z(r){return function(o){return o.pipe((0,Z.K)(e=>(e instanceof y.k&&Object.keys(r.controls).forEach(n=>{void 0!==e.errors[n]&&r.controls[n].setErrors({[$.O.AppErrorCode.ServerError]:e.errors[n]})}),(0,v._)(()=>e))))}}(this.form),(0,P.x)(()=>this.isSubmitting$.next(!1)),this.untilDestroyed()).subscribe())}navigateToNextUrl(){this.router.navigateByUrl(this.queryParamsService.mapQueryParamsToUrl(this.route.snapshot.queryParams,"next"))}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["camp-register-page"]],decls:14,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signin","mat-button",""],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],["matInput","","placeholder","John","autocomplete","given-name",3,"formControl"],["matInput","","placeholder","Doe","autocomplete","family-name",3,"formControl"],[1,"password-field"],["autocomplete","new-password",3,"formControl"]],template:function(e,n){1&e&&(t.TgZ(0,"p",0),t._uU(1,"Sign up"),t.qZA(),t.TgZ(2,"form",1),t.NdJ("ngSubmit",function(){return n.handleSubmit()}),t.YNc(3,K,7,4,"mat-form-field",2),t.YNc(4,k,5,2,"mat-form-field",2),t.YNc(5,rt,5,2,"mat-form-field",2),t.YNc(6,it,7,4,"mat-form-field",3),t.YNc(7,lt,7,4,"mat-form-field",3),t.TgZ(8,"button",4),t._uU(9,"Sign up"),t.qZA()(),t.TgZ(10,"a",5),t._uU(11,"Sign in"),t.qZA(),t.YNc(12,ft,1,0,"camp-shadow-spinner",2),t.ALo(13,"async")),2&e&&(t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(1),t.Q6J("ngIf",n.form.controls.email),t.xp6(1),t.Q6J("ngIf",n.form.controls.firstName),t.xp6(1),t.Q6J("ngIf",n.form.controls.lastName),t.xp6(1),t.Q6J("ngIf",n.form.controls.password),t.xp6(1),t.Q6J("ngIf",n.form.controls.repeatedPassword),t.xp6(5),t.Q6J("ngIf",t.lcZ(13,7,n.isSubmitting$)))},dependencies:[f.O5,I.e,m.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,s.KE,s.hX,s.TO,u.Nt,l.zs,l.lW,w,f.Ov,E.m],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),r})(),canActivate:[h.e]}];let ct=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[m.Bz.forChild(ut),m.Bz]}),r})(),dt=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[{provide:s.o2,useValue:{appearance:"outline"}}],imports:[f.ez,N.m,ct,i.UX,s.lN,u.c,l.ot,_.Ps]}),r})()}}]);