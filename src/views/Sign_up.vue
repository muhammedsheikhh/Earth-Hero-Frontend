<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: { name: "", password: "" },
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template class="middle">
   <div class="login-w">
    <div class="login-html">
        <input id="tab-3" type="radio" name="tab" class="sign-up" checked>
        <label for="tab-3" class="tab">Signup</label>
        <div class="login-form">
            <!-- Signup Section -->
            <div class="sign-up-htm">
                <form v-on:submit.prevent="submit()">
                    <div class="group">
                        <label for="signup-name" class="label">Username</label>
                        <input id="signup-name" type="text" class="input" placeholder="username" v-model="newUserParams.name">
                        <small>{{ 50 - newUserParams.name.length }}</small>
                    </div>
                    <div class="group">
                        <label for="signup-email" class="label">Email</label>
                        <input id="signup-email" type="text" class="input" placeholder="email" v-model="newUserParams.email">
                    </div>
					<div class="group">
                        <label for="signup-email" class="label">School ID:</label>
                        <input id="signup-email" type="text" class="input" placeholder="school" v-model="newUserParams.school_id">
                    </div>
                    <div class="group">
                        <label for="signup-password" class="label">Password</label>
                        <input id="signup-password" type="password" class="input" placeholder="password" v-model="newUserParams.password">
                        <small class="text-danger" v-if="newUserParams.password.length > 0 && newUserParams.password.length < 6">
                            Must be at least 6 characters
                        </small>
                    </div>
                    <div class="group">
                        <label for="signup-password-confirm" class="label">Confirm Password</label>
                        <input id="signup-password-confirm" type="password" class="input" placeholder="password confirmation" v-model="newUserParams.password_confirmation">
                    </div>
                    <div class="group" style="margin-top: 35px;">
                        <input type="submit" class="button" value="Signup">
                    </div>
                    <div class="hr"></div>
                </form>
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
 </div>

</template>

<style>
body {
	margin:0;
	color:#edf3ff;
	background:#c8c8c8;
	background:url() fixed;
	background-size: cover;
	font:600 16px/18px 'Open Sans',sans-serif;
}
:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}

.login-w{
	width: 100%;
	margin:auto;
	max-width:510px;
	min-height:600px;
	margin-top: 100px;
	margin-bottom: 150px;
	position:relative;
	background:url(https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg) no-repeat center;
	background-size: cover;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding:90px 70px 50px 100px;
	background:rgba(0,0,0,0.5);
  margin-bottom: 50%;

}
.login-html .sign-in-htm,
.login-html .for-pwd-htm{
	top:0;
	left:0;
	right:0;
	bottom:0;
	position:absolute;
	-webkit-transform:rotateY(180deg);
	transform:rotateY(180deg);
	-webkit-backface-visibility:hidden;
	backface-visibility:hidden;
	-webkit-transition:all .4s linear;
	transition:all .4s linear;
}
.login-html .sign-in,
.login-html .for-pwd,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .for-pwd:checked + .tab{
	color:#fff;
	border-color:#1161ee;
}
.login-form{
	min-height:345px;
	position:relative;
	-webkit-perspective:1000px;
    perspective:1000px;
	-webkit-transform-style:preserve-3d;
	transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .input,
.login-form .group .button{
	border:none;
	padding:15px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}
.login-form .group input[data-type="password"]{
	text-security:circle;
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
}
.login-form .group .button{
	background:#1161ee;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	-webkit-transition:all .2s ease-in-out 0s;
	transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	-webkit-transform:scale(0) rotate(0);
	transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	-webkit-transform:scale(0) rotate(0);
	transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check:checked + label .icon{
	background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
	-webkit-transform:scale(1) rotate(45deg);
	transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	-webkit-transform:scale(1) rotate(-45deg);
	transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .for-pwd + .tab + .login-form .sign-in-htm{
	-webkit-transform:rotate(0);
	transform:rotate(0);
}
.login-html .for-pwd:checked + .tab + .login-form .for-pwd-htm{
	-webkit-transform:rotate(0);
	transform:rotate(0);
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}
</style>
