"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[367],{1367:(xe,C,a)=>{a.r(C),a.d(C,{AuthModule:()=>_e});var d,g,t,c=a(89),_=a(2074),S=a(2355),m=a(3810),i=a(6652),p=a(1300),v=a(2151),u=a(6789),P=a(4926),e=a(4355),Z=a(1507),T=a(4121),A=a(9676),w=a(8168),E=a(3568),I=a(5490),y=a(3787),L=a(2522),b=a(447);!function(t){let o;var s;(s=o=t.AppErrorCode||(t.AppErrorCode={})).Required="required",s.MinLength="minlength",s.Email="email",s.PasswordRepetition="passwordRepetition",s.ServerError="serverError";const r={[o.Required]:s=>`Please enter ${s}`,[o.MinLength]:s=>"Min characters: ",[o.Email]:s=>"Invalid email",[o.PasswordRepetition]:s=>"Repeated password doesn't match",[o.ServerError]:s=>"Server error"};t.toReadableAppError=function n(s,l){return r[s](l)}}(d||(d={})),(t=g||(g={})).MIN_PASSWORD_LENGTH=8,t.passwordRepetition=function o(r,n){return s=>{if(s instanceof i.cw){const l=s.controls[r],x=s.controls[n];if(void 0===l||void 0===x)return null;let f=x.errors;l.value!==x.value?f={...f,[d.AppErrorCode.PasswordRepetition]:!0}:null!==f&&(delete f[d.AppErrorCode.PasswordRepetition],0===Object.keys(f).length&&(f=null)),x.setErrors(f)}return null}};var q=a(8598),N=a(5338),O=a(8023),M=a(8801);let R=(()=>{class t{get errorState(){return null!==this.ngControl.errors&&!!this.ngControl.touched}get value(){return this._value}set value(r){this._value=r,this.onChange(r),this.stateChanges.next()}onChange(r){}onTouched(){}get empty(){return 0===this.value.trim().length}get shouldLabelFloat(){return this.focused||!this.empty}get placeholder(){return this._placeholder}set placeholder(r){this._placeholder=r,this.stateChanges.next()}get required(){return this._required}set required(r){this._required=(0,N.Ig)(r),this.stateChanges.next()}get disabled(){return this._disabled}set disabled(r){this._disabled=(0,N.Ig)(r),this.stateChanges.next()}constructor(r,n,s){this._focusMonitor=r,this._elementRef=n,this.ngControl=s,this.stateChanges=new O.x,this.focused=!1,this.controlType="password-input",this.id="password-input-"+t.nextId++,this.describedBy="",this.isPasswordHidden=!0,this.autocomplete="",this._value="",this._placeholder="",this._required=!1,this._disabled=!1,r.monitor(n,!0).subscribe(l=>{this.focused&&!l&&this.onTouched(),this.focused=!!l,this.stateChanges.next()}),null!=this.ngControl&&(this.ngControl.valueAccessor=this)}ngOnDestroy(){this.stateChanges.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}setDescribedByIds(r){this.describedBy=r.join(" ")}onContainerClick(r){if("input"!==r.target.tagName.toLowerCase()){const n=this._elementRef.nativeElement.querySelector("input");n&&n.focus()}}writeValue(r){this.value=r}registerOnChange(r){this.onChange=r}registerOnTouched(r){this.onTouched=r}setDisabledState(r){this.disabled=r}_handleInput(){this.onChange(this.value)}changePasswordVisibility(){this.isPasswordHidden=!this.isPasswordHidden}}return t.nextId=0,t.\u0275fac=function(r){return new(r||t)(e.Y36(M.tE),e.Y36(e.SBq),e.Y36(i.a5,10))},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-password-field"]],inputs:{autocomplete:"autocomplete",value:"value",placeholder:"placeholder",required:"required",disabled:"disabled"},features:[e._Bn([{provide:m.Eo,useExisting:t}])],decls:4,vars:6,consts:[["matInput","",3,"type","autocomplete","ngModel","ngModelChange"],["mat-icon-button","","matSuffix","","type","button",1,"password-visibility-button",3,"click"]],template:function(r,n){1&r&&(e.TgZ(0,"input",0),e.NdJ("ngModelChange",function(l){return n.value=l}),e.qZA(),e.TgZ(1,"button",1),e.NdJ("click",function(){return n.changePasswordVisibility()}),e.TgZ(2,"mat-icon"),e._uU(3),e.qZA()()),2&r&&(e.Q6J("type",n.isPasswordHidden?"password":"text")("autocomplete",n.autocomplete)("ngModel",n.value),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",n.isPasswordHidden),e.xp6(2),e.Oqu(n.isPasswordHidden?"visibility_off":"visibility"))},dependencies:[i.Fj,i.JJ,i.On,m.R9,_.Nt,p.RK,v.Hw],styles:[".password-visibility-button[_ngcontent-%COMP%]{position:absolute;right:0;top:4px}.password-visibility-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:#fff}"],changeDetection:0}),t})(),U=(()=>{class t{transform(r,n=""){return d.toReadableAppError(r,n)}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275pipe=e.Yjl({name:"fieldErrorText",type:t,pure:!1}),t})();function Q(t,o){if(1&t&&(e.ynx(0),e.TgZ(1,"p",6),e._uU(2),e.qZA(),e.BQk()),2&t){const r=o.ngIf;e.xp6(2),e.hij(" ",r.errors.common," ")}}function Y(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","email")))}function F(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"email")))}function j(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Email"),e.qZA(),e._UZ(3,"input",7),e.YNc(4,Y,3,4,"mat-error",2),e.YNc(5,F,3,3,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("email"))}}function B(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","password")))}function H(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function D(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"passwordRepetition","password")))}function $(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function X(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",8)(1,"mat-label"),e._uU(2,"Password"),e.qZA(),e._UZ(3,"camp-password-field",9),e.YNc(4,B,3,4,"mat-error",2),e.YNc(5,H,3,3,"mat-error",2),e.YNc(6,D,3,4,"mat-error",2),e.YNc(7,$,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.hasError("passwordRepetition")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function z(t,o){1&t&&e._UZ(0,"camp-shadow-spinner")}let G=(()=>{class t{constructor(){this.isSubmitting$=new T.X(!1),this.loginErrors$=new T.X(null),this.formBuilder=(0,e.f3M)(i.j3),this.authService=(0,e.f3M)(Z.e),this.untilDestroyed=(0,L.t)(),this.router=(0,e.f3M)(u.F0),this.route=(0,e.f3M)(u.gz),this.form=this.createForm()}ngOnInit(){this.form.valueChanges.pipe(this.untilDestroyed()).subscribe(()=>this.loginErrors$.next(null))}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],password:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]]})}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.login(this.form.getRawValue()).pipe((0,A.P)(),(0,w.b)(()=>this.navigateToNextUrl()),(0,E.K)(r=>this.handleError(r)),(0,I.x)(()=>this.isSubmitting$.next(!1))).subscribe())}navigateToNextUrl(){this.router.navigateByUrl(this.mapQueryParamsToNextUrl(this.route.snapshot.queryParams))}mapQueryParamsToNextUrl(r){return decodeURIComponent(r.next??"")}handleError(r){return r instanceof b.k&&this.loginErrors$.next(r??null),(0,y._)(()=>r)}trackErrorByIndex(r){return r}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-login-page"]],decls:13,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signup","mat-button",""],[1,"auth-form__error"],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],[1,"password-field"],["autocomplete","current-password",3,"formControl"]],template:function(r,n){1&r&&(e.TgZ(0,"p",0),e._uU(1,"Sign in"),e.qZA(),e.TgZ(2,"form",1),e.NdJ("ngSubmit",function(){return n.handleSubmit()}),e.YNc(3,Q,3,1,"ng-container",2),e.ALo(4,"async"),e.YNc(5,j,6,3,"mat-form-field",2),e.YNc(6,X,8,5,"mat-form-field",3),e.TgZ(7,"button",4),e._uU(8,"Sign in"),e.qZA()(),e.TgZ(9,"a",5),e._uU(10,"Sign up"),e.qZA(),e.YNc(11,z,1,0,"camp-shadow-spinner",2),e.ALo(12,"async")),2&r&&(e.xp6(2),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("ngIf",e.lcZ(4,5,n.loginErrors$)),e.xp6(2),e.Q6J("ngIf",n.form.controls.email),e.xp6(1),e.Q6J("ngIf",n.form.controls.password),e.xp6(5),e.Q6J("ngIf",e.lcZ(12,7,n.isSubmitting$)))},dependencies:[c.O5,q.e,u.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,m.KE,m.hX,m.TO,_.Nt,p.zs,p.lW,R,c.Ov,U],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),t})();function W(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","email")))}function k(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"email")))}function K(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function ee(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Email"),e.qZA(),e._UZ(3,"input",6),e.YNc(4,W,3,4,"mat-error",2),e.YNc(5,k,3,3,"mat-error",2),e.YNc(6,K,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("email")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function te(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","first name")))}function re(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"First name"),e.qZA(),e._UZ(3,"input",7),e.YNc(4,te,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required"))}}function oe(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","last name")))}function ne(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Last name"),e.qZA(),e._UZ(3,"input",8),e.YNc(4,oe,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required"))}}function ie(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","password")))}function ae(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function se(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function me(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",9)(1,"mat-label"),e._uU(2,"Password"),e.qZA(),e._UZ(3,"camp-password-field",10),e.YNc(4,ie,3,4,"mat-error",2),e.YNc(5,ae,3,3,"mat-error",2),e.YNc(6,se,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function le(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","repeated password")))}function ue(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function fe(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"passwordRepetition","repeated password")))}function pe(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",9)(1,"mat-label"),e._uU(2,"Re-type password"),e.qZA(),e._UZ(3,"camp-password-field",10),e.YNc(4,le,3,4,"mat-error",2),e.YNc(5,ue,3,3,"mat-error",2),e.YNc(6,fe,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.hasError("passwordRepetition"))}}function de(t,o){1&t&&e._UZ(0,"camp-shadow-spinner")}let ge=(()=>{class t{constructor(){this.isSubmitting$=new T.X(!1),this.formBuilder=(0,e.f3M)(i.j3),this.authService=(0,e.f3M)(Z.e),this.router=(0,e.f3M)(u.F0),this.route=(0,e.f3M)(u.gz),this.form=this.createForm()}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],firstName:["",[i.kI.required]],lastName:["",[i.kI.required]],password:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]],repeatedPassword:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]]},{validators:[g.passwordRepetition("password","repeatedPassword")]})}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.register(this.form.getRawValue()).pipe((0,A.P)(),(0,w.b)(()=>this.navigateToNextUrl()),function V(t){return function(o){return o.pipe((0,E.K)(r=>(r instanceof b.k&&Object.keys(t.controls).forEach(n=>{void 0!==r.errors[n]&&t.controls[n].setErrors({[d.AppErrorCode.ServerError]:r.errors[n]})}),(0,y._)(()=>r))))}}(this.form),(0,I.x)(()=>this.isSubmitting$.next(!1))).subscribe())}navigateToNextUrl(){this.router.navigateByUrl(this.mapQueryParamsToNextUrl(this.route.snapshot.queryParams))}mapQueryParamsToNextUrl(r){return decodeURIComponent(r.next??"")}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-register-page"]],decls:14,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signin","mat-button",""],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],["matInput","","placeholder","John","autocomplete","given-name",3,"formControl"],["matInput","","placeholder","Doe","autocomplete","family-name",3,"formControl"],[1,"password-field"],["autocomplete","new-password",3,"formControl"]],template:function(r,n){1&r&&(e.TgZ(0,"p",0),e._uU(1,"Sign up"),e.qZA(),e.TgZ(2,"form",1),e.NdJ("ngSubmit",function(){return n.handleSubmit()}),e.YNc(3,ee,7,4,"mat-form-field",2),e.YNc(4,re,5,2,"mat-form-field",2),e.YNc(5,ne,5,2,"mat-form-field",2),e.YNc(6,me,7,4,"mat-form-field",3),e.YNc(7,pe,7,4,"mat-form-field",3),e.TgZ(8,"button",4),e._uU(9,"Sign up"),e.qZA()(),e.TgZ(10,"a",5),e._uU(11,"Sign in"),e.qZA(),e.YNc(12,de,1,0,"camp-shadow-spinner",2),e.ALo(13,"async")),2&r&&(e.xp6(2),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("ngIf",n.form.controls.email),e.xp6(1),e.Q6J("ngIf",n.form.controls.firstName),e.xp6(1),e.Q6J("ngIf",n.form.controls.lastName),e.xp6(1),e.Q6J("ngIf",n.form.controls.password),e.xp6(1),e.Q6J("ngIf",n.form.controls.repeatedPassword),e.xp6(5),e.Q6J("ngIf",e.lcZ(13,7,n.isSubmitting$)))},dependencies:[c.O5,q.e,u.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,m.KE,m.hX,m.TO,_.Nt,p.zs,p.lW,R,c.Ov,U],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),t})();const ce=[{path:"",redirectTo:"signin",pathMatch:"prefix"},{path:"signin",title:"Sign In",component:G,canActivate:[P.e]},{path:"signup",title:"Sign Up",component:ge,canActivate:[P.e]}];let he=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.Bz.forChild(ce),u.Bz]}),t})(),_e=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[{provide:m.o2,useValue:{appearance:"outline"}}],imports:[c.ez,S.m,he,i.u5,i.UX,m.lN,_.c,p.ot,v.Ps]}),t})()}}]);