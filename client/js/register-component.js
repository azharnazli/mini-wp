Vue.component(`register-component`, {
  methods: {
    registerUser() {
      axios.post(baseUrl + '/users/register', {
          first_name: this.register.first_name,
          last_name: this.register.last_name,
          email: this.register.email,
          password: this.register.password,
        })
        .then(() => {
          this.register.first_name = ''
          this.register.last_name = ''
          this.register.email = ''
          this.register.password = ''
        })
        .catch(err => {
          swal({
            title: "ERROR!",
            text: "Please Fill ALL",
            icon: "warning",
          });
          console.log(err)
        })
    }
  },
  data: function () {
    return {
      register: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  },
  template: `
  <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Register</h3>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <form class="form" role="form" autocomplete="off" id="formregister" novalidate="">
                <div class="form-group">
                  <a href="" class="float-right">Already Member?</a>
                  <label for="firstname">First Name</label>
                  <input type="text" class="form-control form-control-lg" name="firstname"
                    v-model="register.first_name">
                </div>
                <div class="form-group">
                  <label for="lastname">Last Name</label>
                  <input type="text" class="form-control form-control-lg" name="lastname" id="lastname"
                    v-model="register.last_name">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control form-control-lg" name="email" id="email"
                    v-model="register.email">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control form-control-lg" id="password" v-model="register.password">
                </div>
                <div class="form-group py-4">
                  <button class="btn btn-outline-secondary btn-lg" data-dismiss="modal"
                    aria-hidden="true">Cancel</button>
                  <button type="submit" class="btn btn-success btn-lg float-right" v-on:click.prevent="registerUser"
                    data-dismiss="modal">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  `
})