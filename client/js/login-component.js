Vue.component(`login-component`, {
  props:['isLogin','email'],
  data: function () {
    return {
      login: {
        email: '',
        password: '',
        token: localStorage.getItem('token')
      }
    }
  },
  methods: {
    loginUser() {
      axios.post(baseUrl + '/users/normalLogin/', {
          email: this.login.email,
          password: this.login.password
        })
        .then(({data}) => {
          this.login.email = ''
          this.login.password = ''
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          this.$emit('change') 
        })
        .catch((err) => {
          swal({
            title: "ERROR!",
            text: "email or password not found",
            icon: "warning",
          });
          console.log(err)
        })
    },
  },
  template: `
  <div class="modal fade" id="loginmodal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Login</h3>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
      </div>
      <div class="modal-body">
        <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="">
          <div class="form-group">
            <a href="" class="float-right">New user?</a>
            <label for="uname1">Email</label>
            <input v-model="login.email" type="text" class="form-control form-control-lg" name="uname1"
              id="uname1" required="">
            <div class="invalid-feedback">Oops, you missed this one.</div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="login.password" class="form-control form-control-lg" id="pwd1"
              required="" autocomplete="new-password">
            <div class="invalid-feedback">Enter your password too!</div>
          </div>
          <div class="form-group py-4">
            <button class="btn btn-outline-secondary btn-lg" data-dismiss="modal"
              aria-hidden="true">Cancel</button>
            <button type="submit" class="btn btn-success btn-lg float-right" v-on:click.prevent="loginUser" data-dismiss="modal" >Login</button>
          </div>
          <div class="g-signin2 ml-2 " data-dismiss="modal" data-onsuccess="onSignIn"></div>
        </form>
      </div>
    </div>
  </div>
</div>`
})