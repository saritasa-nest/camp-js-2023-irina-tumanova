"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[367],{1367:(ve,Z,a)=>{a.r(Z),a.d(Z,{AuthModule:()=>Ce});var c,g,t,u=a(89),_=a(2074),O=a(2355),l=a(2369),i=a(6652),p=a(1300),P=a(2151),d=a(6789),A=a(4926),e=a(4355),E=a(8245),C=a(4121),w=a(9676),x=a(8168),I=a(3568),b=a(4945),y=a(3787),q=a(5490),U=a(2522),v=a(447);!function(t){let o;var s;(s=o=t.AppErrorCode||(t.AppErrorCode={})).Required="required",s.MinLength="minlength",s.Email="email",s.PasswordRepetition="passwordRepetition",s.ServerError="serverError";const r={[o.Required]:s=>`Please enter ${s}`,[o.MinLength]:s=>"Min characters: ",[o.Email]:s=>"Invalid email",[o.PasswordRepetition]:s=>"Repeated password doesn't match",[o.ServerError]:s=>"Server error"};t.toReadableAppError=function n(s,m){return r[s](m)}}(c||(c={})),(t=g||(g={})).MIN_PASSWORD_LENGTH=8,t.passwordRepetition=function o(r,n){return s=>{if(s instanceof i.cw){const m=s.controls[r],T=s.controls[n];if(void 0===m||void 0===T)return null;let f=T.errors;m.value!==T.value?f={...f,[c.AppErrorCode.PasswordRepetition]:!0}:null!==f&&(delete f[c.AppErrorCode.PasswordRepetition],0===Object.keys(f).length&&(f=null)),T.setErrors(f)}return null}};var R=a(8598),N=a(5338),M=a(8023),Q=a(8801);let J=(()=>{class t{get errorState(){return null!==this.ngControl.errors&&!!this.ngControl.touched}get value(){return this._value}set value(r){this._value=r,this.onChange(r),this.stateChanges.next()}onChange(r){}onTouched(){}get empty(){return 0===this.value.trim().length}get shouldLabelFloat(){return this.focused||!this.empty}get placeholder(){return this._placeholder}set placeholder(r){this._placeholder=r,this.stateChanges.next()}get required(){return this._required}set required(r){this._required=(0,N.Ig)(r),this.stateChanges.next()}get disabled(){return this._disabled}set disabled(r){this._disabled=(0,N.Ig)(r),this.stateChanges.next()}constructor(r,n,s){this._focusMonitor=r,this._elementRef=n,this.ngControl=s,this.stateChanges=new M.x,this.focused=!1,this.controlType="password-input",this.id="password-input-"+t.nextId++,this.describedBy="",this.isPasswordHidden=!0,this.autocomplete="",this._value="",this._placeholder="",this._required=!1,this._disabled=!1,r.monitor(n,!0).subscribe(m=>{this.focused&&!m&&this.onTouched(),this.focused=!!m,this.stateChanges.next()}),null!=this.ngControl&&(this.ngControl.valueAccessor=this)}ngOnDestroy(){this.stateChanges.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}setDescribedByIds(r){this.describedBy=r.join(" ")}onContainerClick(r){if("input"!==r.target.tagName.toLowerCase()){const n=this._elementRef.nativeElement.querySelector("input");n&&n.focus()}}writeValue(r){this.value=r}registerOnChange(r){this.onChange=r}registerOnTouched(r){this.onTouched=r}setDisabledState(r){this.disabled=r}_handleInput(){this.onChange(this.value)}changePasswordVisibility(){this.isPasswordHidden=!this.isPasswordHidden}}return t.nextId=0,t.\u0275fac=function(r){return new(r||t)(e.Y36(Q.tE),e.Y36(e.SBq),e.Y36(i.a5,10))},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-password-field"]],inputs:{autocomplete:"autocomplete",value:"value",placeholder:"placeholder",required:"required",disabled:"disabled"},features:[e._Bn([{provide:l.Eo,useExisting:t}])],decls:4,vars:6,consts:[["matInput","",3,"type","autocomplete","ngModel","ngModelChange"],["mat-icon-button","","matSuffix","","type","button",1,"password-visibility-button",3,"click"]],template:function(r,n){1&r&&(e.TgZ(0,"input",0),e.NdJ("ngModelChange",function(m){return n.value=m}),e.qZA(),e.TgZ(1,"button",1),e.NdJ("click",function(){return n.changePasswordVisibility()}),e.TgZ(2,"mat-icon"),e._uU(3),e.qZA()()),2&r&&(e.Q6J("type",n.isPasswordHidden?"password":"text")("autocomplete",n.autocomplete)("ngModel",n.value),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",n.isPasswordHidden),e.xp6(2),e.Oqu(n.isPasswordHidden?"visibility_off":"visibility"))},dependencies:[i.Fj,i.JJ,i.On,l.R9,_.Nt,p.RK,P.Hw],styles:[".password-visibility-button[_ngcontent-%COMP%]{position:absolute;right:0;top:4px}.password-visibility-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:#fff}"],changeDetection:0}),t})(),S=(()=>{class t{transform(r,n=""){return c.toReadableAppError(r,n)}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275pipe=e.Yjl({name:"fieldErrorText",type:t,pure:!1}),t})();function F(t,o){if(1&t&&(e.TgZ(0,"p",7),e._uU(1),e.qZA()),2&t){const r=o.$implicit;e.xp6(1),e.hij(" ",r.message," ")}}function Y(t,o){if(1&t&&(e.ynx(0),e.YNc(1,F,2,1,"p",6),e.BQk()),2&t){const r=o.ngIf,n=e.oxw();e.xp6(1),e.Q6J("ngForOf",r.errors.common)("ngForTrackBy",n.trackErrorByCode)}}function j(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","email")))}function B(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"email")))}function H(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Email"),e.qZA(),e._UZ(3,"input",8),e.YNc(4,j,3,4,"mat-error",2),e.YNc(5,B,3,3,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("email"))}}function $(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","password")))}function D(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function X(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"passwordRepetition","password")))}function z(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function G(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",9)(1,"mat-label"),e._uU(2,"Password"),e.qZA(),e._UZ(3,"camp-password-field",10),e.YNc(4,$,3,4,"mat-error",2),e.YNc(5,D,3,3,"mat-error",2),e.YNc(6,X,3,4,"mat-error",2),e.YNc(7,z,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.hasError("passwordRepetition")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function V(t,o){1&t&&e._UZ(0,"camp-shadow-spinner")}let W=(()=>{class t{constructor(){this.isSubmitting$=new C.X(!1),this.loginErrors$=new C.X(null),this.formBuilder=(0,e.f3M)(i.j3),this.authService=(0,e.f3M)(E.e),this.untilDestroyed=(0,U.t)(),this.router=(0,e.f3M)(d.F0),this.form=this.createForm()}ngOnInit(){this.form.valueChanges.pipe(this.untilDestroyed()).subscribe(()=>this.loginErrors$.next(null))}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.login(this.form.getRawValue()).pipe((0,w.P)(),(0,x.b)(()=>this.router.navigate(["anime"])),(0,I.K)(r=>r instanceof v.gz?(0,b.of)(r):(0,y._)(()=>r)),(0,x.b)(r=>this.loginErrors$.next(r??null)),(0,q.x)(()=>this.isSubmitting$.next(!1))).subscribe())}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],password:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]]})}trackErrorByCode(r,n){return n.message}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-login-page"]],decls:13,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signup","mat-button",""],["class","auth-form__error",4,"ngFor","ngForOf","ngForTrackBy"],[1,"auth-form__error"],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],[1,"password-field"],["autocomplete","current-password",3,"formControl"]],template:function(r,n){1&r&&(e.TgZ(0,"p",0),e._uU(1,"Sign in"),e.qZA(),e.TgZ(2,"form",1),e.NdJ("ngSubmit",function(){return n.handleSubmit()}),e.YNc(3,Y,2,2,"ng-container",2),e.ALo(4,"async"),e.YNc(5,H,6,3,"mat-form-field",2),e.YNc(6,G,8,5,"mat-form-field",3),e.TgZ(7,"button",4),e._uU(8,"Sign in"),e.qZA()(),e.TgZ(9,"a",5),e._uU(10,"Sign up"),e.qZA(),e.YNc(11,V,1,0,"camp-shadow-spinner",2),e.ALo(12,"async")),2&r&&(e.xp6(2),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("ngIf",e.lcZ(4,5,n.loginErrors$)),e.xp6(2),e.Q6J("ngIf",n.form.controls.email),e.xp6(1),e.Q6J("ngIf",n.form.controls.password),e.xp6(5),e.Q6J("ngIf",e.lcZ(12,7,n.isSubmitting$)))},dependencies:[u.sg,u.O5,R.e,d.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,l.KE,l.hX,l.TO,_.Nt,p.zs,p.lW,J,u.Ov,S],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),t})();var K=a(7969);function ee(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","email")))}function te(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"email")))}function re(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function oe(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Email"),e.qZA(),e._UZ(3,"input",6),e.YNc(4,ee,3,4,"mat-error",2),e.YNc(5,te,3,3,"mat-error",2),e.YNc(6,re,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("email")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function ne(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","first name")))}function ie(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"First name"),e.qZA(),e._UZ(3,"input",7),e.YNc(4,ne,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required"))}}function ae(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","last name")))}function se(t,o){if(1&t&&(e.TgZ(0,"mat-form-field")(1,"mat-label"),e._uU(2,"Last name"),e.qZA(),e._UZ(3,"input",8),e.YNc(4,ae,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required"))}}function me(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","password")))}function le(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function fe(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const r=o.ngIf;e.xp6(1),e.Oqu(r)}}function ue(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",9)(1,"mat-label"),e._uU(2,"Password"),e.qZA(),e._UZ(3,"camp-password-field",10),e.YNc(4,me,3,4,"mat-error",2),e.YNc(5,le,3,3,"mat-error",2),e.YNc(6,fe,2,1,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.getError("serverError"))}}function pe(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"required","repeated password")))}function de(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.hij("",e.lcZ(2,1,"minlength")," 8"))}function ce(t,o){1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.ALo(2,"fieldErrorText"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.xi3(2,1,"passwordRepetition","repeated password")))}function ge(t,o){if(1&t&&(e.TgZ(0,"mat-form-field",9)(1,"mat-label"),e._uU(2,"Re-type password"),e.qZA(),e._UZ(3,"camp-password-field",10),e.YNc(4,pe,3,4,"mat-error",2),e.YNc(5,de,3,3,"mat-error",2),e.YNc(6,ce,3,4,"mat-error",2),e.qZA()),2&t){const r=o.ngIf;e.xp6(3),e.Q6J("formControl",r),e.xp6(1),e.Q6J("ngIf",r.hasError("required")),e.xp6(1),e.Q6J("ngIf",r.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",r.hasError("passwordRepetition"))}}function he(t,o){1&t&&e._UZ(0,"camp-shadow-spinner")}let _e=(()=>{class t{constructor(){this.isSubmitting$=new C.X(!1),this.formBuilder=(0,e.f3M)(i.j3),this.authService=(0,e.f3M)(E.e),this.router=(0,e.f3M)(d.F0),this.form=this.createForm()}handleSubmit(){this.form.invalid||(this.isSubmitting$.next(!0),this.authService.register(this.form.getRawValue()).pipe((0,w.P)(),(0,x.b)(()=>this.router.navigate(["anime"])),(0,I.K)(r=>r instanceof v.gz?(0,b.of)(r):(0,y._)(()=>r)),(0,K.U)(r=>r??v.hC),function k(t){return function(o){return o.pipe((0,x.b)(r=>{Object.keys(r.errors).forEach(n=>{if(void 0!==t.controls[n]){const s=r.errors[n].map(m=>m.message);t.controls[n].setErrors({[c.AppErrorCode.ServerError]:s.join(", ")})}})}))}}(this.form),(0,q.x)(()=>this.isSubmitting$.next(!1))).subscribe())}createForm(){return this.formBuilder.group({email:["",[i.kI.required,i.kI.email]],firstName:["",[i.kI.required]],lastName:["",[i.kI.required]],password:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]],repeatedPassword:["",[i.kI.required,i.kI.minLength(g.MIN_PASSWORD_LENGTH)]]},{validators:[g.passwordRepetition("password","repeatedPassword")]})}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["camp-register-page"]],decls:14,vars:9,consts:[[1,"typography-title"],[1,"auth-form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","password-field",4,"ngIf"],["type","submit","mat-raised-button","","color","primary",1,"auth-form__submit-button"],["routerLink","/auth/signin","mat-button",""],["matInput","","placeholder","example@gmail.com","autocomplete","email",3,"formControl"],["matInput","","placeholder","John","autocomplete","given-name",3,"formControl"],["matInput","","placeholder","Doe","autocomplete","family-name",3,"formControl"],[1,"password-field"],["autocomplete","new-password",3,"formControl"]],template:function(r,n){1&r&&(e.TgZ(0,"p",0),e._uU(1,"Sign up"),e.qZA(),e.TgZ(2,"form",1),e.NdJ("ngSubmit",function(){return n.handleSubmit()}),e.YNc(3,oe,7,4,"mat-form-field",2),e.YNc(4,ie,5,2,"mat-form-field",2),e.YNc(5,se,5,2,"mat-form-field",2),e.YNc(6,ue,7,4,"mat-form-field",3),e.YNc(7,ge,7,4,"mat-form-field",3),e.TgZ(8,"button",4),e._uU(9,"Sign up"),e.qZA()(),e.TgZ(10,"a",5),e._uU(11,"Sign in"),e.qZA(),e.YNc(12,he,1,0,"camp-shadow-spinner",2),e.ALo(13,"async")),2&r&&(e.xp6(2),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("ngIf",n.form.controls.email),e.xp6(1),e.Q6J("ngIf",n.form.controls.firstName),e.xp6(1),e.Q6J("ngIf",n.form.controls.lastName),e.xp6(1),e.Q6J("ngIf",n.form.controls.password),e.xp6(1),e.Q6J("ngIf",n.form.controls.repeatedPassword),e.xp6(5),e.Q6J("ngIf",e.lcZ(13,7,n.isSubmitting$)))},dependencies:[u.O5,R.e,d.rH,i._Y,i.Fj,i.JJ,i.JL,i.oH,i.sg,l.KE,l.hX,l.TO,_.Nt,p.zs,p.lW,J,u.Ov,S],styles:["[_nghost-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m);padding:var(--space-m)}.auth-form[_ngcontent-%COMP%]{display:flex;max-width:var(--auth-form-max-width);width:100%;flex-direction:column;gap:var(--space-s);justify-content:center}.auth-form__error[_ngcontent-%COMP%]{color:var(--primary-color);align-self:center}.auth-form__submit-button[_ngcontent-%COMP%]{align-self:center}"],changeDetection:0}),t})();const xe=[{path:"",redirectTo:"signin",pathMatch:"prefix"},{path:"signin",title:"Sign In",component:W,canActivate:[A.e]},{path:"signup",title:"Sign Up",component:_e,canActivate:[A.e]}];let Te=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.Bz.forChild(xe),d.Bz]}),t})(),Ce=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[{provide:l.o2,useValue:{appearance:"outline"}}],imports:[u.ez,O.m,Te,i.u5,i.UX,l.lN,_.c,p.ot,P.Ps]}),t})()}}]);