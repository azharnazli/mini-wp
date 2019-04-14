Vue.config.devtools = true
const baseUrl = 'http://localhost:3000'

let app = new Vue({
  el: '#app',
  data: {
    currentPage: 'home',
    email:'',
    search: '',
    isLogin: false,
    entries: [],
    articles: [],
    myArticle: [],
    articleId:'',
    articleTitle: '',
    articleText: '',
    articleImage: null,
    editArticleTitle: '',
    editArticleText: '',
    editArticleImage: null,
    editArticleId: '',
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  created: function () {
    this.fetchArticle()
    this.checkLocalStorage()
  },
  watch: {
      currentPage: function() {
        this.checkLogin()
       if(this.currentPage === 'home') {
         this.fetchArticle()
       } else if(this.currentPage == 'myArticle') {
         this.showMyArticle()
       }
      },
      
    },
  computed: {
    filteredArticles: function () {
      return this.articles.filter(article => {
        if(article.title) {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        } 
      })
    }
  },
  methods: {
    uploadImage(event) {
      this.articleImage = event.target.files[0]
    },
    editedImage(event) {
      this.editArticleImage = event.target.files[0]
    },
    checkLogin() {
      if(!this.isLogin) {
        this.currentPage = 'home'
        swal({
          title: "Please Login!",
          icon: "warning",
          button: "Aww yiss!",
        });
      }

    },
      formArticle(title, content, id){
      this.currentPage = 'editArticle'
      this.editArticleTitle = title
      this.editArticleText = content
      this.editArticleId = id
     },
     addIdtoDelete(id){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.editArticleId = id
      axios.delete(baseUrl + `/articles/delete/${this.editArticleId}`, {
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(()=> {
          this.showMyArticle()
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        })
        .catch(err => {
          console.log(err)
        })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
     },
     editArticle(){
       let fd = new FormData()
       fd.append('title', this.editArticleTitle)
       fd.append('content', this.editArticleText)
       fd.append('image', this.editArticleImage)
      axios.put(baseUrl + '/articles/edit/' + this.editArticleId, fd,{
        headers : {
          token : localStorage.getItem('token'),
          "Content-Type" : 'multipart/form-data'
        }
      })
        .then(()=> {
          this.showMyArticle()
          this.currentPage = 'myArticle'
        })
        .catch(err => {
          swal({
            title: "ERROR!",
            text: "Please Input Title and Content",
            icon: "warning",
          });
          console.log(err)
        })
     },
    showMyArticle() {
      axios.get(baseUrl + '/articles/myArticle', {
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=> {
          this.myArticle = data
        })
        .catch((err => {
          console.log(err)
        }))

    },
    createArticle() {
      const fd = new FormData()
      fd.append('image', this.articleImage,)
      fd.append('title', this.articleTitle, )
      fd.append('content', this.articleText, )
      axios.post(baseUrl + '/articles/create', fd,{
          headers : {
            token : localStorage.getItem('token'),
            'Content-Type' : 'miltipart/form-data'
          }
        })
        .then((article) => {
          this.currentPage = 'home'
          console.log(article)
        })
        .catch(err => {
          swal({
            title: "ERROR!",
            text: "Please Input Title and Content",
            icon: "warning",
          });
          console.log(err)
        })

    },
    checkLocalStorage() {
      let token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
        this.email = localStorage.getItem('email')
      }
      else this.isLogin = false
    },
    fetchArticle() {
      axios.get(baseUrl + '/articles/findAll')
        .then(({
          data
        }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    logoutUser() {
      this.isLogin = false
      this.currentPage = 'home'
      signOut()
    },
    loginChange()  {
      this.isLogin = true
    },
    changeCurrentPage(param) {
      this.currentPage = param
    }
  }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  axios.post(baseUrl + '/users/googleLogin', {
      token: id_token
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)      
      app.isLogin = true
      app.email = localStorage.getItem('email')
    })
    .catch(err => {
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
  })
}